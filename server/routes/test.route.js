import express from "express";
import testModel from "../models/Test.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { _id } = req.body;
  const testData = await testModel.find({ _id });
  console.log(testData);
});

router.post("/", async (req, res) => {
  try {
    const testData = await testModel.create(req.body);
    console.log(testData);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
