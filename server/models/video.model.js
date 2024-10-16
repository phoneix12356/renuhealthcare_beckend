import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, lowercase: true },
    videoUrl: { type: String, required: true, trim: true },
    contentUrl: { type: [String], required: true, trim: true },
    videoLength: { type: Number, default: 0},
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;
