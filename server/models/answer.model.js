import mongoose, { Schema } from "mongoose";

// Answer Schema
const answerSchema = new Schema(
  {
    correctAnswer: { type: String, required: true },
    modulename: {
      type: String,
      required: true,
    },
    questionNumber: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
