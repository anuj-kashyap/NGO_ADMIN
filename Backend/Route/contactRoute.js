import express from "express";


const router = express.Router();
import { contact,getContact,deleteContact } from "../Controller/contactController.js";


router.post('/contact',contact);
router.get('/getcontact',getContact);
router.delete('/deletecontact',deleteContact);


export default router;