import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// =========================
// Register Admin
// =========================
export const registerAdmin = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
        } = req.body;

        // Check existing admin
        const adminExists = await Admin.findOne({
            email,
        });

        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            admin,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =========================
// Login Admin
// =========================
export const loginAdmin = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        // Find admin
        const admin = await Admin.findOne({
            email,
        });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        // Compare password
        const match = await bcrypt.compare(
            password,
            admin.password
        );

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};