export interface IformRegister {
  email: string;
  phone: number | string;
  gender: string;
  password: string;
  dateOfBirth: string;
  repeat_password: string;
  age: string;
}

export type IformLogin = Pick<IformRegister, "email" | "password">;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  // role: "681f6d5fa266955d8682a70f";
  role: string;
  age: number;
  avatar: string;
  phone: number;
  address: string;
}

export type userInfo = Pick<IUser, "_id" | "email" | "role">;

export interface Message {
  sender: string;
  message: string;
  timestamp?: string;
}
