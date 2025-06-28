import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(isAuthenticated, getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseID").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseID").get(isAuthenticated, getCourseById);
router.route("/:courseID/lecture").post(isAuthenticated, createLecture);
router.route("/:courseID/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseID/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

export default router;
