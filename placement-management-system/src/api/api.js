//frontend --> request -->  8000backend
//frontend --->localhost:5000/students/:id 
//frontend --->baseURL/students/:id 

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
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

// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");

            window.location.href = "/Login";
        }

        return Promise.reject(error);
    }
);

export default api;

//localhost:5000/students/:id 
//api.get("/students/:id")
      
    //  React
    //  |
    //  api.js
    //  |
    //  backend 