import mongoose from "mongoose";

 const BlogSchema  =  mongoose.Schema({
Title :{
    type : String,
    required : true
},
Description :{
type : String
} ,
categories :{
   type : [String],
   required : true
},
subcategory :{
    type : [String],
    required : true
},
BlogImage :{
    type : String,
    // required : true
},
thumbnail :{
    type : String,
    // required : true
}, 
userId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'  // reference to the User model
}


})

const Blog = mongoose.model('Blog',BlogSchema)

export default Blog;