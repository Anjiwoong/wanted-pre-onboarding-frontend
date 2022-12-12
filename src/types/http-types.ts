export interface RequestTypes {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?:
    | { email?: string; password?: string }
    | { todo?: string; isCompleted?: boolean };
}

export interface TokenTypes {
  access_token: string;
}

export interface DataTypes {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
