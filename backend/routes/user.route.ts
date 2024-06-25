import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { createAssignmentByMentor, getAllMenteesOfCourse, getAllMentor, getAllUser, getCourseByMentor, getListMenteesOfCourse } from "../controllers/user.controller";
import { createReward } from "../controllers/v2/reward.controller";

const router = express.Router();

router.get('/all-mentor',isAuthenticated,authorizeRole("admin"),getAllMentor)
router.get('/all-user',isAuthenticated,authorizeRole("admin"),getAllUser)
router.get('/get-course-by-mentor',isAuthenticated,authorizeRole("admin","mentor","moderator"),getCourseByMentor)
router.get('/get-list-mentee-course/:id',isAuthenticated,authorizeRole("admin","mentor","moderator"),getListMenteesOfCourse)
router.get('/get-all-mentee-course',isAuthenticated,authorizeRole("admin",'moderator'),getAllMenteesOfCourse)


//// route tạo nộp bài
router.post('/create-assignment',isAuthenticated,authorizeRole("admin",'mentor'),createAssignmentByMentor)

// tạo các reward
router.post('/create-reward',isAuthenticated,authorizeRole("admin"),createReward)

export default router