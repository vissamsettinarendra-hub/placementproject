import mongoose from "mongoose";
import Student from "../models/Student.js";

// =======================
// Get All Students
// =======================
export const getStudents = async (req, res) => {
    try {
        const sortField = req.query.sort || "studentName";
        const order = req.query.order || "asc";
        const sortOrder = order === "asc"?1 : -1;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit ;

        const totalStudents = await Student.countDocuments();

        const totalPages = Math.ceil(totalStudents / limit);

        const students = await Student.find()
            .sort({ createdAt: -1 })
            .sort({
                [sortField] : sortOrder
            })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            students,
            currentPage: page,
            totalPages,
            totalStudents,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================
// Get Student By ID
// =======================
export const getStudentsById = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID",
            });
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            student,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =======================
// Add Student
// =======================
export const addStudent = async (req, res) => {

    try {

        const { rollno, email } = req.body;

        const emailExists = await Student.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const rollExists = await Student.findOne({ rollno });

        if (rollExists) {
            return res.status(400).json({
                success: false,
                message: "Roll Number already exists",
            });
        }

        const student = await Student.create(req.body);

        res.status(201).json({
            success: true,
            message: "Student Registered Successfully",
            student,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =======================
// Update Student
// =======================
export const updateStudent = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID",
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            student,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =======================
// Delete Student
// =======================
export const deleteStudent = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID",
            });
        }

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =======================
// Search Students
// =======================
export const searchStudents = async (req, res) => {

    try {

        const search = req.query.q || "";

        if (search.trim() === "") {

            const students = await Student.find();

            return res.status(200).json({
                success: true,
                students,
            });

        }

        const students = await Student.find({
            $or: [
                {
                    studentName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    branch: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    rollno: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ],
        });

        res.status(200).json({
            success: true,
            students,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};