import mongoose, { Schema } from "mongoose";

// Video Schema (Optimized)
const videoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, lowercase: true }, // Corrected typo "titile" to "title"
    videoUrl: { type: String, required: true, trim: true }, // Single video URL
    contentUrl: { type: [String], required: true, trim: true }, // Array of content URL
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;
