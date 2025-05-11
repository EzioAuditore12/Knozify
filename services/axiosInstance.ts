import axios from 'axios'
import { authStore } from "@/store";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const { authTokens, isTokenExpired, tokensReGenerate, logoutUser } = authStore.getState();
        if (!authTokens) return config;

        if (isTokenExpired()) {
            // If token IS expired, try to refresh
            const refreshSuccess = await tokensReGenerate();
            if (refreshSuccess) {
                const newTokens = authStore.getState().authTokens;
                config.headers.Authorization = `Bearer ${newTokens?.access}`;
            } else {
                logoutUser();
            }
        } else {
            // If token is NOT expired, use it
            config.headers.Authorization = `Bearer ${authTokens.access}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)
export { axiosInstance }