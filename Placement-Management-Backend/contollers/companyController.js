import express from "express"

let company = [
    {
        id:1,
        studentName:"bala",
        email:"bala@gmail.com",
        Branch:"CSE",
        cgpa:8.5
    },
    {
        id:2,
        studentName:"manoj",
        email:"manoj@gmail.com",
        Branch:"AI",
        cgpa:8.0
    },
    {
        id:3,
        studentName:"mastan",
        emial:"mastan",
        Branch:"Cs",
        cgpa:9.2
    }
]
export function getCompany(request,response){
    response.status(200).json(company)
}