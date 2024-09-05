import express from 'express';
import { registerVolunteer,getVolunteerDetails,createVolunteer } from '../Controller/volunteerController.js';
import upload from '../Middleware/upload.js';


const router = express.Router();


router.post('/register',upload.single('image'),registerVolunteer);
router.get('/',getVolunteerDetails);
// router.post('/add',createVolunteer);


export default router;
