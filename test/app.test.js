const assert = require('assert');
const sinon = require('sinon');
const {userJoin, getCurrentUser, getRoomUsers, userLeave, roomContains, getArray} = require('../utils/users');

describe('Users', function(){
  describe('Insert', function(){
    it('Insert new user', function(){
      userJoin(1, 'user1', 'room1');
      userJoin(1, 'user1', 'room2');
      userJoin(1, 'user1', 'room3');
      userJoin(2, 'user2', 'room1');
      userJoin(3, 'user3', 'room1');
      userJoin(4, 'user4', 'room2');
      userJoin(5, 'user5', 'room2');
      assert.equal(getArray().length, 7);
    });
  })

  describe('Get', function(){
    it('Get users by room', function(){
      assert.equal(getRoomUsers('room1').length, 3);
      assert.equal(getRoomUsers('room2').length, 3);
      assert.equal(getRoomUsers('room3').length, 1);
    })
  })
  describe('Contains', function(){
    it('Check if the room contains a user', function(){
      assert.notEqual(roomContains('user1', 'room1'), -1);
      assert.notEqual(roomContains('user1', 'room2'), -1);
      assert.notEqual(roomContains('user1', 'room3'), -1);
      assert.notEqual(roomContains('user2', 'room1'), -1);
      assert.equal(roomContains('user2', 'room2'), -1);
      assert.notEqual(roomContains('user3', 'room1'), -1);
    })
  })
  describe('Delete', function(){
    it('Delete user by ID', function(){
      userLeave(1);
      assert.equal(getArray().length, 4);
      userLeave(2);
      assert.equal(getArray().length, 3);
      userLeave(3);
      assert.equal(getArray().length, 2);
      userLeave(4);
      assert.equal(getArray().length, 1);
      userLeave(5);
      assert.equal(getArray().length, 0);
    })
  })
});
