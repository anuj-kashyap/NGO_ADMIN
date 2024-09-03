import express from 'express';
import { registerVolunteer,getVolunteerDetails,createVolunteer } from '../Controller/volunteerController.js';
import upload from '../Middleware/upload.js';


const router = express.Router();


router.post('/register',registerVolunteer);
router.get('/',getVolunteerDetails);
router.post('/add',upload.single('image'),createVolunteer);


export default router;
