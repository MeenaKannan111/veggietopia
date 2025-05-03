import express from "express";
import { recommendProducts } from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/:userId", recommendProducts);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
