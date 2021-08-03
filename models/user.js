const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // resetToken:String,
    // expireToken:Date,
    pic:{
     type:String,
     default:"https://images.pexels.com/photos/5380635/pexels-photo-5380635.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5380635.jpg&fm=jpg"
    },
    college:{
        type:String,
        default:"Anonymous"
    },
    branch:{
        type:String,
        default:"All"
    },


    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)
