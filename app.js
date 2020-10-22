const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("server running on port: "+PORT));
