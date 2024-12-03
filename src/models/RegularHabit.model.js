import mongoose, { Schema } from "mongoose";

const createHabitSchema = new  Schema({
    HabitName  :{
    type : String,
    required : true
} ,
Frequency :{
    type : [String],
    enum : ["Daily", "Weekly", "Monthly", ],
    required : true
},
RepeatDays :{
    type : [String],
    enum : ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", " saturday"]
    
},
TimeInADay :{
    type : [String],
    enum : ["Morning", "Afternoon", "Evening", ],
    required : true
},
Amount :{
    type :  Number,
},
DATE : {
    type : Date,
},
Reminder : {
type : Date,

},
userid : {
    type: Schema.Types.ObjectId,
    ref : 'User'
},
lernerprofileId  :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'LernerProfile' 
}
},{timestamps : true},)
const CreateHabit  =  mongoose.model('CreateHabit',createHabitSchema)
// console.log({ "Schema":Schema.Types.ObjectId});


export default CreateHabit;