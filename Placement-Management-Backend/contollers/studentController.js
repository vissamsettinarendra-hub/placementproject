import express from "express";
import Student from "../models/Student.js";

export async function getStudents(request,response){
    try{
        const students = await Student.find();
        response.status(200).json({
            success:true,
            students
        })
    } catch(error){
        response.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export async function getStudentsById(request,response){
    try{
        const student = await Student.findById(request.params.id);
        if(!student){
        return response.status(404).json({
            success:false,
            message:"Student is not found"
        });
        
    };
    response.status(200).json({
        success:true,
        student
    })
    } catch(error){
       response.status(500).json({
        success:false,
        message:error.message
       });
    }
      
      
      
}
//adding a student
export async function addStudent(request,response){
    //creatw a new document in mongodb
    try{
        const student = await Student.create(request.body)
    response.status(201).json({
        success:true,
        message:"Student Registered Successfully",
        student
    })
   }
   catch(error){
    response.status(500).json({
        success:false,
        message:error.message,
        student
    })
   }
    //add into the array
    students.push(student);
    response.status(201).json({
        success:true,
        message:"Student Registered successful",
        student
    })
}

//updating the student
export async function updateStudent(request,response){
    try{
    const student = await Student.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            new:true,
            runvalidators:true
        }
    );
    if(!student){
        return response.status(400).json({
            success:false,
            message:"Student Not Found"
        });
    }
    response.status(200).json({
        success:true,
        message:"Student updated Successful",
        student
    }); 
}catch(error){
    response.status(500).json({
        success:false,
        message:error.message

    })
}

} 
  

//delete student logic
export async function deleteStudent(request,response){
    try{
        const student = await Student.findByIdAndDelete(request.params.id);
        if(!student){
            return request.status(404).json({
                success : false,
                message : "student is not found"
            });
        };
        response.status(200).json({
        success : true,
        message : "Student deleted successfully"
    });
    }catch(error){
        return response.status(500).json({
            success : false,
            message : error.message
        });
    };
};