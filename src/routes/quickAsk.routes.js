import { Router } from "express"; 
import { Quickask } from "../controller/QuickAsk.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/quickask",  verifyJWT, Quickask)
export default router;