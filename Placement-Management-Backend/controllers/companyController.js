import Company from "../models/Company.js";

export const addCompany = async (req, res) => {

    try {

        const company = await Company.create(req.body);

        res.status(201).json({
            success: true,
            message: "Company Added Successfully",
            company,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getCompanies = async (req, res) => {

    try {

        const companies = await Company.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            companies,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getCompany = async (req, res) => {

    try {

        const company = await Company.findById(req.params.id);

        if (!company) {

            return res.status(404).json({
                message: "Company Not Found",
            });

        }

        res.json({
            success: true,
            company,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateCompany = async (req, res) => {

    try {

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Company Updated Successfully",
            company,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteCompany = async (req, res) => {

    try {

        await Company.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Company Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        }) ;

    }

};