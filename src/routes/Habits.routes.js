import { Router } from "express";
import { RegularCreateHabit } from "../controller/createHabit.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

 const router =  Router()
 router.post("/regularhabit",verifyJWT ,RegularCreateHabit)
 export default router ;