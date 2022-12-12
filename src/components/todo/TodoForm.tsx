import { FormEvent, useContext, useRef } from 'react';
import styled from 'styled-components';
import TodoContext from '../../store/todo/todo-context';

import TodoInput from './TodoInput';

const TodoForm = () => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoCtx = useContext(TodoContext);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    todoCtx.addTodo(todoInputRef.current!.value);
    todoInputRef.current!.value = '';
  };

  return (
    <TodoFormWrapper onSubmit={submitHandler}>
      <TodoInput todoInputRef={todoInputRef} />
    </TodoFormWrapper>
  );
};

const TodoFormWrapper = styled.form``;

export default TodoForm;
