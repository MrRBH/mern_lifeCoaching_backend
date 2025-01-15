import { Router } from "express";
import passport from "passport";
import {
  changeCurrentPassword,
  homePage,
  LoginUser,
  LogoutUser,
  RegenrateOtp,
  RegisterUser,
  VerifyOtp,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Authentication Routes
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Logged in successfully", user: req.user });
  } else {
    res.status(403).json({ message: "Not Authorized", error: true });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Login failed" }); 
});

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/v1/user/login/success",
    failureRedirect: "/api/v1/user/login/failed",
  })
);

// User Routes
router.post("/home", homePage); 
router.post("/register", RegisterUser);
router.put("/verifyotp", VerifyOtp);
router.put("/regenrateotp", RegenrateOtp);
router.post("/login", LoginUser);
router.post("/logout", verifyJWT, LogoutUser);
router.post("/change_password", verifyJWT, changeCurrentPassword);

export default router;
