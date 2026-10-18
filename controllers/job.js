const Job = require("../models/job");
const Application = require("../models/application");

// Create a job (Employer only)
async function createJobs(req, res) {
    try {
        const {
            title,
            company,
            location,
            salary,
            description,
            requirements,
            jobType
        } = req.body;

        if (
            !title ||
            !company ||
            !location ||
            !description ||
            !jobType
        ) {
            return res.status(400).json({
                message: "Please provide all required job fields"
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            description,
            requirements,
            jobType,
            employer: req.user.id
        });

        return res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

// Get all jobs and search jobs

async function getJobs(req, res) {
    try {
        const { search, location, jobType } = req.query;

        const filter = {};

        // Search by title, company, or description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Filter by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        // Filter by job type
        if (jobType) {
            filter.jobType = jobType;
        }

        const jobs = await Job.find(filter)
            .populate("employer", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error("Get Jobs Error:", error);

        return res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
}
// Get a single job
async function getJobById(req, res) {
    try {
        const job = await Job.findById(req.params.id)
            .populate("employer", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({ job });
    } catch (error) {
        return res.status(400).json({
            message: "Invalid job ID"
        });
    }
}

// Edit a job (owner employer only)
async function updateJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only edit your own jobs"
            });
        }

        const allowedFields = [
            "title",
            "company",
            "location",
            "salary",
            "description",
            "requirements",
            "jobType"
        ];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                job.set(field, req.body[field]);
            }
        }

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            job
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

// Delete a job (owner employer only)
async function deleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only delete your own jobs"
            });
        }

        await Application.deleteMany({ job: job._id });
        await job.deleteOne();

        return res.status(200).json({
            message: "Job and its applications deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete job"
        });
    }
}

// View jobs posted by the logged-in employer
async function getMyJobs(req, res) {
    try {
        const jobs = await Job.find({
            employer: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count: jobs.length,
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch your jobs"
        });
    }
}

module.exports = {
    createJobs,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
};