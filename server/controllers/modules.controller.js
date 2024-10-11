import moduleModel from "../models/module.model.js";
import TestModel from "../models/Test.model.js";
import videoModels from "../models/video.model.js";

// Get module by videoId (optimized with consistent error codes and structure)
export const getModules = async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).send({ message: "videoId is required" });
    }
    const module = await moduleModel.findById(videoId);
    if (!module) {
      return res.status(404).send({ message: "Module not found" });
    }
    res.status(200).send(module);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add module (optimized by using async/await and handling missing fields)
export const addModule = async (req, res) => {
  try {
    const { testName, title } = req.body;
    
    if (!testName || !title) {
      return res.status(400).send({ message: "testName and title are required" });
    }

    const testData = await TestModel.findOne({ name: testName });
    if (!testData) {
      return res.status(404).send({ message: "Test not found" });
    }

    const videos = await videoModels.find({ moduleName: title });
    if (!videos.length) {
      return res.status(404).send({ message: "No videos found for the module" });
    }

    const videoIds = videos.map((item) => item._id);
    const newModule = await moduleModel.create({
      ...req.body,
      test: testData._id,
      videoId: videoIds,
    });

    res.status(201).send(newModule);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete module by videoId (optimized with better validation)
export const deleteModule = async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).send({ message: "videoId is required" });
    }

    const deletedModule = await moduleModel.findByIdAndDelete(videoId);
    if (!deletedModule) {
      return res.status(404).send({ message: "Module not found" });
    }

    res.status(200).send({ message: "Module successfully deleted", deletedModule });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update module (optimized with better structure and validation)
export const updateModule = async (req, res) => {
  try {
    const { title, videoId, test, moduleId } = req.body;

    if (!moduleId) {
      return res.status(400).send({ message: "moduleId is required" });
    }

    const updateContent = {
      ...(title && { title }),
      ...(videoId && { videoId }),
      ...(test && { test }),
    };

    const updatedModule = await moduleModel.findByIdAndUpdate(moduleId, updateContent, {
      new: true,
    });

    if (!updatedModule) {
      return res.status(404).send({ message: "Module not found" });
    }

    res.status(200).send({ message: "Module successfully updated", updatedModule });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
