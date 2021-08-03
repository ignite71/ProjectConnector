const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
// 
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type:ObjectId,
      ref:"Conversation"
   },
    sender: {
      type:ObjectId,
      
   },
   message: {
    type: Object,
    required: true
}
  },
  { timestamps: true }
);
// 
// module.exports = mongoose.model("Message", MessageSchema);
// 
mongoose.model("Message",MessageSchema)