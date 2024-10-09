import express from "express";
import userRouter from './userRoutes.js';
import testRouter from './test.route.js'
// import questionRouter from "./questions.route.js";

const router = express.Router();
router.use('/user', userRouter);
// router.use('/question', questionRouter);
router.use('/test', testRouter);

export default router;
