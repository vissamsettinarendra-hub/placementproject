import express, { request, response } from "express";
import { getStudents,getStudentsById,addStudent,updateStudent,deleteStudent,searchStudents } from "../controllers/studentController.js";

//router object 
const router = express.Router()
//students/
// router.get("/",(request,response)=>
// {
//     response.send("I am in routes")
// })


//GEt all the students
router.get("/",getStudents);


//searching route
router.get("/search", searchStudents);

//get student by id
router.get("/:id",getStudentsById);
//post adding the student
router.post("/",addStudent);
//put updating the student
router.put("/:id",updateStudent);
//delete deleting the student
router.delete("/:id",deleteStudent);



export default router
