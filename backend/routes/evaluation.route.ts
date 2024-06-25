import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { createEvaluateEachProject, getCommentById } from "../controllers/evaluation.controller";

const router = express.Router();

router.post('/',isAuthenticated,authorizeRole("admin","mentor"),createEvaluateEachProject)
router.get('/:id',isAuthenticated,authorizeRole("admin","mentor"),getCommentById)

export default router