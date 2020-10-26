import * as main from './main.js';

// function to change status {online, typing}
export function changeStatus(data, status){
  let selector = "."+data.room+" .chat-wrapper .list-users .users-on ul ."+data.user +" span";
  let span = document.querySelector(selector);
  if(status === "type"){
    span.classList.remove("on");
    span.classList.add("type");
    span.textContent = "is typing...";
  }
  else if(status === "online"){
    span.classList.remove("type");
    span.classList.add("on");
    span.textContent = "online";
  }
}

// functions to handle users online
export function removeList(data){
  let selector = "."+data.room + ".arg-container .chat-wrapper .list-users .users-on ul ." + data.user;
  const li = document.querySelector(selector);
  li.remove();
}

export function addList(data){
  let selector = "."+data.room + ".arg-container .chat-wrapper .list-users .users-on ul";
  const ul = document.querySelector(selector);
  const li = document.createElement("li");
  li.classList.add(data.user);
  li.innerHTML = `${data.user}: <span class="on">online</span>`;
  ul.appendChild(li);
}

export function getList(data){
  let selector = "."+data[0].room + ".arg-container .chat-wrapper .list-users .users-on ul";
  const ul = document.querySelector(selector);
  for(let i = 0; i < data.length; i++){
    let li = document.createElement("li");
    li.classList.add(data[i].user);
    li.innerHTML = `${data[i].user}: <span class="on">online</span>`;
    ul.appendChild(li);
  }
}

// functions to manipulate dom

// function to create messages
export function outputMsg(user, data){
  let selector = "."+data.room+".arg-container .chat-wrapper .chat";
  const chat = document.querySelector(selector);
  if(data.type === "info"){
    const msgInfo = document.createElement("div");
    msgInfo.classList.add("chat-msg-info");
    msgInfo.innerHTML = `<p>${data.text}</p>`;
    chat.appendChild(msgInfo);
  }
  else{
    const msg = document.createElement("div");
    msg.classList.add("chat-msg");
    if(data.user === user){
      msg.classList.add("user");
    }
    msg.innerHTML = `<div class="chat-msg-header">
      <h1>${data.user}</h1>
      <h6>${data.date}</h6>
    </div>
    <div class="chat-msg-body">
      <p>${data.text}</p>
    </div>`;
    chat.appendChild(msg);
  }
  chat.scrollTop = chat.scrollHeight;
}

// function to display current block
export function display(arg){
  let activeBlk = $(".arg-container.active");
  let activeBtn = $(".arg.active");
  activeBlk.removeClass("active");
  activeBtn.removeClass("active");
  let selectorBlk = "."+arg+".arg-container";
  let selectorBtn = "."+arg+".arg";
  let newActiveBlk = $(selectorBlk);
  let newActiveBtn = $(selectorBtn);
  newActiveBlk.addClass("active");
  newActiveBtn.addClass("active");
}

// functions to create new rooms
export function addGroup(data){
  createArg(data);
  console.log(data);
  const ul = document.querySelector(".chat-container .group-list ul");
  const newArg = document.createElement("li");
  newArg.innerHTML = `<div class="${data.room} arg">
    <p>${data.room}</p>
  </div>`;
  newArg.addEventListener("click", function(){
    display(data.room);
  })
  ul.append(newArg);
  // main.emitRoom(data);
}

function createArg(data){
  const father = document.querySelector('.block-container');
  const newArg = document.createElement("div");
  newArg.classList.add(data.room);
  newArg.classList.add("arg-container");
  father.appendChild(newArg);

  const wrapper = document.createElement("div");
  wrapper.classList.add("chat-wrapper");
  newArg.appendChild(wrapper);

  // user list
  const listUsers = document.createElement("div");
  listUsers.classList.add("list-users");
  const groupInfo = document.createElement("div");
  groupInfo.classList.add("group-info");
  groupInfo.innerHTML = `<h1>Your Group:</h1><p>${data.room}</p>`;
  listUsers.appendChild(groupInfo);
  const usersOn = document.createElement("div");
  usersOn.classList.add("users-on");
  usersOn.innerHTML = `<h1>Users online: </h1><ul></ul>`;

  listUsers.appendChild(usersOn);
  wrapper.appendChild(listUsers);

  // Chat
  const chat = document.createElement("div");
  chat.classList.add("chat");
  wrapper.appendChild(chat);

  // input
  const sendMsg = document.createElement("div");
  sendMsg.classList.add("send-msg");
  const form = document.createElement("form");
  form.classList.add("form-msg");

  // inputForm
  const inputForm = document.createElement("input");
  inputForm.classList.add("msg-text");
  inputForm.type="text";
  inputForm.name = "msg";
  inputForm.value="";
  inputForm.placeholder="Enter message";
  inputForm.autocomplete="off";
  const btnForm = document.createElement("input");
  btnForm.classList.add("btn");
  btnForm.classList.add("msg-btn");
  btnForm.type="submit";
  btnForm.name="msg-btn";
  btnForm.value = "Send";
  form.appendChild(inputForm);
  form.appendChild(btnForm);

  inputForm.addEventListener("keyup", function(e){
    if(this.value.length > 0){
      main.emitType(data);
    }
    else {
      main.emitOnline(data);
    }
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();
    let text = e.target[0].value;
    e.target[0].value = "";
    let obj = {
      user: data.user,
      text: text,
      room: data.room
    };
    main.emitOnline(obj);
    main.emitMsg(obj);
    e.target[0].focus();
  });

  sendMsg.appendChild(form);
  newArg.appendChild(sendMsg);
}
