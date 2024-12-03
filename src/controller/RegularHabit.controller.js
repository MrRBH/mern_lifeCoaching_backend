import CreateHabit from "../models/RegularHabit.model.js"
import LernerProfile from "../models/lernerprofile.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import OneTimeTaskHabit from "../models/OneTimeTaskHabit.model.js";

import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { logging } from "googleapis/build/src/apis/logging/index.js"

dayjs.extend(isSameOrAfter);
// console.log(dayjs.extend(isSameOrAfter));

dayjs.extend(customParseFormat);
// console.log(customParseFormat);


export const RegularCreateHabit = asyncHandler(async (req, res) => {
    let { HabitName, Frequency, RepeatDays, TimeInADay, Amount, DATE, Reminder } = req.body
    console.log(req.body);

    if (!HabitName || !Frequency || !TimeInADay) {
        throw new ApiError(400, "All fields are required")
    }
    const userId = req.user?.id
    if (!userId) {
        throw new ApiError(401, "Unauthorized user")
    }
    console.log({ "Logged UserId": userId });

    // Validate DateForTask: Ensure it's a valid future date in YYYY-MM-DD format
    if (!dayjs(DATE, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "Invalid DATE format. Use YYYY-MM-DD.");
    }

    const today = dayjs().startOf('day');
    const taskDate = dayjs(DATE);
    if (!taskDate.isSameOrAfter(today)) {
        throw new ApiError(400, "DATE must be today or a future date.");
    }


    if (typeof Frequency === "string") {
        Frequency = Frequency.split(",").map((val) => val.trim().replace(/^"|"$/g, ""))
    }


    if (!Array.isArray(Frequency)) {
        throw new ApiError(400, "Frequency must be arrays of strings");
    }

    if (typeof TimeInADay === "string") {
        TimeInADay = TimeInADay.split(",").map((val) => val.trim().replace(/^"|"$/g, ""))
    }

    if (!Array.isArray(TimeInADay)) {
        throw new ApiError(400, "TimeInADay must be arrays of strings");
    }
    Frequency = Frequency.map((val) => val.trim());
    TimeInADay = TimeInADay.map((val) => val.trim());

    // const NewHabit  = await CreateHabit.findOneAndUpdate(
    //     {userid:userId},
    //    { HabitName,
    //     Frequency,
    //     RepeatDays,
    //     TimeInADay,
    //     Amount,
    //     DATE,
    //     Reminder,},
    //     {new   :true , upsert:true}

    // )
    const lernerProfileId = await LernerProfile.findOne({ owner: userId });
    console.log({ "Lerner ki ID": lernerProfileId });


    // if (!lernerProfile) {
    //   throw new ApiError(404, "No profile found for this user");
    // }

    const NewHabit = await CreateHabit.create({
        userid: userId,
        HabitName,
        Frequency,
        RepeatDays,
        TimeInADay,
        Amount,
        DATE,
        Reminder,
        lernerprofileId: lernerProfileId._id,
    });

    console.log(NewHabit);

    res.json(new ApiResponse(201, NewHabit, "Habit Created successfully"))

})


export const createOneTimeTask = asyncHandler(async (req, res) => {
    const { TaskName, DateForTask, TimeForTask } = req.body;

    // Validate required fields
    if (!TaskName || !DateForTask || !TimeForTask) {
        throw new ApiError(400, "TaskName, DateForTask, and TimeForTask are required.");
    }

    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized user");
    }
    console.log(userId);

    const lernerProfileId = await LernerProfile.findOne({ owner: userId })
    if (!lernerProfileId) {
        throw new ApiError(404, "No profile found for this user");
    }
    console.log(lernerProfileId._id);


    // Validate DateForTask: Ensure it's a valid future date in YYYY-MM-DD format
    if (!dayjs(DateForTask, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError(400, "Invalid DateForTask format. Use YYYY-MM-DD.");
    }

    const today = dayjs().startOf('day');
    const taskDate = dayjs(DateForTask);

    if (!taskDate.isSameOrAfter(today)) {
        throw new ApiError(400, "DateForTask must be today or a future date.");
    }

    // Validate TimeForTask: Ensure it's in HH:mm format
    if (!dayjs(TimeForTask, "HH:mm", true).isValid()) {
        throw new ApiError(400, "Invalid TimeForTask format. Use HH:mm.");
    }


    // Create task
    const newTask = await OneTimeTaskHabit.create({
        userId: userId, // Associate with the user who created the task.
        TaskName,
        DateForTask,
        TimeForTask,
        lernerprofileId: lernerProfileId._id,
    });

    res.status(201).json(new ApiResponse(201, newTask, "Task created successfully"));
});
