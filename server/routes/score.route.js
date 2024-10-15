import express from "express";

import { postAnswers,getScore } from "../controllers/score.controller.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/calculate-score", checkUserAuth, postAnswers);
router.get("/", checkUserAuth, getScore);


export default router;
