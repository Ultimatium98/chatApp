const remove = require('lodash.remove');
const findIndex = require('lodash.findindex');
const _ = require('lodash');
let users = [];

function userJoin(id, user, room){
  const mainUser = {id, user, room};
  users.push(mainUser);
  return mainUser;
}

function getCurrentUser(id){
  return users.find(user => user.id === id);
}

function getArray(){
  return users;
}
function getRoomUsers(room){
  return users.filter(user => user.room === room);
}

function userLeave(id){
  let oldUser = _.remove(users, function(user){
    return user.id === id;
  })
  return oldUser;
}

function roomContains(username,room){
  return _.findIndex(users, function(user){
    return user.room === room && user.user === username;
  });
}

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
  roomContains,
  getArray
};
