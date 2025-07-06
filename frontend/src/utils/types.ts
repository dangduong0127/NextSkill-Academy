export interface IformRegister {
  fullName: string;
  email: string;
  phone: number | string;
  gender: string;
  password: string;
  dateOfBirth: string;
  repeat_password: string;
  address: string;
}

export type IformLogin = Pick<IformRegister, "email" | "password">;

export interface IUser {
  _id: string;
  fullName: string;
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
  room: string;
  sender: string;
  content: string;
  fileUrl: string;
  typeUrl: string;
  createdAt?: number;
}

export type EmojiObject = {
  id: string;
  name: string;
  native: string;
};

export type ImageContextType = {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

export type Province = {
  code: number;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code_name: string;
};

export type Pagination = {
  page: string | number;
  limit: string | number;
};
