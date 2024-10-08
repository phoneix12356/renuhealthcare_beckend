import Question from "../models/Question.model.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const addQuestions = async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body);
    res.status(201).json({
      Status: "Question added Successfully!",
      Note: "Use the GET method on the same route to see the questions",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
