import express from "express";

import {
    addCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", addCompany);

router.get("/", getCompanies);

router.get("/:id", getCompany);

router.put("/:id", updateCompany);

router.delete("/:id", deleteCompany);

export default router;