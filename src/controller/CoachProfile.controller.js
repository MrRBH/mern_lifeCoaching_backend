import CoachQualification from "../models/CoachQualification.model.js";
import CoachProfile from "../models/CoachProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

export const CoachProfileQualification = asyncHandler(async (req, res) => {
  const { QualificationCollage, QualificationDegree, QualificationDegreeContry, QualificationYear, userid } = req.body;

  console.log("Request Body:", req.body);

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }
  console.log("Authenticated User ID:", userId);

  if (userId.toString() !== userid) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  if (!QualificationCollage || !QualificationDegree || !QualificationDegreeContry || !QualificationYear) {
    throw new ApiError(400, "All fields are required");
  }

  const coachProfileQualificationDetail = await CoachQualification.create({
    QualificationCollage,
    QualificationDegree,
    QualificationDegreeContry,
    QualificationYear,
    userId: userId,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, coachProfileQualificationDetail, "Qualification added successfully")
    );
});

// export const CoachProfileDetails = asyncHandler(async (req, res) => {

//      let {
//        livedContry,
//        PrimaryPostelAddress,
//        localRegionTimezone,
//        comfortableLanguageForCoaching,
//        CoachingBackground,
//        CoachingWorkingExperience,
//        ManegementExperienceYear,
//        therapyAgeGroup,
//        TherapyProfessionalStatus,
//        linkdienProfileurl,
//        familiarcountry,
//        CoachingSkill,
//        HelpToChangeLives,
//        Coachingmethodology,
//        ServiceRequestConsideration,
//        CoachingWorkingInductoryBackground,
//        CorporateExperienceYear,
//        VPLeadershipExperienceYears,
//        vpOrgType,
//        AnyOtherExperiece,
//        ListOfDegreeYouEarn,
//        AeraOFStudyOfReleventField,
//        EstimateProfessionalWorkingHours,
//      } = req.body;
//      console.log(req.body);


//      const userId = req.user?._id;
//      if (!userId) {
//        throw new ApiError(401, "Unauthorized user");
//      } 

//      // Retrieve the CoachQualificationId for the logged-in user
//      const qualification = await CoachQualification.findOne({ userid : userId });
//      console.log(qualification.id);

//      if (!qualification) {
//        throw new ApiError(404, "Coach Qualification not found");
//      }
//      const CoachQualificationId = qualification._id;

//      // Validate required fields
//      const requiredFields = {
//        livedContry,
//        PrimaryPostelAddress,
//        localRegionTimezone,
//        CoachingBackground,
//        CoachingWorkingExperience,
//        ManegementExperienceYear,
//        therapyAgeGroup,
//        TherapyProfessionalStatus,
//      };
//      const missingFields = Object.keys(requiredFields).filter(
//        (fieldName) => !requiredFields[fieldName]
//      );
//      if (missingFields.length > 0) {
//        throw new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`);
//      }

//      // Convert enum fields to arrays
//      let parseEnumFields = (field) =>
//        typeof field === "string" ? field.split(",").map((val) => val.trim()) : field;

//       comfortableLanguageForCoaching = parseEnumFields(comfortableLanguageForCoaching);
//       CoachingBackground = parseEnumFields(CoachingBackground);
//       CoachingWorkingExperience = parseEnumFields(CoachingWorkingExperience);
//       ManegementExperienceYear = parseEnumFields(ManegementExperienceYear);
//       ServiceRequestConsideration = parseEnumFields(ServiceRequestConsideration);
//       CoachingWorkingInductoryBackground = parseEnumFields(CoachingWorkingInductoryBackground);
//       CorporateExperienceYear = parseEnumFields(CorporateExperienceYear);
//       VPLeadershipExperienceYears = parseEnumFields(VPLeadershipExperienceYears);
//       vpOrgType = parseEnumFields(vpOrgType);
//       AnyOtherExperiece = parseEnumFields(AnyOtherExperiece);
//       AeraOFStudyOfReleventField = parseEnumFields(AeraOFStudyOfReleventField);
//       EstimateProfessionalWorkingHours = parseEnumFields(EstimateProfessionalWorkingHours);
//       therapyAgeGroup = parseEnumFields(therapyAgeGroup);
//       TherapyProfessionalStatus = parseEnumFields(TherapyProfessionalStatus);

