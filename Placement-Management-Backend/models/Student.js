import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
        trim:true
    },
    rollno:{
        type:Number,
        required:true,
        trim:true
    },    
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },    
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },    
    branch:{
        type:String,
        required:true,
        enum:["CSE","CSE-AI","CSE-DS","CSE-CS","ECE"]
    },    
    cgpa:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    year:{
        type:Number,
        required:true,
        min:1,
        max:4
    },
},{
    timestamps:true
});
//Model represents a Mongodb collecction
//and used to perform CRUD operations

const Student = mongoose.model(
    "Student",
    studentSchema
);
export default Student;