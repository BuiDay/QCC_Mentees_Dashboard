import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/isAuth";
import { getNotifications, updateNotifications } from "../controllers/notification.controller";

const router = express.Router();

router.get('/',isAuthenticated,authorizeRole("admin","mentor"),getNotifications)
router.put('/update-notification/:id',isAuthenticated,authorizeRole("admin","mentor"),updateNotifications)

export default router