import question from "../models/Question.model";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
   console.log('hello');
});

router.post("/", async (req, res) => {
  console.log('hello');
});
