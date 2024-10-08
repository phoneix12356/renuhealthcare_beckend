import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, 
});

const questionModel = mongoose.model("Question", questionSchema);
export default questionModel;
