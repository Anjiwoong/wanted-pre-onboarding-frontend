import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TodoContext from '../../store/todo/todo-context';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    if (localStorage.getItem('token')) todoCtx.fetchTodo();
  }, []);

  return (
    <ListWrapper>
      {todoCtx.todoList.map(todo => (
        <TodoItem key={todo.id} todoInfo={todo} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.ul`
  width: 400px;
  margin: 20px auto;
`;

export default TodoList;
