const Application = require("../models/application");
const Job = require("../models/job");

// Candidate applies for a job
async function applyForJob(req, res) {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const application = await Application.create({
            job: job._id,
            candidate: req.user.id
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "You have already applied for this job"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        return res.status(500).json({
            message: "Failed to submit application"
        });
    }
}

// Candidate views their applications
async function getMyApplications(req, res) {
    try {
        const applications = await Application.find({
            candidate: req.user.id
        })
            .populate("job")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: applications.length,
            applications
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
}

// Employer views applications for their own jobs
async function getJobApplications(req, res) {
    try {
        const employerJobs = await Job.find({
            employer: req.user.id
        }).select("id");

        const jobIds = employerJobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds }
        })
            .populate("job", "title company location")
            .populate("candidate", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: applications.length,
            applications
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch job applications"
        });
    }
}

// Employer updates application status
async function updateApplicationStatus(req, res) {
    try {
        const { status } = req.body;

        if (!["Applied", "Shortlisted", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application = await Application.findById(
            req.params.applicationId
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const job = await Job.findOne({
            _id: application.job,
            employer: req.user._id
        });

        if (!job) {
            return res.status(403).json({
                message: "You cannot manage this application"
            });
        }

        application.status = status;
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            application
        });
    } catch (error) {
        return res.status(400).json({
            message: "Invalid application ID"
        });
    }
}

module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
};