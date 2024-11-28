import mongoose from "mongoose";

const { Schema } = mongoose;

const userProfileSchema = new Schema({
    improve: {
      type: [String],
      enum: [
        "How you show up on social media",
        "What you eat",
        "Your sleep routine",
        "How soon you try after failure",
        "Your outlook",
        "Your level of honesty",
        "The way you treat others",
        "How you speak to yourself",
      ],
      required: true
    },
    name : { 
        type: String,
      
    },
    Country : {
        type: String,
        
    },
    Address : {
        type: String,
    },
    
    Language :{
        type: [String],
    },
    userProfileImage : {
        type: String,
    } ,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }
  });

  const UserProfile = mongoose.model("UserProfile", userProfileSchema);


export default UserProfile;
