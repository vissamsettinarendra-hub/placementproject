import express from "express";
import {
    getStudents,
    getStudentsById,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
} from "../controllers/studentController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// ======================
// Get All Students
// ======================
router.get("/", getStudents);

// ======================
// Search Students
// ======================
router.get("/search", searchStudents);

// ======================
// Get Student By ID
// ======================
router.get("/:id", getStudentsById);

// ======================
// Add Student
// ======================
router.post(
    "/",
    upload.single("image"),
    addStudent
);

// ======================
// Update Student
// ======================
router.put(
    "/:id",
    upload.single("image"),
    updateStudent
);

// ======================
// Delete Student
// ======================
router.delete("/:id", deleteStudent);

export default router;