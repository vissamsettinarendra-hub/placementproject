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

import { auth } from "../middleware/authMiddleware.js";


const router = express.Router();


// ======================
// Get All Students
// ======================
router.get(
    "/",
    auth,
    getStudents
);


// ======================
// Search Students
// ======================
router.get(
    "/search",
    auth,
    searchStudents
);


// ======================
// Get Student By ID
// ======================
router.get(
    "/:id",
    auth,
    getStudentsById
);


// ======================
// Add Student
// ======================
router.post(
    "/",
    auth,
    upload.single("image"),
    addStudent
);


// ======================
// Update Student
// ======================
router.put(
    "/:id",
    auth,
    upload.single("image"),
    updateStudent
);


// ======================
// Delete Student
// ======================
router.delete(
    "/:id",
    auth,
    deleteStudent
);


export default router;