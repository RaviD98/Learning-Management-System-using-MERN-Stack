import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCreatorCourses } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseID").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseID").get(isAuthenticated, getCourseById);
router.route("/:courseID/lecture").post(isAuthenticated, createLecture);
router.route("/:courseID/lecture").post(isAuthenticated, getCourseLecture);

export default router;
