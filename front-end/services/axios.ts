import loadEnvFile from "@/config/config";
import axios from "axios";


const config = loadEnvFile({urlType: "baseurl"})

const Api = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default Api;