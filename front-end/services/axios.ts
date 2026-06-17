import loadEnvFile from "@/config/config";
import { store } from "@/store/store";
import axios, { InternalAxiosRequestConfig } from "axios";


export const config = loadEnvFile({urlType: "baseurl"})

const Api = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


Api.interceptors.request.use((config: InternalAxiosRequestConfig<any>)=> {
    const token = store.getState().auth.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default Api;