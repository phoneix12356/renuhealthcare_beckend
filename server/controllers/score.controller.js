import ScoresModel from "../models/Score.model.js";
import userModal from "../models/User.js";
import TestModel from "../models/Test.model.js";
import Question from "../models/Question.model.js";
import Answer from "../models/answer.model.js";

export const getAnswers = async (req, res) => {
    const { userId, testId, answers } = req.body;
    if (!Array.isArray(answers)) {
        return res.status(400).json({ Error: "Answers must be an array" });
    }
    if (!userId || !testId) {
        return res.status(401).json({ Error: "Either User is not authorised or the testId is incorrect" });
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
            const { questionId, selectedOption } = answer;

            // Retrieve the correct answer from the Answer model
            const correctAnswerEntry = await Answer.findOne({ questionId });
            if (!correctAnswerEntry) {
                return res.status(404).json({ Error: `Answer for question ID ${questionId} not found` });
            }

            // Compare the selected option with the correct answer
            if (correctAnswerEntry.answer == selectedOption) {
                score += 1;
            }
        }
        const savedScore = await new ScoresModel({
            score,
            userId,
            testId
        }).save();
        res.status(201).json({
            message: "Score calculated and saved successfully.",
            score: savedScore,
            testId,
            userId,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        })
    }
}