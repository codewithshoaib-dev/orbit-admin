// api/axios.js
import axios from "axios";

let isRefreshing = false;
let failedQueue = [];
let logoutHandler = null;

export const setLogoutHandler = fn => {
  logoutHandler = fn;
};

function processQueue(error = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
}

const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject: err => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post("/token/refresh", {}, { withCredentials: true });
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (logoutHandler) logoutHandler();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
