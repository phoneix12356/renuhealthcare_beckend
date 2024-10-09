import express from "express";
const router = express.Router();
import courseController from "../controllers/Course.controller";

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/addCourse", courseController.addCourse);
router.put("/updateCourse/:id", courseController.updateCourse);
router.delete("/deleteCourse:id", courseController.deleteCourse);
router.put("/completeCourse", courseController.completeCourse);
router.put("/addModuleToCourse", courseController.addModuleToCourse);

module.exports = router;
