import mongoose, { Schema } from "mongoose";

// Course Schema
const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    module: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const module = mongoose.model("Course", courseSchema);
export default module;
