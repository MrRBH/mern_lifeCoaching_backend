import { Schema } from "mongoose";

 const CoachAvalibilitySchema =  Schema({
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

 })

 const CoachAvailability = mongoose.model('CoachAvailability',CoachAvalibilitySchema)
 export default CoachAvailability;