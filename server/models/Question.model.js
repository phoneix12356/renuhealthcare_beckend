import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
});

const questionModel = mongoose.model("Question", questionSchema);
export default questionModel;
