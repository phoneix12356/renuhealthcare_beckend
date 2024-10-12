import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  title: { type: String, required: true, trim: true, lowercase: true },
  questionText: { type: String, required: true, trim: true, lowercase: true },
  options: [{ type: String, required: true, trim: true, lowercase: true }],
});

questionSchema.index({ questionText: 1, title: 1 });

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
