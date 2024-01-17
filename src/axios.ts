// axios-instance.js
import axios from "axios";

// Create a new instance of Axios with custom configurations
const axiosInstance = axios.create({
  baseURL: process.env.apiURL, // Set your API base URL
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    // mode: "no-cors",
    Accept: "*",
  },
});

// You can also add interceptors for request and response handling
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config before it is sent
    // For example, you might want to add an authentication token
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data before it is passed to the calling code
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  },
);

export default axiosInstance;
