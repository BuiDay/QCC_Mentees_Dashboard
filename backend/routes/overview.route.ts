import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { analyticsAgeAllMentees, analyticsAverageScoreAllMentees, analyticsOverviewAmountMentees, analyticsProvinceAllMentees, analyticsRankMentees } from "../controllers/overview.controller";

const router = express.Router();

router.get('/analytics-age-all-mentee',isAuthenticated,authorizeRole("admin"),analyticsAgeAllMentees)
router.get('/analytics-province-all-mentee',isAuthenticated,authorizeRole("admin"),analyticsProvinceAllMentees)
router.get('/analytics-rank-all-mentee',isAuthenticated,authorizeRole("admin"),analyticsRankMentees)
router.get('/analytics-classify-average-score-all-mentee',analyticsAverageScoreAllMentees)
router.get('/analytics-amount-all-mentee',analyticsOverviewAmountMentees)


export default router