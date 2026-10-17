const express = require("express");
const router = express.Router();

const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require("../controllers/application");

const {
    checkAuthentication,
    restrictTo
} = require("../middlewares/auth");

// Candidate routes
router.post(
    "/apply/:jobId",
    checkAuthentication,
    restrictTo("candidate"),
    applyForJob
);

router.get(
    "/my-applications",
    checkAuthentication,
    restrictTo("candidate"),
    getMyApplications
);

// Employer routes
router.get(
    "/job-applications",
    checkAuthentication,
    restrictTo("employer"),
    getJobApplications
);

router.patch(
    "/applications/:applicationId/status",
    checkAuthentication,
    restrictTo("employer"),
    updateApplicationStatus
);

module.exports = router;