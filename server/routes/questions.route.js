import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    // const questions = await Question.find({ questionText: "What keyword is used to declare a constant in JavaScript?" });
    res.status(200).json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); 
  try {
    const questions = await Question.insertMany(req.body, { session });

    await session.commitTransaction();
    res.status(201).json({
      Status: "Questions added successfully!",
      Note: "Use the GET method on the same route to see the questions"
    });
  } catch (err) {

    await session.abortTransaction();
    console.log(err.message);
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession(); 
  }
});

export default router;
