import { ChangeEvent } from 'react';

export interface InputTypes {
  type: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
