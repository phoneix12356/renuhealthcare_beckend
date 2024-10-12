import express from "express";
import {
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answere.controller.js";

const router = express.Router();

router.get("/get-answers", getAnswer);

router.post("/", createAnswer);

router.put("/", updateAnswer);

router.delete("/", deleteAnswer);

export default router;
