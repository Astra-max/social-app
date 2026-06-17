import { Api } from "./axios";
import { setAccessToken } from "./token";



Api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const res = await Api.post("/auth/refresh");

        const newToken = res.data.accessToken;

        setAccessToken(newToken);

        original.headers.Authorization = `Bearer ${newToken}`;

        return Api(original);
      } catch (err) {
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);