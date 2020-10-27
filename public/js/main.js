import * as dom from './dom.js';

// get user from url
const QsUser = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
const user = QsUser.username;
const p = document.querySelector("#err");

let groups = [];
const socket = io();

// functions to handle sockets
export function emitMsg(data){
  socket.emit('chatMsg', data);
}

export function emitRoom(data){
  socket.emit('joinRoom', data);
}

export function emitType(data){
  socket.emit('userTyping', data);
}
export function emitOnline(data){
  socket.emit('userOnline', data);
}
socket.on('msg', function(data){
  dom.outputMsg(user, data)
});

socket.on('infoMsg', function(data){
  dom.outputMsg(user, data);
});

socket.on('getList', function(data){
  dom.getList(data);
})

socket.on('addList', function(data){
  dom.addList(data);
})

socket.on('removeList', function(data){
  dom.removeList(data);
})

socket.on("typing", function(data){
  dom.changeStatus(data, "type");
})

socket.on("online", function(data){
  dom.changeStatus(data, "online");
})

socket.on('createArg', function(data){
  dom.addGroup(data);
})
socket.on("exists", function(){
  p.textContent = "Username already taken in this room!";
})

let welcome = document.querySelector('.welcome-header h1');
welcome.textContent = `Welcome ${user}!`;

let addGroupBtn = document.querySelector("._add");
addGroupBtn.addEventListener("click", function(){
  dom.display("_add");
});

let addBtn = document.querySelector('.form-group .form');
addBtn.addEventListener("submit", function(e){
  e.preventDefault();
  p.textContent="";
  let input = document.querySelector("#new-group");
  let value = input.value;
  let room = value.replace(/ /g, "-");
  if(value.match(/^[A-Za-z][0-9a-z\s]+$/) && !groups.includes(room) && groups.length <10){
    groups.push(room);
    input.value = "";
    let data = {
      user: user,
      room: room
    };
    // dom.addGroup(data);
    socket.emit('joinRoom', data);
  }
  else{
    let err = "";
    if(groups.includes(room))
      err = "Room name already taken";
    else if (groups.length >= 10)
      err = "Number of rooms must be less than 10!";
    else
      err = "Rooms can only contains alphanumerical characters and cannot start with a number!";

    p.textContent=err;
    input.value = "";
  }
})
