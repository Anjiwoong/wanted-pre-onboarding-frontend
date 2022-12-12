import React from 'react';
import { TodoContextTypes } from '../../types/context-types';

const TodoContext = React.createContext<TodoContextTypes>({
  todoList: [],
  fetchTodo: () => [],
  addTodo: (newTodo: string) => {},
  deleteTodo: (id: number) => {},
  completedTodo: (id: number, completed: boolean, todo: string) => {},
  changedTodo: (id: number, completed: boolean, todo?: string) => {},
});

export default TodoContext;
