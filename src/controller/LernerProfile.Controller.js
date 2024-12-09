import LernerProfile from "../models/lernerprofile.model.js";
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
  
  const lernerProfile = asyncHandler(async (req, res) => {
  
        let { improve, name, Country, Language, Address ,  userid } = req.body;
      console.log(req.body);
      
          
        if (!Array.isArray(improve)) {
         
          } else {
            // If it's an array, clean up each value
            improve = improve.map(val => val.trim().replace(/^"|"$/g, ''));  // Trim and remove quotes
          }

        if (!Array.isArray(improve)) {
          throw new ApiError(400, "improve must be arrays of strings");
      }
          if (typeof improve === 'string') {
            improve = improve.split(',').map(val => val.trim().replace(/^"|"$/g, ''));  // Trim and remove quotes
          } 
         
      
        // Validate that all values in the improve array are valid
        // const invalidValues = improve.filter(val => !validImproveValues.includes(val.trim()));
      
        // if (invalidValues.length > 0) {
        //   throw new ApiError(400, `Invalid values in improve array: ${invalidValues.join(', ')}`);
        // }
      

      
        // Check for required fields
        if (!improve || !name || !Language) {
          throw new ApiError(400, "Required fields are missing.");
        }
      
        const userId = req.user?.id;
        if (!userId) {
          throw new ApiError(401, "Unauthorized user");
        }

        console.log(userId);

        if(userId !== userid){
          throw new ApiError(403, "You are not authorized to perform this action.");
        }
        
      
        // Handle image path and upload
        const profileImagePath = req.file?.path;
        if (!profileImagePath) {
          throw new ApiError(400, "Image field is required.");
        }
        console.log(profileImagePath);
        
      
        // Upload image to Cloudinary
        let uploadedImagePath;
        try {
          uploadedImagePath = await uploadOnCloudinary(profileImagePath);
        //   console.log("Image uploaded successfully:", uploadedImagePath);
        } catch (err) {
          throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
        }
      
 
        const userlernerProfile = await LernerProfile.create({
          improve,
          name,
          owner:userId,
          Country,
          Language,
          Address,
          lernerprofileImage: uploadedImagePath.secure_url 
        });
      
        console.log("User profile created:", userlernerProfile);
      
   
        res.status(201).json(new ApiResponse(201, userlernerProfile, "Profile created successfully"));
      })
  export const EditProfile = asyncHandler(async (req, res) => {
    const { name, Address, Language, Country , userid } = req.body;
  
    // Ensure all required fields are provided
    if (!name || !Address || !Country || !Language) {
      throw new ApiError(400, "For update, you must provide name, address, language, and country.");
    }
  
    const userId = req.user?.id;  // Get user ID from the authenticated request
    if (!userId) {
      throw new ApiError(401, "Unauthorized user");
    }
    if(userId === userid){
      throw new ApiError(403, "You are not authorized to perform this action");
    }
  
    // Get the profile image path from the uploaded file
    let profileImagePath = req.file?.lernerprofileImage.path;
    if (!profileImagePath) {
      throw new ApiError(400, "Image field is required.");
    }
    console.log(profileImagePath);
    
  
    let uploadedImagePath;
    try {
      // Upload the image to Cloudinary
      uploadedImagePath = await uploadOnCloudinary(profileImagePath);
    } catch (err) {
      throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
    }
  
    // Update the user profile in the database
    const userlernerProfile = await LernerProfile.findOneAndUpdate(
      { owner: userId }, // Use user ID to find the correct user profile
      { name, Address, Language, Country, lernerprofileImage: uploadedImagePath.url }, // Fields to update
      { new: true } // Return the updated profile
    );
  
    if (!userlernerProfile) {
      throw new ApiError(404, "No profile found for this user");
    }
  
    // Send the response with the updated profile
    res.status(200).json(new ApiResponse(200, userlernerProfile, "Profile updated successfully"));
  });
  
export default lernerProfile;
