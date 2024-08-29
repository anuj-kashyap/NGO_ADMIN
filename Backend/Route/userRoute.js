import express from "express";


const 
router = express.Router();

import { getuser,loginCheck,loginUser,logout,registerUser } from "../Controller/userController.js";

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logincheck',loginCheck);
router.get('/logout',logout);
router.get('/getuser',getuser);


export default router;