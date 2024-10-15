import mongoose, { Schema } from "mongoose";

const scoreSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  totalQuestions: {
    type: Number,
    require: true,
  },
});

const ScoresModel = mongoose.model("score", scoreSchema);
export default ScoresModel;
