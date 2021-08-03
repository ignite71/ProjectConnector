const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:"All"
    },
    Mentors:[{type:ObjectId,ref:"User"}],
    TeamMembers:[{type:ObjectId,ref:"User"}],
    postconversationId:{
        type:String
     },

    photo:{
        type:String,
        default:"https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    },
    likes:[{type:ObjectId,ref:"User"}],
    selectedMentor:[{type:ObjectId,ref:"User"}],
    selectedTeamMate:[{type:ObjectId,ref:"User"}],
    conid:[{type:ObjectId,ref:"Group"}],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Post",postSchema)