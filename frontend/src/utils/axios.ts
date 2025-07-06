import axios from "./axios.customize";
import type { IformRegister, IformLogin, IUser, Pagination } from "./types";

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

const checkAuth = () => {
  const API_URL = "/auth/check-auth";
  return axios.get(API_URL);
};

const logout = () => {
  const API_URL = "/auth/logout";
  return axios.post(API_URL);
};

const refreshToken = () => {
  const API_URL = "/auth/refresh-token";
  return axios.put(API_URL);
};

const getMessage = () => {
  const API_URL = `/getMessage`;
  return axios.get(API_URL);
};

const getUserMessage = (userId: string) => {
  const API_URL = `/dashboard/chat/getMessage/${userId}`;
  return axios.get(API_URL);
};

const uploadImage = (formData: FormData) => {
  const API_URL = `/upload`;
  return axios.post(API_URL, formData);
};

const coursePages = (req: Pagination) => {
  const API_URL = `/courses`;
  return axios.get(API_URL, {
    params: {
      page: req.page,
      limit: req.limit,
    },
  });
};

export {
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
  checkAuth,
  logout,
  refreshToken,
  getMessage,
  getUserMessage,
  uploadImage,
  coursePages,
};
