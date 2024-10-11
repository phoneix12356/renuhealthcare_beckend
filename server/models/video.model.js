import mongoose, { Schema } from "mongoose";

// Video Schema
const videoSchema = new Schema(
  {
    moduleName: { type: String, required: true },
    VideoUrl: { type: String, required: true }, // Single video URL
    ContentUrl: { type: [String], required: true }, // Array of URLs
    isCompleted: { type: Boolean, default: false },
    watchTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const videoModels = new mongoose.model("Video", videoSchema);
export default videoModels;
