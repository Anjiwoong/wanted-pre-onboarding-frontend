import { DataTypes } from './http-types';

export interface TodoContextTypes {
  todoList: DataTypes[] | [];
  fetchTodo: () => void;
  addTodo: (newTodo: string) => void;
  deleteTodo: (id: number) => void;
  completedTodo: (id: number, completed: boolean, todo: string) => void;
  changedTodo: (id: number, completed: boolean, todo?: string) => void;
  // checkTodo: (id: number) => void;
}

export interface TodoActionTypes {
  type: string;
  fetchTodo?: DataTypes[];
  newTodo?: DataTypes;
  todoList?: DataTypes[] | [];
  id?: number;
}

export interface DefaultTodoTypes {
  todoList: DataTypes[];
}
