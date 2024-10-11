import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  post: { type: String, required: true }, // course
  completedModules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  completedTest: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  completedVideo: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  completedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModal = mongoose.model("user", userSchema);

export default userModal;
