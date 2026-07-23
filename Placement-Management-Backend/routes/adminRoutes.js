import express from "express";

import {
    registerAdmin,
    loginAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// ==========================
// Register Admin
// POST /api/admin/register
// ==========================
router.post(
    "/register",
    registerAdmin
);

// ==========================
// Login Admin
// POST /api/admin/login
// ==========================
router.post(
    "/login",
    loginAdmin
);

export default router;