import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        packageOffered: {
            type: Number,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        eligibilityCGPA: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
        },

        lastDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Company", companySchema);