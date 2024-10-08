// import question from "../models/Question.model";
import Question from "../models/Question.model.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body);
    res.status(201).json({ Status: "Question added Succesfully!", Note: "Use the GET method on same route to see the questions" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;