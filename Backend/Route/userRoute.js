import express from "express";


const router = express.Router();

import { getuser,loginCheck,loginUser,logout,registerUser, updatePassword } from "../Controller/userController.js";
import protect from "../Middleware/authMiddleware.js";

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logincheck',loginCheck);
router.get('/logout',logout);
router.get('/getuser',protect,getuser);
router.post('/resetpassword',protect,updatePassword);


export default router;  