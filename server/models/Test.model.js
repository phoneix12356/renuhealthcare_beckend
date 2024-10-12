import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, lowercase: true },
    questions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      validate: [(val) => val.length > 0, "At least one question is required."], // Custom validation
    },
    isFinalTest: { type: Boolean, default: false },
    length: { type: Number, min: 1 }, // Ensure the length is positive
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TestModel = mongoose.model("Test", testSchema);
export default TestModel;
