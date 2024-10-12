import questionModel from "../models/Question.model.js";
import testModel from "../models/Test.model.js";

// Get Test
const getAllTest = async (req, res) => {
  try {
    const testData = await testModel.find().populate("questions"); // Populate to get question details
    if (!testData.length) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json(testData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
const getTestbyId = async (req, res) => {
  console.log("Hello");
  const { id } = req.params;
  console.log(id);

  try {
    // Find the test by ID and populate the questions field
    const testData = await testModel.find({ _id: id }).populate("questions");

    // If no test data is found, return 404
    if (!testData) {
      return res.status(404).json({ message: "No test found with this ID" });
    }

    // Return the test data
    return res.status(200).json(testData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Create Test
const createTest = async (req, res) => {
  try {
    console.log("test", req.body);

    // Fetch all questions from the database automatically
    const questionsData = await questionModel.find({});

    if (!questionsData.length) {
      return res.status(404).json({ message: "No questions found to link" });
    }

    // Link the fetched question IDs to the test
    const questionIds = questionsData.map((item) => item._id);
    req.body.questions = questionIds; // Automatically setting the questions field

    const newTest = await testModel.create(req.body);

    return res.status(201).json({
      message:
        "Test successfully created. You can retrieve the test using the getTest function.",
      data: newTest,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

// Update Test
const updateTest = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const updatedTest = await testModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully updated", data: updatedTest });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Delete Test
const deleteTest = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const deletedTest = await testModel.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: "No data found to delete" });
    }
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { getAllTest, createTest, updateTest, deleteTest, getTestbyId };