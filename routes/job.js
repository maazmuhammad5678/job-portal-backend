const express = require("express");
const router = express.Router();

const {
    createJobs,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} = require("../controllers/job");

const {
    checkAuthentication,
    restrictTo
} = require("../middlewares/auth");

// Public routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Employer routes
router.post(
    "/",
    checkAuthentication,
    restrictTo("employer"),
    createJobs
);

router.get(
    "/my-jobs",
    checkAuthentication,
    restrictTo("employer"),
    getMyJobs
);

router.put(
    "/:id",
    checkAuthentication,
    restrictTo("employer"),
    updateJob
);

router.delete(
    "/:id",
    checkAuthentication,
    restrictTo("employer"),
    deleteJob
);

module.exports = router;