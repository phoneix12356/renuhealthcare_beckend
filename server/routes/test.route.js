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

router.patch("/:id", updateTest);

router.delete("/:id", deleteTest);

export default router;
