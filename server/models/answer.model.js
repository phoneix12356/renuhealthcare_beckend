const mongoose = require("mongoose");
const { Schema } = mongoose;

// Answer Schema

const answerSchema = new Schema(
  {
    correctAnswer: { type: String, required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
