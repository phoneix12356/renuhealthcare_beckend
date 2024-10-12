import express from "express";
import {
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerByQuestionId
} from "../controllers/answere.controller.js";

const router = express.Router();

router.get("/", getAnswer);

router.get("/:qid", getAnswerByQuestionId);

router.post("/", createAnswer);

router.put("/", updateAnswer);

router.delete("/", deleteAnswer);

export default router;
