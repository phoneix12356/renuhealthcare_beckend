import mongoose, { Schema } from "mongoose";

// Video Schema
const videoSchema = new Schema(
  {
    content: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    watchTime : {
      type : Number,
      required: true,
      default : 0
    }
  },
  { timestamps: true }
);


const videoModels = new mongoose.model("Video", videoSchema);
export default videoModels;
