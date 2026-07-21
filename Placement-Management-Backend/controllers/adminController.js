import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Register
export const registerAdmin = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
            message: error.message,
        });

    }

};

// Login
export const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {

            return res.status(400).json({
                message: "Invalid Email",
            });

        }

        const match = await bcrypt.compare(
            password,
            admin.password
        );

        if (!match) {

            return res.status(400).json({
                message: "Invalid Password",
            });

        }

        const token = jwt.sign(
            {
                id: admin._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            token,
            admin,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};