import Api, { config } from "./axios";
import { store } from "@/store/store";
import { logout, setAccessToken } from "@/store/features/authSlice";
import axios from "axios";

const refreshApi = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

Api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const response = await refreshApi.post("/auth/refresh");

                const newAccessToken = response.data.accessToken;

                store.dispatch(setAccessToken(newAccessToken));

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return Api(originalRequest);
            } catch (err) {
                store.dispatch(logout());
                window.location.href = "/view/Home";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);