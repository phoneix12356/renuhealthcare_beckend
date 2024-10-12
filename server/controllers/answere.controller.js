import Answer from "../models/answer.model.js";

export const getAnswerByQuestionId = async (req, res) => {
  try {
    const { qid } = req.params;
    const data = await Answer.findOne({ questionId: qid });
    if (!data) {
      return res.status(404).json({ message: "Answer not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getAnswer = async (req, res) => {
  try {
    const answers = await Answer.find();
    return res.status(200).json(answers);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const createAnswer = async (req, res) => {
  try {
    const answer = await Answer.insertMany(req.body);
    return res.status(201).json(answer);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    const answer = await Answer.findByIdAndUpdate(id, req.body, { new: true });
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    return res.status(200).json(answer);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    const answer = await Answer.findByIdAndDelete(id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    return res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};