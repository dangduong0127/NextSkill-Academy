import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { logout, refreshToken } from "./axios";

const instance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
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

let refreshTokenPromise: Promise<void> | null = null;

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Bạn có thể xử lý lỗi như 401, 403, 500 ở đây
    // console.log(error.response?.status);
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } =
      error.config as InternalAxiosRequestConfig;
    originalRequest.withCredentials = true;

    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .then(() => {
            // console.log("res from refreshtoken api", res);
            // localStorage.setItem("userInfo", JSON.stringify(res.data?.userInfo));
            // return instance(originalRequest);
          })
          .catch((_err) => {
            logout()
              .then(() => {
                localStorage.removeItem("userInfo");
                console.error("Unauthorized - Token hết hạn");
                window.location.href = "/login";
              })
              .catch((error) => {
                console.log(error);
              });

            return Promise.reject(_err);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        return instance(originalRequest);
      });
    }

    if (error.response?.status === 401) {
      // ví dụ: logout user
      logout()
        .then(() => {
          localStorage.removeItem("userInfo");
          console.error("Unauthorized - Token hết hạn");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (error.response?.status !== 410) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);
export default instance;
