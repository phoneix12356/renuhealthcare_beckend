import mongoose, { Schema } from "mongoose";

// Answer Schema
const answerSchema = new Schema(
  {
    answer: { type: String, required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);
answerSchema.index({ questionId: 1 });

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
