import express from "express";
import {
  getAllTest,
  createTest,
  updateTest,
  deleteTest,
  getTestbyId,
} from "../controllers/testController.js";

const router = express.Router();

router.get("/getalltest", getAllTest);

router.get("/:id", getTestbyId);

router.post("/", createTest);

router.patch("/:id", updateTest);

router.delete("/:id", deleteTest);

export default router;