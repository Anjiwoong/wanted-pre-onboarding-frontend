export interface RequestTypes {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: { email?: string; password?: string };
}

export interface TokenTypes {
  access_token: string;
}
