import express from "express";
import { submitFeedback, getFeedbacks } from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/auth.js";  // use your auth middleware

const router = express.Router();

// Feedback submission (for consumers/farmers)
router.post("/", verifyToken, submitFeedback);

// Admin feedback view (could protect this further with admin middleware)
router.get("/", verifyToken, getFeedbacks);

export default router;