import express from "express";
import userRouter from './userRoutes.js';
import testRouter from './test.route.js'
import questions from "./questions.route.js";
import moduleRouter from "./module.route.js";
import videoRouter from "./video.route.js";

const router = express.Router();
router.use('/user', userRouter);
router.use('/questions', questions);
router.use('/test', testRouter);
router.use('/module', moduleRouter)
router.use('/video', videoRouter)
export default router;