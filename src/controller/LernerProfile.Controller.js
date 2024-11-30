import UserProfile from "../models/lernerprofile.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";




const validImproveValues = [ 
    "How you show up on social media",
    "What you eat",
    "Your sleep routine",
    "How soon you try after failure",
    "Your outlook",
    "Your level of honesty",
    "The way you treat others",
    "How you speak to yourself"
  ];
  
  const userProfile = asyncHandler(async (req, res) => {
    try {
        let { improve, name, Country, Language, Address } = req.body;
      
          
        if (!Array.isArray(improve)) {
            if (typeof improve === 'string') {
              improve = improve.split(',').map(val => val.trim().replace(/^"|"$/g, ''));  // Trim and remove quotes
            } else {
              throw new ApiError(400, "'improve' must be an array of strings.");
            }
          } else {
            // If it's an array, clean up each value
            improve = improve.map(val => val.trim().replace(/^"|"$/g, ''));  // Trim and remove quotes
          }
         
      
        // Validate that all values in the improve array are valid
        const invalidValues = improve.filter(val => !validImproveValues.includes(val.trim()));
      
        if (invalidValues.length > 0) {
          throw new ApiError(400, `Invalid values in improve array: ${invalidValues.join(', ')}`);
        }
      

      
        // Check for required fields
        if (!improve || !name || !Language) {
          throw new ApiError(400, "Required fields are missing.");
        }
      
        const userId = req.user?.id;
        if (!userId) {
          throw new ApiError(401, "Unauthorized user");
        }
      
        // Handle image path and upload
        const profileImagePath = req.file?.path;
        if (!profileImagePath) {
          throw new ApiError(400, "Image field is required.");
        }
      
        // Upload image to Cloudinary
        let uploadedImagePath;
        try {
          uploadedImagePath = await uploadOnCloudinary(profileImagePath);
        //   console.log("Image uploaded successfully:", uploadedImagePath);
        } catch (err) {
          throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
        }
      
 
        const userProfile = await UserProfile.create({
          improve,
          name,
          owner:userId,
          Country,
          Language,
          Address,
          userProfileImage: uploadedImagePath.secure_url // Assuming userProfileImage is to be stored in UserProfile model
        });
      
        console.log("User profile created:", userProfile);
      
   
        res.status(201).json(new ApiResponse(201, userProfile, "Profile created successfully"));
    } catch (error) {
        throw new ApiError(500,"Couldn't create profile", error);
    }
  });
  export const EditProfile = asyncHandler(async (req, res) => {
    const { name, Address, Language, Country } = req.body;
  
    // Ensure all required fields are provided
    if (!name || !Address || !Country || !Language) {
      throw new ApiError(400, "For update, you must provide name, address, language, and country.");
    }
  
    const userId = req.user?.id;  // Get user ID from the authenticated request
    if (!userId) {
      throw new ApiError(401, "Unauthorized user");
    }
  
    // Get the profile image path from the uploaded file
    let profileImagePath = req.file?.path;
    if (!profileImagePath) {
      throw new ApiError(400, "Image field is required.");
    }
  
    let uploadedImagePath;
    try {
      // Upload the image to Cloudinary
      uploadedImagePath = await uploadOnCloudinary(profileImagePath);
    } catch (err) {
      throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
    }
  
    // Update the user profile in the database
    const userProfile = await UserProfile.findOneAndUpdate(
      { owner: userId }, // Use user ID to find the correct user profile
      { name, Address, Language, Country, userProfileImage: uploadedImagePath.url }, // Fields to update
      { new: true } // Return the updated profile
    );
  
    if (!userProfile) {
      throw new ApiError(404, "No profile found for this user");
    }
  
    // Send the response with the updated profile
    res.status(200).json(new ApiResponse(200, userProfile, "Profile updated successfully"));
  });
  
export default userProfile;
