export interface User {
  user_id: number;
  role: RoleDetail;
  name: string;
  username: string;
  password?: string;
  gender: string;
  age: number;  
  email: string;
  address: string;
  phone: string;
  accessToken: Token;
  credentials: Credential;
}

export interface RoleDetail {
  role_id: number;
  name: string;
}

export interface Credential{
  username: string;
  password: string;
}

export interface Token{
  access_token: string;
  token_type: string;
}

export interface Address {
  street: string;
  address_number: string;
  ward: string;
  district: string;
}