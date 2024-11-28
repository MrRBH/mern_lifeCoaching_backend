import { CoachProfileQualification } from '../controller/CoachProfile.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from "express"; 

const router = Router(); 

router.post("/coachqualificationdetails",  verifyJWT, CoachProfileQualification)
export default router;