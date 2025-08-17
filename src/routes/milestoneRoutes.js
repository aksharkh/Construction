import express from "express";
import { body } from "express-validator";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { createMilestone, getMilestonesForProject } from "../controllers/milestoneController.js";


const router = express.Router();

const validateMilestone = [
    body("name").notEmpty().withMessage("Milestone name is required")
];

router.route("/:projectId")
    .post(protect, authorize("homeowner", "Project Manager"), validateMilestone, createMilestone)
    .get(protect,  getMilestonesForProject);


export default router;
