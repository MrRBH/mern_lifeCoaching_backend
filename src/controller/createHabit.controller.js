import CreateHabit from "../models/createHabit.model.js"
import LernerProfile from "../models/lernerprofile.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const RegularCreateHabit  =  asyncHandler(async(req,res) =>{
    let {HabitName , Frequency ,RepeatDays ,TimeInADay, Amount,DATE,Reminder } = req.body
    console.log(req.body);
    
    if(!HabitName || !Frequency || !TimeInADay) { 
        throw new ApiError(400, "All fields are required")
    }
    const userId  = req.user?.id
    if(!userId) {
        throw new ApiError(401, "Unauthorized user")
    }
    console.log({ "Logged UserId": userId});
    
    if(typeof Frequency === "string"){
        Frequency = Frequency.split(",").map((val)=> val.trim().replace(/^"|"$/g, ""))
    }
    if (!Array.isArray(Frequency)) {
        throw new ApiError(400, "Frequency must be arrays of strings");
    }

    if(typeof TimeInADay === "string"){
        TimeInADay = TimeInADay.split(",").map((val)=> val.trim().replace(/^"|"$/g, ""))
    }

    if(!Array.isArray(TimeInADay)) {
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
    const lernerProfileId = await LernerProfile.findOne({owner : userId});
    console.log({ "Lerner ki ID" : lernerProfileId});
    

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
    
    res.json(new ApiResponse(201 , NewHabit  ,"Habit Created successfully"))

})
