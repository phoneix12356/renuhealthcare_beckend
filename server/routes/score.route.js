import express from "express";

import {
    getAnswers
} from "../controllers/score.controller.js";

const router = express.Router();

router.get("/calculate-score", getAnswers);


export default router;