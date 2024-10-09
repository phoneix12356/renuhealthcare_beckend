
import express from "express";
import { getQuestions, addQuestions } from "../controllers/questionsController.js";

const router = express.Router();


router.get("/", getQuestions);
router.post("/", addQuestions);

export default router;
