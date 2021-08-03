const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const groupConversationSchema = new mongoose.Schema(
  {
    members: [{type:ObjectId,ref:"User"}],
  post:{
    type:String
 }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Conversation", ConversationSchema);
// 
mongoose.model("Group",groupConversationSchema)
// 