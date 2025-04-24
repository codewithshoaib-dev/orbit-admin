// api/axios.js
import axios from "axios";

let isRefreshing = false;
let failedQueue = [];
let logoutHandler = null;

export const setLogoutHandler = (fn) => {
    logoutHandler = fn;
};

function processQueue(error = null) {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve();
    });
    failedQueue = [];
}

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL || "/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/token/refresh") &&
            !originalRequest.url.includes("/logout")
        ) {
            originalRequest._retry = true;

            // If a token refresh is already in progress, queue the current request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(api(originalRequest)), // Retry the request after refresh
                        reject: (err) => reject(err), // Reject the request if refresh fails
                    });
                });
            }

            isRefreshing = true;

            try {
                await api.post("/token/refresh", {}, { withCredentials: true });
                processQueue();
                return api({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                    },
                });
            } catch (refreshError) {
                processQueue(refreshError);
                if (logoutHandler) {
                    logoutHandler();
                } else {
                    console.error("Logout handler is not set. Redirecting to login.");
                    window.location.href = "/login"; // Redirect to login as a fallback
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
 
export default api;
