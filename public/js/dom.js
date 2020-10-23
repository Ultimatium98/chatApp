export function outputMsg(data){
  let selector = "."+data.arg+".arg-container .chat-wrapper .chat";
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
    if(data.type === "sent"){
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
}

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
export function addGroup(arg, data){
  createArg(arg, data);
  const ul = document.querySelector(".chat-container .group-list ul");
  const newArg = document.createElement("li");
  newArg.innerHTML = `<div class="${arg} arg">
    <p>${arg}</p>
  </div>`;
  newArg.addEventListener("click", function(){
    display(arg);
  })
  ul.append(newArg);
}

function createArg(arg, data){
  const father = document.querySelector('.block-container');
  const newArg = document.createElement("div");
  newArg.classList.add(arg);
  newArg.classList.add("arg-container");
  father.appendChild(newArg);

  const wrapper = document.createElement("div");
  wrapper.classList.add("chat-wrapper");
  newArg.appendChild(wrapper);

  // lista
  const listUsers = document.createElement("div");
  listUsers.classList.add("list-users");
  const groupInfo = document.createElement("div");
  groupInfo.classList.add("group-info");
  groupInfo.innerHTML = `<h1>Your Group:</h1><p>${data.group}</p>`;
  listUsers.appendChild(groupInfo);
  const usersOn = document.createElement("div");
  usersOn.classList.add("users-on");
  usersOn.innerHTML = `<h1>Users online: Num</h1><ul></ul>`;
  // if(data users != 0 )...
    // get ul
    // for each user
    // ul append users
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
  form.innerHTML = `
  <input class="msg-text" type="text" name="msg" value="" placeholder="Enter message">
  <input class=" btn msg-btn" type="submit" name="msg-btn" value="Send">`;
  sendMsg.appendChild(form);
  newArg.appendChild(sendMsg);
}
