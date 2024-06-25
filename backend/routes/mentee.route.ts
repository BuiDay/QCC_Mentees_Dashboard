import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { createMentee, getAllMentee, getEvaluationByMentee, getInfoByMentee, getInfoCourseByMenteeGenerateCode, getMenteeById, getMenteeCourses, updateAvatarMentee, updateInfoByMentee, updateInfoGenerateCode, updateInfoMentee } from "../controllers/mentee.controller";


const router = express.Router();

router.post('/create',isAuthenticated,authorizeRole("admin","mentor"),createMentee) 
router.put('/update',isAuthenticated,authorizeRole("admin","mentor"),updateInfoMentee)
router.get('/',isAuthenticated,authorizeRole("admin"),getAllMentee)
router.get('/:id',isAuthenticated,authorizeRole("admin",'mentor',"moderator"),getMenteeById) 
router.get('/mentee-course/:id',isAuthenticated,authorizeRole("admin",'mentor',"moderator"),getMenteeCourses) 


router.post('/generate-code',updateInfoGenerateCode)
router.get('/get-info-by-mentee/:token',getInfoByMentee)
router.put('/update-info-by-mentee/:token',updateInfoByMentee)
router.post('/update-avatar/:menteeId', updateAvatarMentee)

router.post('/search-evaluation-generate-code',getInfoCourseByMenteeGenerateCode)
router.get('/search-evaluation/:token',getEvaluationByMentee)




export default router

