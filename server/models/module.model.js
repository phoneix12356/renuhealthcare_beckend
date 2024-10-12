import mongoose, { Schema } from "mongoose";

// Module Schema (Optimized)
const moduleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, lowercase: true },
    videoId: [{ type: Schema.Types.ObjectId, ref: "Video" }], // Refers to videos
    test: { type: Schema.Types.ObjectId, ref: "Test" }, // Refers to test
    isCompleted: { type: Boolean, default: false },
    deadline: { type: Number, default: 30, required: true, min: 1 }, // Positive deadline validation
  },
  { timestamps: true }
);

const ModuleModel = mongoose.model("Module", moduleSchema);
export default ModuleModel;
