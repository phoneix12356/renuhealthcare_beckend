import express from "express";
import {
  getTest,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/testController.js";

const router = express.Router();

router.get("/", getTest);

router.post("/", createTest);

router.put("/", updateTest);

router.delete("/", deleteTest);

export default router;
