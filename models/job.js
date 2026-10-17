const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        min: 0
    },

    description: {
        type: String,
        required: true
    },

    requirements: {
        type: [String],
        default: []
    },

    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship"],
        required: true
    },

    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);