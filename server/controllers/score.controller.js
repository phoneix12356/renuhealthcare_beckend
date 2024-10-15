import ScoresModel from "../models/Score.model.js";
import userModal from "../models/User.js";
import TestModel from "../models/Test.model.js";
import Answer from "../models/answer.model.js";

export const postAnswers = async (req, res) => {
  const { testId, answers } = req.body;
  const userId = req.user._id;
  if (!Array.isArray(answers)) {
    return res.status(400).json({ Error: "Answers must be an array" });
  }
  if (!userId || !testId) {
    return res.status(401).json({
      Error: "Either User is not authorised or the testId is incorrect",
    });
  }
  try {
    const user = await userModal.findById(userId);
    const test = await TestModel.findById(testId);
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    if (!test) {
      return res.status(404).json({ Error: "Test not found" });
    }
    let score = 0;
    for (let answer of answers) {
      if (answer.selectedOption === "") continue;
      const { questionId, selectedOption } = answer;

      // Retrieve the correct answer from the Answer model
      const correctAnswerEntry = await Answer.findOne({ questionId });
      if (!correctAnswerEntry) {
        return res
          .status(404)
          .json({ Error: `Answer for question ID ${questionId} not found` });
      }

      // Compare the selected option with the correct answer
      if (correctAnswerEntry.answer === selectedOption) {
        score += 1;
      }
    }
    const savedScore = await new ScoresModel({
      score,
      userId,
      testId,
      totalQuestions: Number(test.questions.length),
    }).save();
    res.status(201).json({
      message: "Score calculated and saved successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getScore = async (req, res) => {
  const userId = req.user._id;
  console.log("getScore ke andar", userId);
  if (!userId) {
    return res.status(401).json({
      Error: "Either User is not authorised or the testId is incorrect",
    });
  }
  try {
    const userScore = await ScoresModel.findOne({ userId });
    if (!userScore) {
      return res
        .status(404)
        .json({ Error: `no score card is found for that user` });
    }

    return res.status(201).json(userScore);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
