import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/user.model.js";
import { ApiResponse } from "./ApiResponse.js";
import { ApiError } from "./ApiError.js";
import { generateAccessAndRefereshTokens } from "../controller/user.controller.js";

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8100/api/v1/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
  
	  try {
		const existingUser = await User.findOne({_id: profile.sub})

		if(existingUser){
			return done(null, existingUser)
		}else{
			const newUser = await User.create({
                google_id:profile.id,
                email: profile.emails[0].value,
                fullName: profile.displayName.toString(),
				otp:"",
				isVerified: true,
                otpExpires: new Date(Date.now() + 300000) // 5 minutes
            })
            console.log();
            
			const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(newUser.id);

			
            return done(null, new ApiResponse("200", {newUser,accessToken,refreshToken},"user created and saved successfully"))
            
		}
	  } catch (error) {
		console.error("Error creating or finding user:", error);
        // Pass the error to done to handle it in the route
        return done(new ApiError(500, "Error creating or finding user", error.message), null);
	  }
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
