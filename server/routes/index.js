import express from "express";
import userRouter from "./userRoutes.js";
import testRouter from "./test.route.js";
import questions from "./questions.route.js";
import courserouter from "./Course.route.js";

const router = express.Router();
router.use("/user", userRouter);
router.use("/questions", questions);
router.use("/test", testRouter);
router.use("/course", courserouter);

export default router;
