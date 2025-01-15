import mongoose, { Schema } from "mongoose";
const ChatSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: "User",required: true},
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    message: { type: String, required: true },
    Image : {type: String}
    

}, {timestamps: true});
const Chat = mongoose.model("Chat",ChatSchema)
export default Chat;