import mongoose from "mongoose";

import { Schema } from "mongoose";

const QuickAskSchema = new Schema({
    AwakeQuestions : {
        type  : [String],
        required : true,
        enum :[
            "Not at All",
            "Just a little",
            "Somewhat",
            "A good bit of time",
            "Most of the time",
            "All the time",
        ]
    },
    SleepQuestions :{
        type  : [String],
        required : true,
        enum :[
            "Not at All",
            "Just a little",
            "Somewhat",
            "A good bit of time",
            "Most of the time",
            "All the time",
        ]
    },
    userid :{
        type:Schema.Types.ObjectId,
        ref : 'User'
    },
    lernerprofileId :{

        type:Schema.Types.ObjectId,
        ref : 'LernerProfile'
    }
} ,{timestamps : true})
const QuickAsk = mongoose.model('QuickAsk',QuickAskSchema)

export default QuickAsk