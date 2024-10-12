import express from "express";
import * as modulesController from "../controllers/modules.controller.js";

const moduleRouter = express.Router();

// Use the methods from modulesController
moduleRouter.get("/getModule/:id", modulesController.getModulesById);
moduleRouter.post("/postModule", modulesController.addModule);
moduleRouter.patch("/updateModule", modulesController.updateModule);
moduleRouter.delete("/deleteModule", modulesController.deleteModule);

export default moduleRouter;
