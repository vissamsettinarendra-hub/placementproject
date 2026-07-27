import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Student from "../models/Student.js";

// =======================
// Get All Students
// =======================
export const getStudents = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const allowedFields = [
            "studentName",
            "rollno",
            "branch",
            "cgpa",
            "year",
            "createdAt",
        ];

        const sortField = allowedFields.includes(req.query.sort)
            ? req.query.sort
            : "studentName";

        const order = req.query.order === "desc" ? -1 : 1;

        const skip = (page - 1) * limit;

        const totalStudents = await Student.countDocuments();

        const totalPages = Math.ceil(totalStudents / limit);

        const students = await Student.find()
            .sort({
                [sortField]: order,
                createdAt: -1,
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

        const {
            studentName,
            rollno,
            email,
            phone,
            branch,
            cgpa,
            year,
        } = req.body;

        const image = req.file ? req.file.filename : "";

        // Check Email
        const emailExists = await Student.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Check Roll Number
        const rollExists = await Student.findOne({
            rollno: Number(rollno),
        });

        if (rollExists) {
            return res.status(400).json({
                success: false,
                message: "Roll Number already exists",
            });
        }

        const student = await Student.create({
            studentName,
            rollno: Number(rollno),
            email,
            phone,
            branch,
            cgpa: Number(cgpa),
            year: Number(year),
            image,
        });

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

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Check duplicate email
        if (
            req.body.email &&
            req.body.email !== student.email
        ) {

            const emailExists = await Student.findOne({
                email: req.body.email,
            });

            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }

        }

        // Check duplicate roll number
        if (
            req.body.rollno &&
            Number(req.body.rollno) !== student.rollno
        ) {

            const rollExists = await Student.findOne({
                rollno: Number(req.body.rollno),
            });

            if (rollExists) {
                return res.status(400).json({
                    success: false,
                    message: "Roll Number already exists",
                });
            }

        }

        const updateData = {
            ...req.body,
        };

        // Update Image
        if (req.file) {

            // Delete old image
            if (student.image) {

                const imagePath = path.join(
                    process.cwd(),
                    "uploads",
                    student.image
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

            }

            updateData.image = req.file.filename;

        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            student: updatedStudent,
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

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Delete Image
        if (student.image) {

            const imagePath = path.join(
                process.cwd(),
                "uploads",
                student.image
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        }

        await Student.findByIdAndDelete(req.params.id);

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

            const students = await Student.find()
                .sort({ studentName: 1 });

            return res.status(200).json({
                success: true,
                students,
            });

        }

        const query = {
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
            ],
        };

        // Search by roll number
        if (!isNaN(search)) {

            query.$or.push({
                rollno: Number(search),
            });

        }

        const students = await Student.find(query)
            .sort({ studentName: 1 });

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