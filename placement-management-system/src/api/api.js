import axios from "axios";


// Backend URL

const API = axios.create({

    baseURL: "http://localhost:8000/api",

});



// ===============================
// JWT TOKEN INTERCEPTOR
// ===============================

API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },


    (error)=>{

        return Promise.reject(error);

    }

);




// ===============================
// ADMIN APIs
// ===============================


export const registerAdmin = (data)=>{

    return API.post(
        "/admin/register",
        data
    );

};



export const loginAdmin = (data)=>{

    return API.post(
        "/admin/login",
        data
    );

};




// ===============================
// USER AUTH APIs
// ===============================


export const registerUser = (data)=>{

    return API.post(
        "/auth/register",
        data
    );

};







// ===============================
// STUDENT APIs
// ===============================


export const getStudents = ()=>{

    return API.get(
        "/students"
    );

};



export const addStudent = (data)=>{

    return API.post(
        "/students",
        data
    );

};



export const updateStudent = (id,data)=>{

    return API.put(
        `/students/${id}`,
        data
    );

};



export const deleteStudent = (id)=>{

    return API.delete(
        `/students/${id}`
    );

};




// ===============================
// COMPANY APIs
// ===============================


export const getCompanies = ()=>{

    return API.get(
        "/companies"
    );

};



export const addCompany = (data)=>{

    return API.post(
        "/companies",
        data
    );

};



export const updateCompany = (id,data)=>{

    return API.put(
        `/companies/${id}`,
        data
    );

};



export const deleteCompany = (id)=>{

    return API.delete(
        `/companies/${id}`
    );

};




// ===============================
// DASHBOARD API
// ===============================


export const getDashboard = ()=>{

    return API.get(
        "/dashboard"
    );

};



export default API;