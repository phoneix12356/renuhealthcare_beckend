import express from "express";
import {
  getQuestions,
  addQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionById
} from "../controllers/questionsController.js";

const router = express.Router();

// Define routes in order of specificity
router.get("/getall", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", addQuestions);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;