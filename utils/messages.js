const moment = require('moment');

function formatMsg(user, room, text){
  return {
    user,
    type: '',
    room,
    text,
    date: moment().format('h:mm a')
  }
}

function formatInfo(room, text){
  return {
    type: 'info',
    room,
    text
  }
}

module.exports = {
  formatMsg,
  formatInfo
};
