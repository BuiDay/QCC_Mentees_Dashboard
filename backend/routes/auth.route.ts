import express from "express";
import { forgotPassword, loginUser, resetPassword, updateAccessToken } from "../controllers/auth.controller";

const router = express.Router();

router.get('/forgot-password',forgotPassword) 
router.post('/reset-password',resetPassword) 
router.post('/login-user',loginUser) 

router.get('/refresh-token',updateAccessToken)

export default router

