import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "./utils";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const requestWithoutAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

request.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const { data } = await requestWithoutAuth.post(
          "/api/get-access-token",
          {
            refreshToken: getRefreshToken(),
          }
        );

        setAccessToken(data.accessToken);

        return request(originalRequest);
      } catch (error) {
        removeAccessToken();
        removeRefreshToken();
        location.reload();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default request;
