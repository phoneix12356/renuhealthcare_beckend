import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  post: { type: String, required: true, lowercase: true, trim: true }, // Reference course title
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference course ID
  completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  completedTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
  completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