//      // Create or update CoachProfile
//      const Coachprofile = await CoachProfile.findOneAndUpdate(
//        { userId },
//        {
//          CoachQualificationId,
//          livedContry,
//          PrimaryPostelAddress,
//          localRegionTimezone,
//          comfortableLanguageForCoaching,
//          CoachingBackground,
//          CoachingWorkingExperience,
//          ManegementExperienceYear,
//          therapyAgeGroup,
//          TherapyProfessionalStatus,
//          linkdienProfileurl,
//          familiarcountry,
//          CoachingSkill,
//          HelpToChangeLives,
//          Coachingmethodology,
//          ServiceRequestConsideration,
//          CoachingWorkingInductoryBackground,
//          CorporateExperienceYear,
//          VPLeadershipExperienceYears,
//          vpOrgType,
//          AnyOtherExperiece,
//          ListOfDegreeYouEarn,
//          AeraOFStudyOfReleventField,
//          EstimateProfessionalWorkingHours,
//        }
//      );
//      console.log(Coachprofile);


//      res.status(200).json(new ApiResponse(200, Coachprofile, "CoachProfile updated successfully"));

//   });

export const CoachProfileDetails = asyncHandler(async (req, res) => {
  const {
    livedContry,
    PrimaryPostelAddress,
    localRegionTimezone,
    comfortableLanguageForCoaching,
    CoachingBackground,
    CoachingWorkingExperience,
    ManegementExperienceYear,
    therapyAgeGroup,
    TherapyProfessionalStatus,
    linkdienProfileurl,
    familiarcountry,
    CoachingSkill,
    HelpToChangeLives,
    Coachingmethodology,
    ServiceRequestConsideration,
    CoachingWorkingInductoryBackground,
    CorporateExperienceYear,
    VPLeadershipExperienceYears,
    vpOrgType,
    AnyOtherExperiece,
    ListOfDegreeYouEarn,
    AeraOFStudyOfReleventField,
    EstimateProfessionalWorkingHours,
    userid
  } = req.body;

  console.log({Body : req.body});

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }
  console.log({"Logged User" : userId});
  if(userId.toString() !== userid ) throw new ApiError(403 , "You are not authorized to perform this action")  

  // Retrieve the CoachQualification for the logged-in user
  const qualification = await CoachQualification.findOne({ userId: userId });

   console.log({Qualification : qualification });


  if (!qualification) {
    throw new ApiError(404, "Coach Qualification not found");
  }

  const coachqualificationId = qualification.id;

  console.log({ ID:  coachqualificationId});


  // Validate required fields
  const requiredFields = {
    livedContry,
    PrimaryPostelAddress,
    localRegionTimezone,
    CoachingBackground,
    CoachingWorkingExperience,
    ManegementExperienceYear,
    therapyAgeGroup,
    TherapyProfessionalStatus,
  };

  const missingFields = Object.keys(requiredFields).filter(
    (fieldName) => !requiredFields[fieldName]
  );
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`);
  }

  // Convert enum fields to arrays
  const parseEnumFields = (field) =>
    typeof field === "string" ? field.split(",").map((val) => val.trim()) : field;


  // Process array fields
  const processedPayload = {
    comfortableLanguageForCoaching: parseEnumFields(comfortableLanguageForCoaching),
    CoachingBackground: parseEnumFields(CoachingBackground),
    CoachingWorkingExperience: parseEnumFields(CoachingWorkingExperience),
    ManegementExperienceYear: parseEnumFields(ManegementExperienceYear),
    ServiceRequestConsideration: parseEnumFields(ServiceRequestConsideration),
    CoachingWorkingInductoryBackground: parseEnumFields(CoachingWorkingInductoryBackground),
    CorporateExperienceYear: parseEnumFields(CorporateExperienceYear),
    VPLeadershipExperienceYears: parseEnumFields(VPLeadershipExperienceYears),
    vpOrgType: parseEnumFields(vpOrgType),
    AnyOtherExperiece: parseEnumFields(AnyOtherExperiece),
    AeraOFStudyOfReleventField: parseEnumFields(AeraOFStudyOfReleventField),
    EstimateProfessionalWorkingHours: parseEnumFields(EstimateProfessionalWorkingHours),
    therapyAgeGroup: parseEnumFields(therapyAgeGroup),
    TherapyProfessionalStatus: parseEnumFields(TherapyProfessionalStatus),
  };
  console.log({CoachingWorkingExperience : processedPayload.CoachingWorkingExperience});
  

  // Create or update CoachProfile
  const CoachProfileData = {
    userid : userId,
    CoachQualificationId:coachqualificationId,
    livedContry,
    PrimaryPostelAddress,
    localRegionTimezone,
    ...processedPayload, // Spread the processed fields
    linkdienProfileurl,
    familiarcountry,
    CoachingSkill,
    HelpToChangeLives,
    Coachingmethodology,
    ListOfDegreeYouEarn,
  };

  // console.log(  {"Payload :" : processedPayload});

  console.log({ "Creation data" :CoachProfileData});

 
  const profileData = await CoachProfile.findOneAndUpdate(
    { userid: userId },
    { $set: CoachProfileData },
    { new: true, upsert: true }
  ).catch((err) => {
    throw new ApiError(500, `Failed to store data: ${err.message}`);
  });
  
    
    if (!profileData) {
      throw new ApiError(500, "Failed to store data");
    }
    
    console.log("CoachProfile Data Stored Successfully:", profileData);
   
  // console.log( Coachprofile );
  
  res.status(200).json(new ApiResponse(200, profileData, "CoachProfile updated successfully"));

});
export const UpdateCoachProfile = asyncHandler(async (req, res) => {
 try {
  const {
   FirstName , LastName, PrimaryPostelAddress,country,YoutubeUrl,InstagramUrl,FacebookUrl,biography,userid
  } = req.body
 console.log({Body :req.body});
 const userId  = req.user?.id
 if(!userId) {
  throw new ApiError(401,"Unauthenticated user")
 }
 if(userId!== userid ) throw new ApiError(403,"You are not authorized to perform this action")
 
 // coach CoachCoverImage uplaod to server or cloudinary
 const CoachCoverImagepath = req.files?.CoachCoverImage[0]?.path;
  console.log(CoachCoverImagepath);
  
  
  let CoachCoverImage
 try {
   CoachCoverImage = await uploadOnCloudinary(CoachCoverImagepath)
  //  console.log( { URL: CoachCoverImage.url});

   console.log("CoachCoverImage uploaded successfully"); 
 } catch (error) {
   throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
 }
 
 //coach  CoachProifleIamge upload to server or cloudinary
 const CoachProfileImagepath = req.files?.CoachProfileImage[0]?.path;
  // console.log({ url : CoachProfileImagepath.url});
 
 let CoachProifleImage
 try {
   CoachProifleImage = await uploadOnCloudinary(CoachProfileImagepath)
   
  //  console.log( { URL:CoachProifleImage});
   
   console.log("CoachProifleImage uploaded successfully"); 
   
 } catch (error) {
   throw new ApiError(500, "Failed to upload image on Cloudinary", err.message);
 }
 
 const coachproifle = await CoachProfile.findOneAndUpdate(
  { userid: userId },  // Add a filter condition here
  {
      FirstName,
      LastName,
      PrimaryPostelAddress,
      country,
      YoutubeUrl,
      FacebookUrl,
      biography,
      CoachCoverImage: CoachCoverImage.secure_url ? CoachCoverImage.secure_url : "something wrong",
      CoachProfileImage: CoachProifleImage.secure_url  ? CoachProifleImage.secure_url : "something wrong",
      InstagramUrl
  },
  { new: true } // To return the updated profile
);

 
 res.json(new ApiResponse(201 ,coachproifle, "Coach Profile updated successfully"))
 
 } catch (error) {
   throw new ApiError(500,"Somethin went wrong during update coach profile" , error.message);
   
 }




})