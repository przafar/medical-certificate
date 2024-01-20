import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SICKLEAVE_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest",
    },
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to set a new base URL
const setBaseUrl = (newBaseUrl: string) => {
    instance.defaults.baseURL = newBaseUrl;
};

export { instance, setBaseUrl };
