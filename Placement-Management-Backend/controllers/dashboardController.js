import Student from "../models/Student.js";
import Company from "../models/Company.js";

export const getDashboard = async (req, res) => {

    try {

        const totalStudents = await Student.countDocuments();

        const totalCompanies = await Company.countDocuments();

        const eligibleStudents = await Student.countDocuments({
            cgpa: { $gte: 7 }
        });

        const students = await Student.find();

        const averageCGPA = students.length
            ? (
                students.reduce((sum, s) => sum + s.cgpa, 0) /
                students.length
            ).toFixed(2)
            : 0;

        res.status(200).json({
            success: true,
            dashboard: {
                totalStudents,
                totalCompanies,
                eligibleStudents,
                averageCGPA,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};