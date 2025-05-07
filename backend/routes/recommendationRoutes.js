import express from "express";
import { recommendProducts } from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/:userId", recommendProducts);


export default router;

