import{ Router } from "express"
import { CoachProfileDetails, UpdateCoachProfile } from "../controller/CoachProfile.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
const router = Router ()

router.post("/coachprofile" , verifyJWT ,CoachProfileDetails)

router.put("/editCoahcProfile", verifyJWT , upload.fields([
    {name : "CoachProfileImage" , maxCount : 1} , 
    {name : "CoachCoverImage"   , maxCount :1}]) 
    ,UpdateCoachProfile)

export default router