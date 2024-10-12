import express from "express";
import {
  getAllTests,
  createTest,
  updateTest,
  deleteTest,
  getTestById,
} from "../controllers/testController.js";

const router = express.Router();

router.get("/getalltest", getAllTests);

router.get("/:id", getTestById);

router.post("/", createTest);

router.patch("/:id", updateTest);

router.delete("/:id", deleteTest);

export default router;