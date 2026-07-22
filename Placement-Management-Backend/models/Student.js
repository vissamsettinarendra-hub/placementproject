import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true,
        },

        rollno: {
            type: Number,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address",
            ],
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
        },

        branch: {
            type: String,
            required: true,
            enum: [
                "CSE",
                "CSE-AI",
                "CSE-DS",
                "CSE-CS",
                "ECE",
            ],
        },

        cgpa: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
        },

        year: {
            type: Number,
            required: true,
            min: 1,
            max: 4,
        },

        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;