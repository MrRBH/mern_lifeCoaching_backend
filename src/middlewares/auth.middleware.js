import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token =  req.header("Authorization")?.replace("Bearer ", "") || req.cookies.jwt 
        // console.log({"JWT Token":token});

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken);
        
    
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
        // console.log(user);
        
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        // console.log({ "currently login user" : user.id});
        
    
        req.user = user;
        next()
    } catch (error) {
        console.error(error) 
        throw new ApiError(401, "something went wroung in authentication" , error?.message || "Invalid access token")
    }
    
})