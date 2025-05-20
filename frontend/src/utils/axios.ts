import axios from "./axios.customize";
import type { IformRegister, IformLogin } from "./types";

const getAllUsers = () => {
  const API_URL = "/getAllUsers";
  return axios.get(API_URL);
};

const register = (data: IformRegister) => {
  const API_URL = "/createUser";
  return axios.post(API_URL, data);
};

const login = (data: IformLogin) => {
  const API_URL = "/login";
  return axios.post(API_URL, data);
};

export { getAllUsers, register, login };
