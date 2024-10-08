import question from "../models/Question.model";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const qst = await question.find();
  console.log(qst);
});

router.post("/", async (req, res) => {
  try {
    const question = await question.create(req.body);
  } catch (err) {
    console.log(err.message);
  }
});
