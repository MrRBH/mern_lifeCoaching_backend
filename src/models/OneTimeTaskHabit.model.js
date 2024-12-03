import mongoose, { Schema } from "mongoose";

const OneTimeTaskHabitSchema = new Schema({
  TaskName: {
    type: String,
    required: true,
  },
  DateForTask: {
    type: Date,  // This will store the full date (YYYY-MM-DD)
    required: true,
  },
  TimeForTask: {
    type: String,  // This can store the time (HH:mm)
    required: true,
  },
  userid : {
    type: Schema.Types.ObjectId,
    ref : 'User'
},
lernerprofileId  :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'LernerProfile' 
}
},{timestamps:true});

const OneTimeTaskHabit =  mongoose.model("OneTimeTaskHabit", OneTimeTaskHabitSchema);
export default OneTimeTaskHabit
 