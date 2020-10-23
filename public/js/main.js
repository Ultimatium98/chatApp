import * as dom from './dom.js';


let data = {
  group: "Lavoro1"
};
let data2 = {
  group: "Lavoro2"
};
let data3 = {
  group: "Lavoro3"
};
// dom.createArg("Lavoro2", data);
// dom.display("Lavoro2");

dom.addGroup("Lavoro1", data);
dom.addGroup("Lavoro2", data2);
dom.addGroup("Lavoro3", data3);
let addGroupBtn = document.querySelector("._add");
addGroupBtn.addEventListener("click", function(){
  dom.display("_add");
});

let data11 = {
  arg: "Lavoro1",
  type: "sent",
  user: "capenna",
  date: "13/04/2020",
  text: "messaggio prova Lavoro1"
};
let data12 = {
  arg: "Lavoro1",
  type: "rec",
  user: "capenna2",
  date: "13/04/2020",
  text: "messaggio prova Lavoro1"
};
let data13 = {
  arg: "Lavoro1",
  type: "info",
  text: "messaggio prova info Lavoro1"
};
let data21 = {
  arg: "Lavoro2",
  type: "sent",
  user: "capenna",
  date: "13/04/2020",
  text: "messaggio prova Lavoro2"
};
let data22 = {
  arg: "Lavoro2",
  type: "rec",
  user: "capenna2",
  date: "13/04/2020",
  text: "messaggio prova Lavoro2"
};
let data23 = {
  arg: "Lavoro2",
  type: "info",
  text: "messaggio prova info Lavoro2"
};
let data31 = {
  arg: "Lavoro3",
  type: "sent",
  user: "capenna",
  date: "13/04/2020",
  text: "messaggio prova Lavoro3"
};
let data32 = {
  arg: "Lavoro3",
  type: "rec",
  user: "capenna2",
  date: "13/04/2020",
  text: "messaggio prova Lavoro3"
};
let data33 = {
  arg: "Lavoro3",
  type: "info",
  text: "messaggio prova info Lavoro3"
};
dom.outputMsg(data11);
dom.outputMsg(data12);
dom.outputMsg(data13);
dom.outputMsg(data21);
dom.outputMsg(data22);
dom.outputMsg(data23);
dom.outputMsg(data31);
dom.outputMsg(data32);
dom.outputMsg(data33);
