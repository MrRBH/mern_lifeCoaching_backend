import { Router } from "express";
import { createOneTimeTask, RegularCreateHabit } from "../controller/RegularHabit.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

 const router =  Router()
 router.post("/regularhabit",verifyJWT ,RegularCreateHabit)
 router.post("/onetimetask", verifyJWT, createOneTimeTask)
 export default router ;