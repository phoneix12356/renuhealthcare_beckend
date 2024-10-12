import questionModel from "../models/Question.model.js";
import testModel from "../models/Test.model.js";

// Get Test
const getTest = async (req, res) => {
  console.log("get Test");
  const { name } = req.query;
  try {
    const testData = await testModel.find({ name }).populate("questions"); // Populate to get question details
    if (!testData.length) {
      return res.status(404).json({ message: "No data found" });
    }
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

export { getTest, createTest, updateTest, deleteTest };
