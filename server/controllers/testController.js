import questionModel from "../models/Question.model.js";
import testModel from "../models/Test.model.js";

// Get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await testModel.find().populate("questions");
    if (!tests.length) {
      return res.status(404).json({ message: "No tests found" });
    }
    res.status(200).json(tests);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a test by ID
export const getTestById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const test = await testModel.findById(id).populate("questions");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new test
export const createTest = async (req, res) => {
  try {
    const { title } = req.body;

    // Fetch all questions based on the title
    const questions = await questionModel.find({ title });
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Map question IDs
    const questionIds = questions.map((q) => q._id);

    // Create the new test with the fetched question IDs
    const newTest = await testModel.create({ ...req.body, questions: questionIds });

    res.status(201).json({
      message: "Test created successfully",
      data: newTest,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a test by ID
export const updateTest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTest = await testModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a test by ID
export const deleteTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTest = await testModel.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
