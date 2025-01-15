import { log } from "console";
import { getReceiverSocketId } from "../app.js";
import Chat from "../models/Chat.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import {io} from "../app.js"
import path, { join }  from "path";

 export const GetAllUserForaChat = asyncHandler(async (req,res)=>{
 try {
    
       const userId = req.user?.id;
       console.log(userId);
       
       if (!userId) {
           throw new ApiError(401, "Unauthorized user");
       }
       const userid  = req.body
       console.log(req.body);
   
       if(userId!== userid){
           throw new ApiError(403, "You are not authorized to perform this action")
       }
   
       const users = User.find({id: {$ne : userId}}).select("-password ");
       if(!users){
           throw new ApiError(404, "We Don't have any users to chat")
       }
       res.json(new ApiResponse(200, users, "All users retrieved successfully"))
 } catch (error) {
     console.log(error);
     res.json(new ApiResponse(500, null, "Internal server error"))
 }


})
 export const GetUserChat = asyncHandler(async(req,res)=>{
    try {
        const {userid , receiverId }  = req.body
        console.log(req.body);
        const userId =req.user?.id
        if (!userId) {
            throw new ApiError(401, "Unauthorized user");
        }
        if(userId!== userid){
            throw new ApiError(403, "You are not authorized to perform this action")
        }
        const chat = Chat.find({
            $or: [
              { senderId: userId, receiverId: receiverId },
              { senderId: receiverId, receiverId: userId }
            ]
          });
          if(!chat){
            throw new ApiError(404, "No chat found")
          }
          res.json(new ApiResponse(200, chat, "Chat retrieved successfully"))
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(500, null, "Internal server error"))
        
    }

    
})
export const SendMessage = asyncHandler(async (req, res) => { 
  try {
    // res.sendFile(path.resolve("./public/index.html"));
    // Extract data from the request body
    const { message,  receiverId } = req.body;
    console.log("Received message data:", req.body);

    // Get authenticated userId from the request (e.g., via JWT or session)
    const userId = req.user?.id; 
    console.log("Authenticated User ID:", userId);

    // Check if the user is authenticated
    if (!userId) {
      throw new ApiError(401, "Unauthorized user");
    }

    // Ensure that the authenticated user is the one sending the message
    // if (userId !== userid) {
    //   throw new ApiError(403, "You are not authorized to perform this action");
    // }

    // Validate that the message and receiverId are provided
    if (!message || !receiverId) {
      throw new ApiError(400, "Message and receiverId are required");
    }

    // Handle image upload (optional, if an image is included with the message)
    let uploadedImagePath = null;
    if (req.file) {
      const imagePath = req.file?.Image;
      if (imagePath) {
        try {
          uploadedImagePath = await uploadOnCloudinary(imagePath); // Assuming this uploads to Cloudinary
          console.log("Image uploaded successfully:", uploadedImagePath);
        } catch (err) {
          throw new ApiError(500, "Failed to upload image to Cloudinary", err.message);
        }
      }
    }

    // Save the chat message to the database
    const chat = await Chat.create({
      senderId: userId,
      receiverId: receiverId,
      message: message,
      image: uploadedImagePath?.secure_url || null, // Save image URL if it exists
    });
    console.log(chat);
    

    // Emit the message to the receiver using Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId); // Get the receiver's socket ID
    console.log({"receiverSocketId" :receiverSocketId});
    

    if (receiverSocketId) {
      // Emit chat message to receiver
      io.to(receiverSocketId).emit("chat_message", { 
        senderId: userId,
        receiverId: receiverId,
        message: message,
        image: uploadedImagePath?.secure_url || null,
      });
      console.log("Message sent to receiver via Socket.io:", message); 
    } else {
      console.log("Receiver is not connected");
    } 

    // Respond with a success message
    res.status(201).json(new ApiResponse(201, chat, "Message sent successfully"));
  } catch (error) {
    console.error("Error while sending message:", error);
    res.status(error.status || 500).json(new ApiError(error.status || 500, "Internal server error", error.message));
  }
});
  
export const chathandle = asyncHandler(async ( req,res)=>{
  res.sendFile( "/Users/RBH/mern_lifeCoaching_backend/src/public/index.html" );
})
 
export const chatscreen = asyncHandler(async ( req,res)=>{
  res.sendFile (path.resolve("/Users/RBH/mern_lifeCoaching_backend/src/public/index1.html"));
})