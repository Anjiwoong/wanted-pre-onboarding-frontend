import { useContext, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import TodoContext from '../../store/todo/todo-context';
import { DataTypes } from '../../types/http-types';
import Button from '../UI/Button';
import Input from '../UI/Input';

const TodoItem = ({ todoInfo }: { todoInfo: DataTypes }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    if (editMode) editInputRef.current?.focus();
  }, [editMode]);

  const deleteHandler = () => todoCtx.deleteTodo(todoInfo.id);

  const completeHandler = () =>
    todoCtx.completedTodo(todoInfo.id, !todoInfo.isCompleted, todoInfo.todo);

  const editHandler = () => setEditMode(true);
  const cancelEditHandler = () => setEditMode(false);

  const closeEditMode = () => {
    setEditMode(false);
    todoCtx.changedTodo(
      todoInfo.id,
      todoInfo.isCompleted,
      editInputRef.current?.value,
    );
  };

  return (
    <TodoItemWrapper>
      {!editMode && (
        <TodoText completed={todoInfo.isCompleted} onClick={completeHandler}>
          {todoInfo.todo}
        </TodoText>
      )}
      {editMode && (
        <EditInput
          type="text"
          defaultValue={todoInfo.todo}
          ref={editInputRef}
        />
      )}
      <ButtonWrapper>
        {!editMode && <Button onClick={editHandler}>수정</Button>}
        {editMode && <Button onClick={closeEditMode}>완료</Button>}
        {!editMode && <Button onClick={deleteHandler}>X</Button>}
        {editMode && <Button onClick={cancelEditHandler}>취소</Button>}
      </ButtonWrapper>
    </TodoItemWrapper>
  );
};

const TodoItemWrapper = styled.li`
  margin-top: 20px;
  padding: 5px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const TodoText = styled.span`
  ${(props: { completed: boolean }) =>
    props.completed &&
    css`
      text-decoration: line-through;
    `}
`;

const EditInput = styled(Input)`
  border: none;
  outline: none;
  width: 300px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  button {
    color: gray;
    background: beige;
  }
`;

export default TodoItem;
