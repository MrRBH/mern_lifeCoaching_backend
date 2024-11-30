import { asyncHandler } from "../utils/asyncHandler.js";
import CoachAvailability from "../models/CoachAavalibility.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const coachAvailability = asyncHandler(async (req,res) => {
    let {
        DayOfWeek,
        DateofMonth,
        StartTime,
        EndTime,
        FifteenMinutesPrice,
        ThirteenthMinutesPrice,
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


    // Create new availability
    const newAvailability = await CoachAvailability.create({
        DayOfWeek,
        DateofMonth,
        StartTime,
        EndTime,
        FifteenMinutesPrice,
        ThirteenthMinutesPrice,
        userid:userId,
    });
    res.json(new ApiResponse(201 , newAvailability, "Availability created successfully"))
})

