import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { logout, refreshToken } from "./axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3003/api/v1",
  withCredentials: true,
  timeout: 1000 * 60 * 10,
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

    const originalRequest: any = error.config;
    originalRequest.withCredentials = true;
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshToken()
        .then((res) => {
          console.log("res from refreshtoken api", res);
          localStorage.setItem("userInfo", JSON.stringify(res.data?.userInfo));
          return instance(originalRequest);
        })
        .catch((_err) => {
          // logout()
          //   .then(() => {
          //     localStorage.removeItem("userInfo");
          //     console.error("Unauthorized - Token hết hạn");
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

          return Promise.reject(_err);
        });
    }

    // if (error.response?.status === 401) {
    //   // ví dụ: logout user
    //   logout()
    //     .then(() => {
    //       localStorage.removeItem("userInfo");
    //       console.error("Unauthorized - Token hết hạn");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    if (error.response?.status !== 410) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default instance;
