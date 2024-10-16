import express from "express";
import {
  userRegistration,
  userLogin,
  changeUserPassword,
  sendEmailResetPassword,
  userPasswordReset,
  download,
  addCompletedModuleToUserDatabase,
  addCompletedTestToUserDatabase,
  addFullWatchedVideosToUserDatabase,
  getSingleUser,
} from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
const userRouter = express.Router();

// Route level Middleware - To protect route.
userRouter.use("/changepassword", checkUserAuth);

// Public Routes
userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/send-reset-password", sendEmailResetPassword);
userRouter.post("/reset/password/:id/:token", userPasswordReset);
userRouter.get("/getUser/:id", getSingleUser);
userRouter.get("/download-certificate", checkUserAuth, download);
userRouter.put(
  "/add-completed-module",
  checkUserAuth,
  addCompletedModuleToUserDatabase
);
userRouter.put(
  "/add-completed-test",
  checkUserAuth,
  addCompletedTestToUserDatabase
);
userRouter.put("/add-completed-video", addFullWatchedVideosToUserDatabase);
// Protected Routes
userRouter.post("/changepassword", changeUserPassword);

export default userRouter;
