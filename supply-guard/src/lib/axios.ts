import axios from "axios";


export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (response) => response,  
    (error) => {
      if (error.response?.status === 401){
                localStorage.removeItem("token");

      } 
        return Promise.reject(error);
    }
  
);

