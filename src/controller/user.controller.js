
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendOtpEmail } from "../utils/sendOtp.js";
import { ApiResponse } from "../utils/ApiResponse.js";



// Generate OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Function to generate access and refresh tokens
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Generate tokens using the user instance methods
        const accessToken = user.generateAccessToken();  // Assuming this is a method on your User model
        const refreshToken = user.generateRefreshToken(); // Assuming this is a method on your User model

        // Save the refresh token to the user
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Return the tokens
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};
const homePage = asyncHandler(async (req,res)=>{
    res.send("this is  home page ")
})

// GoogleLogin 
const googleLogin = asyncHandler(async (req,res)=>{
    const user =  await req.user
})
// Register User with OTP
const RegisterUser = asyncHandler(async (req, res) => { 
    const { fullName, email, password } = req.body;
    console.log(req.body);
    

    // Validate required fields
    if (!fullName || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'User already exists with this email');
    }

    // Generate OTP and set expiry (e.g., 10 minutes)
    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    // Create a new user instance with OTP details
    const user = new User({ fullName, email, password, otp, otpExpires });

    await user.save();

    // Send OTP to user's email
    await sendOtpEmail(email, otp);

    // Send success response
    res.status(201).json(
        new ApiResponse(
            201,
            user.otp,
            "User registered successfully. Please check your email for OTP verification.",
        )
    );
});
const VerifyOtp = asyncHandler(async (req, res, next) => {
    const { otp } = req.body;
    const user = await User.findOne({ otp });

    if (!user) {
        throw new ApiError(400, 'Invalid OTP');
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
        throw new ApiError(400, 'OTP has expired');
    }

    // Clear OTP and expiration after successful verification
    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true
    await user.save();

    // Generate access and refresh tokens
    // const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    // Get user data without password and refreshToken fields
    // const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookie options
    // const cookieOptions = {
    //     httpOnly: true, 
    //     secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    //     sameSite: 'Strict',  // Prevents CSRF attacks
    //     maxAge: 24 * 60 * 60 * 1000 // 1 day expiry
    // };

    // Set the access token in a cookie
    // res.cookie('accessToken', accessToken, cookieOptions);
    
    // Send refresh token in a separate cookie if needed
    // res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days for refresh token

    // Send the response
    return res.status(200).json(new ApiResponse(200, {
        
        // user: loggedInUser,

    }, "User Verified Successfully"));
});


const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }
    console.log(req.body);
    

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'User not found');
    }

    // Check if password is valid
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password');
    }

    // Generate access token and refresh token using the separate function
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
    
    // Get user data without password and refresh token fields
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookie options
    const options = {
        httpOnly: true,
        // secure: true (use in production for HTTPS)
    };

    // Send response with cookies and user data
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});





const LogoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body
    // console.log(req.body);
    
    const userId = req.user?._id 
    if(!userId) return new ApiError(404, "unauthenticated user")
    console.log(userId); 
    

    

    const user = await User.findById(userId)
    console.log(user);
    
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    console.log(isPasswordValid);
    

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

export {
    generateAccessAndRefereshTokens,
    RegisterUser,
    LoginUser,
    VerifyOtp,
    LogoutUser,
    changeCurrentPassword,
    homePage
    
};
