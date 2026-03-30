import type { AxiosInstance } from "axios";
import axios from "axios";

export const m1_api : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_M1_PROXY_URL,
    headers: {
        "Content-Type": "application/json"
    }
});