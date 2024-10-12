import Answer from "../models/answer.model.js";
import Question from "../models/Question.model.js";
import mongoose from "mongoose";

// Get question by id
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid question ID" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  console.log("hello");
  try {
    const questions = await Question.find();
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }
    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Add multiple questions without transaction
export const addQuestions = async (req, res) => {
  const data = req.body;

  try {
    if (!Array.isArray(data) || !data.length) {
      return res.status(400).json({ message: "Data must be a non-empty array." });
    }

    const questions = data.map((item) => ({
      title: item.title?.trim().toLowerCase() || item.questionText.trim().toLowerCase(), // Use questionText as title if not provided
      questionText: item.questionText.trim().toLowerCase(),
      options: item.options.map((opt) => opt.trim().toLowerCase()),
    }));

    // Insert questions and retrieve their ids
    const insertedQuestions = await Question.insertMany(questions);
    const answers = insertedQuestions.map((item, index) => ({
      questionId: item._id,
      answer: data[index].correctAnswer.trim().toLowerCase(),
    }));

    // Insert corresponding answers
    await Answer.insertMany(answers);

    res.status(201).json({
      status: "Questions and answers added successfully!",
      note: "Use the GET method to view the questions and answers",
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
// Update a question by ID (with answer update)
export const updateQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // If the correct answer is also updated, update the corresponding answer
    if (req.body.correctAnswer) {
      await Answer.findOneAndUpdate(
        { questionId: id },
        { answer: req.body.correctAnswer.trim().toLowerCase() }
      );
    }

    res.status(200).json({
      status: "Question and corresponding answer updated successfully!",
      updatedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a question and related answer by ID
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    // Delete the question
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Delete the corresponding answer
    await Answer.deleteOne({ questionId: id });

    res.status(200).json({
      status: "Question and corresponding answer deleted successfully!",
      deletedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
