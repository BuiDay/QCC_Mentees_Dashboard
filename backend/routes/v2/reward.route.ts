import express from "express";
import { awardTopMentee } from "../../controllers/v2/reward.controller";
const router = express.Router();

router.get('/top-mentee',awardTopMentee) 



export default router

