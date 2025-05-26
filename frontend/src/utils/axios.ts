import axios from "./axios.customize";
import type { IformRegister, IformLogin, IUser } from "./types";

const getAllUsers = () => {
  const API_URL = "/getAllUsers";
  return axios.get(API_URL);
};

const register = (data: IformRegister) => {
  const API_URL = "/auth/createUser";
  return axios.post(API_URL, data);
};

const login = (data: IformLogin) => {
  const API_URL = "/auth/login";
  return axios.post(API_URL, data);
};

const updateUser = (userId: string, data: Partial<IUser>) => {
  const API_URL = `/updateUser/${userId}`;
  return axios.put(API_URL, data);
};

const deleteUser = (userId: string) => {
  const API_URL = `deleteUser/${userId}`;
  return axios.delete(API_URL);
};

export { getAllUsers, register, login, updateUser, deleteUser };
