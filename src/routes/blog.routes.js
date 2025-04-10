import { Router } from "express" ;
import { Blogpost ,DeleteBlog,EditBlog,blogList, singleBlog } from "../controller/Blogs.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";
  
 const router  =  Router()

 router.post("/blog", verifyJWT ,upload.fields([{name:"BlogImage" , maxCount : 1}, {name : "thumbnail" , maxCount : 1}]) ,  Blogpost)
 router.put ("/editblog", verifyJWT , upload.fields([{name:"BlogImage" , maxCount : 1}, {name : "thumbnail" , maxCount : 1}]),EditBlog )
 router.get("/blogs", verifyJWT , blogList)
 router.get("/blog", verifyJWT , singleBlog) 
 router.delete("/DeleteBlog", verifyJWT , DeleteBlog)

 export default router ;