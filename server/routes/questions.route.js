import express from "express";
import {
  getQuestions,
  addQuestions,
  updateQuestion,
  deleteQuestion
} from "../controllers/questionsController.js"; // Ensure the path is correct

const router = express.Router();

router.get("/", getQuestions);
router.post("/", addQuestions);
router.put("/", updateQuestion); // Update a question using query params
router.delete("/", deleteQuestion); // Delete a question using query params

export default router;