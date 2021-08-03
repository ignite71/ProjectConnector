 
const socketio = require('socket.io'); 
const http = require('http');
const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000

const Database = require('./Database/db')
const server = http.createServer(app);
const cors = require('cors')
const io = socketio(server);


const users = [];

const addUser = ({ id, name, room }) => {
const user = { id, name, room };
const existingUser = users.find((user) => user.room === room && user.name === name);

  
  if(!existingUser) {
      users.push(user);
};

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1)  {users.splice(index, 1)[0];}
  }
  
const getUser = (id) => users.find((user) => user.id === id);







Database()

app.use(cors())

require('./models/user')
require('./models/post')
// require('./models/Message')
require('./models/groupconvo')
require('./models/Message')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/selected'))
app.use(require('./routes/conversation'))
app.use(require('./routes/messages'))




io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    

    socket.on('addUser', ({ name, room }) => {
         addUser({ id: socket.id, name, room });
        
         socket.join(room);
         console.log(room)
    
      });

  socket.on("sendMessage", ({ sender, conversationId, message }) => {

    console.log(conversationId)
    io
    .to(conversationId)
    .emit("getMessage", {
      sender,
      conversationId,
      message,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);

  });
    
    


});


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}







server.listen(PORT,()=>{
    console.log("server is running on",PORT)
})