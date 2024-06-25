import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { analyticsCourse, createCourse, getAllCourses, getCourseById} from "../controllers/course.controller";


const router = express.Router();

router.post('/',isAuthenticated,authorizeRole("admin"),createCourse)

router.get('/',isAuthenticated,authorizeRole("admin","mentor","moderator"),getAllCourses)

router.get('/:id',isAuthenticated,authorizeRole("admin","mentor"),getCourseById)

router.get(`/analytics/rate`,analyticsCourse)

export default router