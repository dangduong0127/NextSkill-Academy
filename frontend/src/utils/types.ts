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
