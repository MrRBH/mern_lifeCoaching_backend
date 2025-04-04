import { Router } from "express";
import { BlockUserHandle, GetAllUserForaChat, GetUserChat, SendMessage  ,chathandle, chatscreen} from "../controller/Chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

 const router =  Router()
 router.get("/users", verifyJWT , GetAllUserForaChat)
 router.get("/viewchat" , verifyJWT , GetUserChat)
 router.post("/sendMessage"  ,verifyJWT, upload.single("Image") , SendMessage) 
 router.patch("/blockUser", verifyJWT , BlockUserHandle)
 router.get("/chat", chathandle)
 router.get("/chatscreen", chatscreen)


 

 export default router;  