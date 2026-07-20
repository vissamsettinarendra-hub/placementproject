//frontend --> request -->  8000backend
//frontend --->localhost:5000/students/:id 
//frontend --->baseURL/students/:id 

import axios from "axios";
import React from "react";
const api = axios.create({
    baseURL:"http://localhost:8000"
});
export default api;

//localhost:5000/students/:id 
//api.get("/students/:id")
      
    //  React
    //  |
    //  api.js
    //  |
    //  backend 