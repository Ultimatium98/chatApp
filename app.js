const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require("express");
const {formatMsg, formatInfo} = require('./utils/messages');
const {userJoin, getCurrentUser, getRoomUsers, userLeave, roomContains} = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Use static
app.use(express.static(path.join(__dirname, 'public')))

// Define port and start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("server running on port: "+PORT));

// Sockets
io.on("connection", function(socket){

  // join user
  socket.on('joinRoom', function(data){
    if(roomContains(data.user, data.room) === -1){
      const user = userJoin(socket.id,data.user, data.room);
      socket.join(user.room);

      //create arg
      socket.emit('createArg', data);
       
      // get users online in user.room
      users = getRoomUsers(user.room);
      socket.emit('getList', users);

      // function to add user in list. Send info msg
      socket.broadcast.to(user.room).emit('addList', user);
      socket.broadcast.to(user.room).emit('infoMsg', formatInfo(user.room, `${user.user} has joined the chat`));
    }
    else{
      socket.emit('exists');
    }
  })
  // function to emit messages
  socket.on("chatMsg", function(data){
    io.to(data.room).emit('msg', formatMsg(data.user, data.room, data.text));
  })

  // functions to change user status {online, typing}
  socket.on("userTyping", function(data){
    io.to(data.room).emit("typing", data);
  })

  socket.on("userOnline", function(data){
    io.to(data.room).emit("online", data);
  })

  // function to handle logouts
  socket.on("disconnect", function(){
    const user = userLeave(socket.id);
    for(let i = 0; i < user.length; i++){
      socket.broadcast.to(user[i].room).emit('removeList', user[i]);
      socket.broadcast.to(user[i].room).emit('infoMsg', formatInfo(user[i].room, `${user[i].user} has left the chat`));
    }
  })
})
