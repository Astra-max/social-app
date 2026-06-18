import loadEnvFile from "@/config/config";
import axios from "axios";
import { getAccessToken } from "./token";


export const config = loadEnvFile({ urlType: "baseUrl" })

export const Api = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


Api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});