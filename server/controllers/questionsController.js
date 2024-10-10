import Question from "../models/Question.model.js";
import mongoose from "mongoose";
// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Add multiple questions
export const addQuestions = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const questions = await Question.insertMany(req.body);
    await session.commitTransaction();
    res.status(201).json({
      Status: "Questions added successfully!",
      Note: "Use the GET method on the same route to see the questions",
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Update a question by ID using query parameters
export const updateQuestion = async (req, res) => {
  const session = await mongoose.startSession();
  const { id } = req.query; // Get the ID from query parameters
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    await session.commitTransaction();
    res.status(200).json({
      Status: "Question updated successfully!",
      updatedQuestion,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

// Delete a question by ID using query parameters
export const deleteQuestion = async (req, res) => {
  const { id } = req.query; // Get the ID from query parameters
  const session = mongoose.startSession();
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    await session.commitTransaction();
    res.status(200).json({
      Status: "Question deleted successfully!",
      deletedQuestion,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};
