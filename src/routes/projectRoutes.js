import express from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";
import { body } from "express-validator";
import { authorize, protect } from "../middlewares/authMiddleware.js";


const router = express.Router();


const validateProject = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
];

router.route("/")
    .post(protect, authorize("homeowner"), validateProject, createProject)
    .get(protect, authorize("Contractor", "Project Manager"), getAllProjects);

router.route("/:id")
    .get(Project, getProjectById);

export default router;