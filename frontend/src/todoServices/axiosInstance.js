import axios from "axios";
import {ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN} from "../utils/utils.js";


const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

apiInstance.interceptors.request.use(async function(config) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        window.location.href = "/login";
    }

    return config;
})

apiInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const originalReq = error.config;
        if (!originalReq.retry && error.response.status === 401) {
            originalReq.retry = true;
            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                if (refreshToken) {
                    const response = await axios.post(`${BASE_URL}token/refresh/`, {
                        refresh: refreshToken
                    })

                    const {access} = response.data;
                    localStorage.setItem(ACCESS_TOKEN, access);

                    originalReq.headers.Authorization = `Bearer ${access}`;
                    return apiInstance(originalReq);
                }
            } catch (err) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
            }
        } else {
            return Promise.reject(error);
        }
    }
)

export default apiInstance;


