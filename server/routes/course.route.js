import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, editCourse, getCourseById, getCreatorCourses } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseID").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseID").get(isAuthenticated, getCourseById);

export default router;
