import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';

const TodoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/');
  }, []);

  return (
    <TodoWrapper>
      <TodoForm />
      <TodoList />
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  width: 800px;
  margin: 200px auto;
`;

export default TodoPage;
