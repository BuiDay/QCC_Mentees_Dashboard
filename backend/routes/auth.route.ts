import express from 'express';
import { registrationUser,activateUser, loginUser,updateAvatar,logoutUser,getUserById,updateAccessToken, updateUserInfo, updatePassword, registerEmployee, deleteUser } from '../controllers/auth.controller';
import { authorizeRole, isAuthenticated } from '../middleware/isAuth';
const router = express.Router();

router.post('/registration',registrationUser)
router.post('/registration-employee',isAuthenticated,authorizeRole("admin"),registerEmployee)

router.post('/active-user',activateUser)

router.post('/login-user',loginUser)

router.get('/logout-user',isAuthenticated,logoutUser)

router.get('/refresh-token',updateAccessToken)

router.get('/get-user-by-id',isAuthenticated, getUserById)

router.put('/update-user-info',isAuthenticated,authorizeRole("admin"), updateUserInfo)
router.delete('/',isAuthenticated,authorizeRole("admin"), deleteUser)

router.put('/update-user-password',isAuthenticated, updatePassword)
router.post('/update-user-avatar',isAuthenticated, updateAvatar)

export default router 