const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Message =  mongoose.model("Message")


//add

router.post("/message/:convoId",requireLogin, async (req, res) => {
  const { message} = req.body
  const newMessage = new Message({
    sender: req.user,
    conversationId: req.params.convoId,
    message
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allmessage/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/deletemessage/:postId',requireLogin, async (req,res)=>{
  try {
    const message = await Message.findByIdAndDelete(req.params.postId)
 
    if (!message) {
    return res.status(404).send()
    }
    res.send(message)
   } catch (e) {
    res.status(500).send()
   }
})





module.exports = router;