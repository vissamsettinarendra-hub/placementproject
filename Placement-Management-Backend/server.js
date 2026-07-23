import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true
    })
)

// ===============================
// Connect Database
// ===============================
connectDB();

// ===============================
// Middlewares
// ===============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Static Folder (Uploaded Images)
// ===============================
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

// ===============================
// API Routes
// ===============================
app.use("/api/students", studentRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);

// ===============================
// Default Route
// ===============================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Placement Management System API Running...",
    });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});