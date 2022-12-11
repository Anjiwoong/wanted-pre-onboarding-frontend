import { ChangeEvent } from 'react';

export interface InputTypes {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
