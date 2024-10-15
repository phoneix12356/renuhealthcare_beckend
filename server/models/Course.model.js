import mongoose, { Schema } from "mongoose";

// Course Schema
const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, lowercase: true },
    modulesName: {
      type: [String],
      required: true,
      lowercase: true, 
      trim: true,
    },
    modulesIds: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    isCompleted: { type: Boolean, default: false },
    deadline: {
      type: Number,
      default: 30,
      required: true,
      min: 1, 
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
