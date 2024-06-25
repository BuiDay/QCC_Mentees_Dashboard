import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { analyticsCourseLastMonth, analyticsMenteeLastMonth } from "../controllers/analytics.controller";
import { analyticsAverageScoreEachProject, analyticsCriterionStrengthsMentee } from "../controllers/mentee.controller";

const router = express.Router();

router.get('/mentee-last-month',isAuthenticated,authorizeRole("admin"),analyticsMenteeLastMonth)
router.get('/course-last-month',isAuthenticated,authorizeRole("admin"),analyticsCourseLastMonth)

router.get("/criterion-strengths/:menteeId",isAuthenticated,authorizeRole("admin"),analyticsCriterionStrengthsMentee)
router.get("/average-score-each-project/:menteeId",isAuthenticated,authorizeRole("admin"),analyticsAverageScoreEachProject)

export default router