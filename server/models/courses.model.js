const mongoose = require("mongoose");
const { Schema } = mongoose;

// Course Schema
const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    module: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module, (exports = mongoose.model("Course", courseSchema));
