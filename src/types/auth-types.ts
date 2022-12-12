import { Dispatch, Ref, SetStateAction } from 'react';

export interface AuthTitleTypes {
  loginPage: boolean;
}

export interface AuthValidTypes {
  email: boolean;
  password: boolean;
}
export interface AuthFormTypes extends AuthTitleTypes {
  setLoginPage: (state: boolean) => void;
}

export interface AuthInputTypes {
  emailRef?: Ref<HTMLInputElement>;
  passwordRef?: Ref<HTMLInputElement>;
  setIsValid: Dispatch<SetStateAction<AuthValidTypes>>;
}
