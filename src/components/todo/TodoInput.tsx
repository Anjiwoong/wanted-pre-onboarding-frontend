import styled from 'styled-components';
import { TodoInputTypes } from '../../types/todo-types';
import Button from '../UI/Button';
import Input from '../UI/Input';

const TodoInput = ({ todoInputRef }: TodoInputTypes) => {
  return (
    <InputWrapper>
      <label htmlFor="todo">Todo</label>
      <Input
        type="text"
        placeholder="할 일을 작성해주세요."
        id="todo"
        ref={todoInputRef}
      />
      <TodoButton>추가</TodoButton>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 400px;
  margin: 0 auto;

  label {
    margin-right: 10px;
  }

  input {
    width: 300px;
    height: 40px;
    padding: 10px;
  }
`;

const TodoButton = styled(Button)`
  margin-left: 10px;
  padding: 10px;
  background: beige;
  color: gray;
  border-radius: 5px;
`;

export default TodoInput;
