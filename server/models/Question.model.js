import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
});
questionSchema.index({ questionText: 1 });
const questionModel = mongoose.model("Question", questionSchema);
export default questionModel;
