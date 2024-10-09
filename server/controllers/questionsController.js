import Question from "../models/Question.model.js";

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
  try {
    const questions = await Question.insertMany(req.body);
    res.status(201).json({
      Status: "Questions added successfully!",
      Note: "Use the GET method on the same route to see the questions",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update a question by ID using query parameters
export const updateQuestion = async (req, res) => {
  const { id } = req.query; // Get the ID from query parameters
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({
      Status: "Question updated successfully!",
      updatedQuestion,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a question by ID using query parameters
export const deleteQuestion = async (req, res) => {
  const { id } = req.query; // Get the ID from query parameters
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({
      Status: "Question deleted successfully!",
      deletedQuestion,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
