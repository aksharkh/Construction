import express from "express";
import { body } from "express-validator";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { submitBid } from "../controllers/bidController.js";



const router = express.Router();

const validateBid = [
    body("price").isDecimal().withMessage("Price must be a valid number"),
    body("estimatedDuration").notEmpty().withMessage("Estimated duration is required"),
];

router.route("/:projectId")
    .post(protect, authorize("Contractor"), validateBid, submitBid);

export default router;