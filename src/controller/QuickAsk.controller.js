import LernerProfile from "../models/lernerprofile.model.js";
import QuickAsk from "../models/QuickAsk.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const Quickask = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized user");
    }

    let { AwakeQuestions, SleepQuestions , userid   } = req.body;

    // Validate input data
    if (!AwakeQuestions || !SleepQuestions) {
        throw new ApiError(400, "AwakeQuestions and SleepQuestions are required");
    }

    if(userId !== userid){
        throw new ApiError(404, "You are not authorized to perform this action");
    }

    // Convert string to array if necessary and ensure proper trimming
    if (typeof AwakeQuestions === "string") {
        AwakeQuestions = AwakeQuestions.split(",").map((val) =>
            val.trim().replace(/^"|"$/g, "")
        );
    }
    if (typeof SleepQuestions === "string") {
        SleepQuestions = SleepQuestions.split(",").map((val) =>
            val.trim().replace(/^"|"$/g, "")
        );
    }

    // Ensure both are arrays of strings
    if (!Array.isArray(AwakeQuestions) || !Array.isArray(SleepQuestions)) {
        throw new ApiError(400, "AwakeQuestions and SleepQuestions must be arrays of strings");
    }

    // Trim and validate again
    AwakeQuestions = AwakeQuestions.map((val) => val.trim());
    SleepQuestions = SleepQuestions.map((val) => val.trim());
    const lernerprofileId = await LernerProfile.findOne({owner : userId})
    if (!lernerprofileId) {
        throw new ApiError(404, "LernerProfile not found");
    }
    console.log(lernerprofileId._id);
    

    // Create new QuickAsk document
    const newQuickAsk = await QuickAsk.create({
        userid: userId,
        lernerprofileId : lernerprofileId._id,
        AwakeQuestions,
        SleepQuestions,
    });

    // Return response
    res.status(201).json(
        new ApiResponse(201, newQuickAsk, "AwakeQuestions and SleepQuestions created successfully")
    );
});
