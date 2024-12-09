import { asyncHandler } from "../utils/asyncHandler.js";
import CoachAvailability from "../models/CoachAavalibility.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CoachQualification from "../models/CoachQualification.model.js";
import CoachProfile from "../models/CoachProfile.model.js";

export const coachAvailability = asyncHandler(async (req,res) => {
    let {
        DayOfWeek,
        DateofMonth,
        StartTime,
        EndTime,
        FifteenMinutesPrice,
        ThirteenthMinutesPrice,
        userid
    } = req.body;
    console.log(req.body);
    

    // Validation
    if (!StartTime ||!EndTime ||!FifteenMinutesPrice ||!ThirteenthMinutesPrice ) {
        throw new Error("All fields are required");
    }
    // if ( DayOfWeek && DateofMonth){
    //     throw new ApiError(400, "Provide either DayOfWeek or DateofMonth, but not both.");
    // }

    if ( typeof DayOfWeek === "string" ) {
        DayOfWeek = DayOfWeek.split(",").map((val) => val.trim().replace(/^"|"$/g, ""));
    }
    if ( typeof  DateofMonth === "string" ) {
        DateofMonth = DateofMonth.split(",").map((val) => val.trim().replace(/^"|"$/g, ""));
    }

    if (DayOfWeek) {
        if (!Array.isArray(DayOfWeek)) {
            throw new ApiError(400, "DayOfWeek must be an array of strings");
        }
    DayOfWeek = DayOfWeek.map((val) => val.trim());

    }
    
    if (DateofMonth) {
        if (!Array.isArray(DateofMonth)) {
            throw new ApiError(400, "DateofMonth must be an array of strings");
        }
    DateofMonth = DateofMonth.map((val) => val.trim());

    }
    
    if (!DayOfWeek && !DateofMonth) {
        throw new ApiError(400, "Either DayOfWeek or DateofMonth is required");
    }

    const userId = req.user?.id
    if (!userId) {
        throw new ApiError(401,"Unauthorized user");
    }
    if(userId!== userid){
        throw new ApiError(403, "You are not authorized to perform this action")
    }

    const CoachQualificationId =  await CoachQualification.findOne({userid : userId})
    if (!CoachQualificationId) {
        throw new ApiError(404, "Coach qualification not found");
    }
    console.log(CoachQualificationId._id);
    
 
    const coachprofileId  = await CoachProfile.findOne({userid :userId })
    if (!coachprofileId) {
        throw new ApiError(404, "Coach profile not found");
    }
    console.log(coachprofileId._id);

    // Create new availability
    const newAvailability = await CoachAvailability.create({
        DayOfWeek,
        DateofMonth,
        StartTime,
        EndTime,
        FifteenMinutesPrice,
        ThirteenthMinutesPrice,
        userid:userId,
        CoachProfileId : coachprofileId._id,
        CoachQualificationId : CoachQualificationId._id,
    });
    console.log(newAvailability);
    
    res.json(new ApiResponse(201 , newAvailability, "Availability created successfully"))
})

