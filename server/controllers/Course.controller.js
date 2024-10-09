import Course from "../models/Course.model";
import Module from "../models/module.model";
import User from "../models/User.model";

// Course Controller
const courseController = {
  // Add a new course
  async addCourse(req, res) {
    const { title, module } = req.body;
    try {
      const course = await Course.create({ title, module });
      res.status(201).json(course);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Get all courses
  async getAllCourses(req, res) {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Get a course by ID
  async getCourseById(req, res) {
    try {
      const course = await Course.findById(req.params.id)
        .populate("module")
        .populate("test");
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.status(200).json(course);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update a course by ID
  async updateCourse(req, res) {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.status(200).json(course);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete a course by ID
  async deleteCourse(req, res) {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Mark a course as completed if all modules in the course are completed
  async completeCourse(req, res) {
    const { courseId, userId } = req.body;
    try {
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user) return res.status(404).json({ message: "User not found" });
      if (!course) return res.status(404).json({ message: "Course not found" });

      course.isCompleted = true;
      user.completeCourse.push(courseId);
      await user.save();
      await course.save();
      res.status(200).json({ message: "Course completed", course });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Add an existing test to a course
  async addModuleToCourse(req, res) {
    const { courseId, moduleId } = req.body; // Expecting courseId and testId in the request body
    try {
      const course = await Course.findById(courseId);
      const module = await Module.findById(moduleId);

      if (!course) return res.status(404).json({ message: "Course not found" });
      if (!module) return res.status(404).json({ message: "Test not found" });

      // Check if the test is already associated with the course
      if (course.module.includes(moduleId)) {
        return res
          .status(400)
          .json({ message: "Test is already added to this course" });
      }

      // Add the test to the course
      course.module.push(moduleId);
      await course.save();
      res.status(200).json({ message: "Module added to course", course });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = courseController;
