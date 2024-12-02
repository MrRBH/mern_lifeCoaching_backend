import mongoose from "mongoose";

const { Schema } = mongoose;

const LernerProfileSchema = new Schema({
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
    lernerprofileImage : {
        type: String, // cloudinary url 
    } ,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }
  
  } , {timestamps : true});

  const LernerProfile = mongoose.model("LernerProfile", LernerProfileSchema);


export default LernerProfile;
