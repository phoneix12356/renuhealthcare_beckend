
import testModel from "../models/Test.model.js";

const getTest = async (req, res) => {
  const { name } = req.query; 
  try {
    const testData = await testModel.find({ name });
    if (!testData.length) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json(testData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const createTest = async (req, res) => {
  try {
    const testData = await testModel.create(req.body);
    return res
      .status(201)
      .json({ message: "Successfully created", data: testData });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const updateTest = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const updatedTest = await testModel.findOneAndUpdate({ name }, req.body, {
      new: true,
    });
    if (!updatedTest) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully updated", data: updatedTest });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteTest = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const data = await testModel.deleteOne({ name });
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "No data found to delete" });
    }
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { getTest, createTest, updateTest, deleteTest };
