import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });
const API = axios.create({
  // Agar environment variable milta hai toh wo use karega, 
  // nahi toh local use karega (development ke liye)
  baseURL:`${import.meta.env.VITE_API_URL}/api`,
  
});
// Ye function hum LoadingContext se pass karenge (Step 3 dekho)
export const setupInterceptors = (setLoading) => {
  API.interceptors.request.use((config) => {
    setLoading(true); // Automatic Start
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, (error) => {
    setLoading(false);
    return Promise.reject(error);
  });

  API.interceptors.response.use((response) => {
    setLoading(false); // Automatic Stop
    return response;
  }, (error) => {
    setLoading(false); // Error pe bhi Stop
    return Promise.reject(error);
  });
};

export default API;