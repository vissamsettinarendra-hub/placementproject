import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Placement Management System API Running...");
});

// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});