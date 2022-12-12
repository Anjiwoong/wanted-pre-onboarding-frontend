import { ChangeEvent } from 'react';

export interface InputTypes {
  type: string;
  placeholder?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
