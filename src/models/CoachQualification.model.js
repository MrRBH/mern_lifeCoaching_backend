import mongoose, { Schema } from "mongoose";
  
 const CoachQualificationSchema = new Schema({
  QualificationCollage : {
    type : String,
    required : true
  },
  QualificationDegree : {
    type : String,
    required : true
  },
  QualificationDegreeContry:{
    type : String,
    required : true
  },
  QualificationYear : {
    type : Number,
    required : true
  },
  userid:{
    type:Schema.Types.ObjectId,
    ref : 'User'
  },
  

})
const CoachQualification = mongoose.model('CoachQualification',CoachQualificationSchema)

export default CoachQualification;