import axios from "axios";
const api = axios.create({
  baseURL: "https://localhost:7079/api", 
  withCredentials: false, //Do NOT use credentials (your backend CORS removed it)
});
// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Required for JSON
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
