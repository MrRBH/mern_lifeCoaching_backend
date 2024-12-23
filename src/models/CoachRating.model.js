import { Schema } from "mongoose";
 
 const RatingSchema =  Schema({
 CoachprofileId :{
    type : Schema.Types.ObjectId,
    ref : "CoachProfile"
 },
 CurrentUserId :{
    type : Schema.Types.ObjectId,
    ref : "User"
 },

 Rating :{
    type : Number,
    min : 1,
    max : 5
 }
 },{timestamps:true});

 const Rating =  mongoose.model("Rating", RatingSchema);
 export default Rating;
