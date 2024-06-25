import express from "express";
const multer = require('multer');
import { authorizeRole, isAuthenticated } from "../../middleware/isAuth";
import { getAssignmentForMentee, rankingOfMentee, submissionByMentee } from "../../controllers/v2/mentee.controller";
const router = express.Router();
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
        const dir = `uploads/submission/${date}`;

        // Kiểm tra và tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/submissions', upload.single('file'),submissionByMentee) 
router.get('/assignment',getAssignmentForMentee) 
router.get('/ranking',rankingOfMentee) 



export default router

