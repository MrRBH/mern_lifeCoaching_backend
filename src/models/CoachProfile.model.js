import mongoose, { Schema } from "mongoose";

 const  CoachProfileSchema =   new  Schema ({
     linkdienProfileurl : {
        type : String
     },
     YoutubeUrl : {
        type : String
     },
     FacebookUrl : {
        type : String
     },
     InstagramUrl : {
        type : String
     },
     CoachProfileImage : {
        type : String
     },
     CoachCoverImage:{
        type : String,
       
     },
     FirstName :{
        type : String,
        
     },
     LastName : {
        type : String,
        
     },
     biography:{
       type : String
     },

     livedContry : { 
        type : String,
        required : true
     },
    PrimaryPostelAddress : {
        type : String,
        required : true
    
    },
    familiarcountry : {
        type : [String], 
    },
    localRegionTimezone:{
        type: String,
        required : true
    },
    CoachingSkill : {
        type : [String],
  
      
    },
    HelpToChangeLives : {
        type  : String
    },
    Coachingmethodology : {
        type  : String
    },
    comfortableLanguageForCoaching: {
        type  : [String],
        required : true,
        enum :[
            "English",
            "Spanish",
            "French",
            "Hindi",
            "Arabic",
            "German"
        ]
    },
    ServiceRequestConsideration : {
        type  : [String],
        enum :[
            "Core Professional leadership coaching",
            "communication speciality coaching",
            "Nutrition speciality coaching",
            "Sleep speciality coaching"
        ]
    },
    CoachingBackground : { 
        type  : [String],
        required : true,
        enum :[
            "Primarly Coaching background",
            "Primarly councling  /Therapy background",
            "I am Appling as specialist"
        ]
        
    },
    CoachingWorkingInductoryBackground : {
        type  : [String],
        
        enum :[
            "Technology",
            "Legal",
            "Financial services",
            "Sales",
            "Retail",
            "Manufacturing",
            "Militry", "Healthcare" , "Human Resources",
            "Counciling" , "Media or Entertainment"
        ]
    },
    CoachingWorkingExperience : {
        type : [String] ,
        required : true,
        enum : [
            "20 year or more",
            "16 to 19 years",
            "10 to 15 years",
            "5 to 9 years",
            "4 years or less",
            "No Professional work experience outside of coaching "
        ]
    },
    CorporateExperienceYear:{
        type : [String] ,
        enum : [
            "5-10 (Very experienced)",
            "2-5 (Moderately experienced)",
            "1-2 (Slightly experienced)",
            "None at all",
           
        ]
    },
  ManegementExperienceYear:{
    type : [String] ,
        required : true,
        enum : [
            "10 years or more",
            "5 to 9 years",
            "4 years or less",           
        ]
  },
  VPLeadershipExperienceYears:{
    type : [String] ,
        enum : [
            "20 years or more",
            "16 to 19 years",
            "10 to 15 years",
            "5 to 9 years",
            "4 years or less",
            "No coporate experience at the level"           
        ]
  },
  vpOrgType:{
    type : [String],
        enum : [
            "1-1000 employees",
            "1000-5000 employees",
            "5000-20000 employees",
            "20000-50000 employees",
            "50000  or more employees",
            "No coporate experience at the level"
        ]
  },
  AnyOtherExperience : {
    type : Boolean ,
    default : false
  },
  ListOfDegreeYouEarn :{
    type : [String],
    enum :[
            "Master(M.A/MSc)",
            "MBA",
            "PhD",
            "JD",
            "MD",
            "Working towards degree",
            "None"
    ]
  },
  AeraOFStudyOfReleventField : {
    type : [String],
    enum :[
            "Business management/administration",
            "Communication.",
            "Counseling/Therapy ",
            "Computer and information sciences",
            "Education",
            "Engineering",
            "Humanities", "Law" , "Life sciences",
            "Mathematics" , "Physical sciences",
            "Psychology", "Other"
        ]
  },
  EstimateProfessionalWorkingHours :{
    type :[String],
    enum :[
            "Greater than 3000 hours",
            "Between 1500 and 3000 hours",
            "Between 1000 and 1500 hours",
            "Between 300 and 1000 hours",
            "Between 0 to 300 hours",
            "N/A my experience is not in counselling"
    ]
  },
  therapyAgeGroup:{
    type : [String],
    required : true,
    enum : [
            "Adult",
            "Child and Adolescent",
            "Elderly","Others,", "N/A"
        ]
  },
  TherapyProfessionalStatus :{
    type : [String],
    required : true,
    enum : [
            "Homeless",
            "unemployed",
            "In Transition",
            "Internship",
            "Underemployed",
            "Gainfully Employed",
            "Primarily Hourly Compensated Workers",
            "Primarily Salaried Professionals",
            "Other",
            "N/A"
        ]
  },
  userid :{
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  CoachQualificationId : {
    type : Schema.Types.ObjectId,
    ref : 'CoachQualification'
  },


 })
const CoachProfile = mongoose.model("CoachProfile", CoachProfileSchema)

export default CoachProfile;