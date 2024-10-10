
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
