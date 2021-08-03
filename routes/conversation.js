const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Group =  mongoose.model("Group")
// 

//new conv
// 


router.post('/creategroup',requireLogin,(req,res)=>{
  const {post} = req.body 
  if(!post){
    return  res.status(422).json({error:"Plase add all the fields"})
  }
  
  const group = new Group({
      
      members:req.user,
      post
      
  })
  group.save().then(result=>{
      res.json({group:result})
  })
  .catch(err=>{
      console.log(err)
  })
})
// 
// 

router.put('/addUser',requireLogin,(req,res)=>{
  Group.findByIdAndUpdate(req.body.groupId,{
      $push:{members:req.body.userId}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})
router.get('/Userrepresent/:id',async (req,res)=>{
  try {
    const conversation = await Group.findOne({
      post:req.params.id 
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/group/:userId",async (req, res) => {
  try {
    const group = await Group.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 
router.get("/postconvo/:postId", requireLogin,async (req, res) => {
  try {
    const conversation = await Group.findOne({
      post:req.params.postId ,
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/condetails/:id',async (req,res)=>{
  try {
 const  condetails = await Group.findById(req.params.id)
  
 res.status(200).json(condetails)
} catch (err) {
  res.status(500).json(err);
}
  
})

router.delete('/deleteconvo/:postId',requireLogin,(req,res)=>{
  Group.findOne({post:req.params.postId})
  .exec((err,group)=>{
      if(err || !group){
          return res.status(422).json({error:err})
      }
      else{
            group.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
      }
  })
})






module.exports = router;