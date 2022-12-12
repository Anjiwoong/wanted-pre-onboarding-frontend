import { useReducer, useRef } from 'react';
import useHttp from '../../hooks/use-http';

import { DefaultTodoTypes, TodoActionTypes } from '../../types/context-types';
import { DataTypes } from '../../types/http-types';

import TodoContext from './todo-context';

const defaultTodoState: DefaultTodoTypes = {
  todoList: [],
};

const todoReducer = (
  state: DefaultTodoTypes,
  action: TodoActionTypes,
): DefaultTodoTypes => {
  switch (action.type) {
    case 'FETCH':
      return {
        todoList: action.fetchTodo || state.todoList,
      };

    case 'ADD':
      return {
        todoList: [...state.todoList, action.newTodo!],
      };

    case 'DELETE':
      return {
        todoList: state.todoList.filter(
          (todo: DataTypes) => todo.id !== action.id,
        ),
      };

    case 'COMPLETE':
      return {
        todoList: state.todoList.map((todo: DataTypes) =>
          todo.id === action.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo,
        ),
      };

    case 'UPDATE':
      return {
        todoList: state.todoList.map((todo: DataTypes) =>
          todo.id === action.id ? action.newTodo! : todo,
        ),
      };

    default:
      return defaultTodoState;
  }
};

const TodoProvider = ({ children }: { children: JSX.Element }) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState,
  );

  const todoRef = useRef<DataTypes>();
  const todoListRef = useRef<DataTypes[]>();

  const sendRequest = useHttp();

  const fetchTodoHandler = async () => {
    const fetchTodo = (data: DataTypes[]) => {
      todoListRef.current = data;
    };

    await sendRequest(
      {
        url: '/todos',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      fetchTodo,
    );

    dispatchTodoAction({ type: 'FETCH', fetchTodo: todoListRef.current });
  };

  const addTodoHandler = async (newTodo: string) => {
    if (!newTodo.trim().length) return;

    const addTodo = (data: DataTypes) => {
      todoRef.current = data;
    };

    await sendRequest(
      {
        url: '/todos',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: {
          todo: newTodo,
        },
      },
      addTodo,
    );
    dispatchTodoAction({ type: 'ADD', newTodo: todoRef.current });
  };

  const deleteTodoHandler = async (id: number) => {
    const deleteTodo = () => {};

    await sendRequest(
      {
        url: `/todos/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      deleteTodo,
    );
    dispatchTodoAction({ type: 'DELETE', id });
  };

  const completedTodoHandler = async (
    id: number,
    completed: boolean,
    todo: string,
  ) => {
    const completedTodo = (todo: DataTypes[]) => {
      todoListRef.current = todo;
    };

    await sendRequest(
      {
        url: `/todos/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: {
          todo: todo,
          isCompleted: completed,
        },
      },
      completedTodo,
    );
    dispatchTodoAction({ type: 'COMPLETE', id });
  };

  const changeTodoHandler = async (
    id: number,
    completed: boolean,
    todo?: string,
  ) => {
    if (!todo?.trim().length) return;

    const changeTodo = (todo: DataTypes) => {
      todoRef.current = todo;
    };

    await sendRequest(
      {
        url: `/todos/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: {
          todo: todo,
          isCompleted: completed,
        },
      },
      changeTodo,
    );
    dispatchTodoAction({ type: 'UPDATE', id, newTodo: todoRef.current });
  };

  const todoContext = {
    todoList: todoState.todoList,
    fetchTodo: fetchTodoHandler,
    addTodo: addTodoHandler,
    deleteTodo: deleteTodoHandler,
    completedTodo: completedTodoHandler,
    changedTodo: changeTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
