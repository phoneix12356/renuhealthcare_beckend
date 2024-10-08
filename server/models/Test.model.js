import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    isFinalTest: {
      type: Boolean,
      default: false,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
    length: {
      type: Number,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TestModel = mongoose.model("Test", testSchema);

export default TestModel;