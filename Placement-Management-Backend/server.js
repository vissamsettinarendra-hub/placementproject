import express from "express"
import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js"
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
//Middleware :converts json-object
app.use(express.json());
app.use(cors());//allows all origin form devlopment

//call connection DB
connectDB();

//student routes
app.use("/students",studentRoutes)

//company routes
app.use("/company",companyRoutes)

app.listen(8000,()=>{
    console.log("server is started at 8000");
});