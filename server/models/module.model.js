import mongoose, { Schema } from "mongoose";

// Module Schema
const moduleSchema = new Schema(
  {
    title: { type: String, required: true },
    videoId: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    test: { type: Schema.Types.ObjectId, ref: "Test" },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
