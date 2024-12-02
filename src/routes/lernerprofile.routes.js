import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import  { EditProfile } from "../controller/LernerProfile.Controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import lernerProfile from "../controller/LernerProfile.Controller.js";

const router = Router();

// Define routes with corrected paths
// router.get("/profileEnum", verifyJWT, userProfileEnum);
// router.post("/profiledata", verifyJWT, userProfiledata);
// router.post("/userprofileimage", verifyJWT, userprofileImage);

router.post("/profiledata", verifyJWT,  upload.single("lernerprofileImage"), lernerProfile);
router.post("/Editprofiledata", verifyJWT,  upload.single("lernerprofileImage"), EditProfile);
export default router;
