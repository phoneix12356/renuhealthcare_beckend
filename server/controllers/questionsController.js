import Answer from "../models/answer.model.js";
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

// Add multiple questions without transaction
export const addQuestions = async (req, res) => {
  const data = req.body;

  try {
    const questions = data.map(item => ({
      questionText: item.questionText,
      options: item.options,
    }));

    // Insert questions and retrieve their ids
    const insertedQuestions = await Question.insertMany(questions);
    const answere = insertedQuestions.map((item, index) => ({
      questionId: item._id,
      answer: data[index].correctAnswer,
    }));

    // Insert corresponding answers
    await Answer.insertMany(answere);

    res.status(201).json({
      Status: "Questions and answers added successfully!",
      Note: "Use the GET method to view the questions and answers",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update a question by ID (with answer update)
export const updateQuestion = async (req, res) => {
  const { id } = req.query;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // If the correct answer is also updated, update the corresponding answer
    if (req.body.correctAnswer) {
      await Answer.findOneAndUpdate(
        { questionId: id },
        { answer: req.body.correctAnswer }
      );
    }

    res.status(200).json({
      Status: "Question and corresponding answer updated successfully!",
      updatedQuestion,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a question and related answer by ID
export const deleteQuestion = async (req, res) => {
  const { id } = req.query;

  try {
    // Delete the question
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Delete the corresponding answer
    await Answer.deleteMany({ questionId: id });

    res.status(200).json({
      Status: "Question and corresponding answer deleted successfully!",
      deletedQuestion,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
