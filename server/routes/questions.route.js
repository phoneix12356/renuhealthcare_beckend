
import express from "express";
import { getQuestions, addQuestions } from "../controllers/questionsController.js";

const router = express.Router();

<<<<<<< HEAD

router.get("/", getQuestions);
router.post("/", addQuestions);

export default router;
=======
router.get("/", async (req, res) => {
   console.log('hello');
});

router.post("/", async (req, res) => {
  console.log('hello');
});
>>>>>>> main
