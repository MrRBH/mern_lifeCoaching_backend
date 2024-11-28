import { Router } from "express" ;
import Blogpost from "../controller/Blogs.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
  
 const router  =  Router()

 router.post("/blog", verifyJWT ,upload.fields([{name:"BlogImage" , maxCount : 1}, {name : "thumbnail" , maxCount : 1}]) ,  Blogpost)

 export default router ;