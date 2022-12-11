export interface AuthTitleTypes {
  loginPage: boolean;
}

export interface AuthFormTypes extends AuthTitleTypes {
  setLoginPage: (state: boolean) => void;
}
