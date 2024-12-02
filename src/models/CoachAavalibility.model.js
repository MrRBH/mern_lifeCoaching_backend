import { mongoose, Schema } from "mongoose";

 const CoachAvailabilitySchema =  Schema({
     DayOfWeek : {
        type : [String],
     },
     DateofMonth : {
        type : [String],
     },
     StartTime : {
        type : Date,
        required : true
     },
     EndTime : {
        type : Date,
        required : true
     },
     FifteenMinutesPrice :{
        type : Number,
        required : true
     },
     ThirteenthMinutesPrice :{
        type : Number,
        required : true
     } , 
     userid:{
        type:Schema.Types.ObjectId,
        ref : 'User'
     },
     CoachProfileId : {
        type : Schema.Types.ObjectId,
        ref : 'CoachProfile'
     },
     CoachQualificationId : {
        type : Schema.Types.ObjectId,
        ref : 'CoachQualification'
     }

 },{timestamps : true})

 const CoachAvailability = mongoose.model('CoachAvailability',CoachAvailabilitySchema)
 export default CoachAvailability;