import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3003/api/v1",
  withCredentials: true,
});

// Request interceptor: thêm token nếu có
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem("access_token");
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Bạn có thể xử lý lỗi như 401, 403, 500 ở đây
    if (error.response?.status === 401) {
      // ví dụ: logout user
      console.error("Unauthorized - Token hết hạn");
    }
    return Promise.reject(error);
  }
);

export default instance;
