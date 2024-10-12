import moduleModel from "../models/module.model.js";
import TestModel from "../models/Test.model.js";
import videoModels from "../models/video.model.js";

// Get module by ID (Optimized)
export const getModulesById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    const module = await moduleModel
      .findById(id)
      .populate("videoId")
      .populate("test");

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(module);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a module (Optimized)
export const addModule = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Test name and module title are required" });
    }

    // Fetch test by title
    const test = await TestModel.findOne({ title });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Fetch videos by title
    const videos = await videoModels.find({ title });
    if (!videos.length) {
      return res
        .status(404)
        .json({ message: "No videos found for the module" });
    }

    // Create new module
    const newModule = await moduleModel.create({
      ...req.body,
      test: test._id,
      videoId: videos.map((video) => video._id),
    });

    res.status(201).json(newModule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a module by ID (Optimized)
export const deleteModule = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    const deletedModule = await moduleModel.findByIdAndDelete(videoId);

    if (!deletedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res
      .status(200)
      .json({ message: "Module deleted successfully", deletedModule });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a module (Optimized)
export const updateModule = async (req, res) => {
  try {
    const { moduleId, title, videoId, test } = req.body;

    if (!moduleId) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    const updateData = {
      ...(title && { title }),
      ...(videoId && { videoId }),
      ...(test && { test }),
    };

    const updatedModule = await moduleModel.findByIdAndUpdate(
      moduleId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res
      .status(200)
      .json({ message: "Module updated successfully", updatedModule });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
