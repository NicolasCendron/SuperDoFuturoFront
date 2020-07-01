const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const app = express();


const server = http.Server(app);
const io = socketIO(server);

app.get('/Add', (req, res) => {
    io.emit("add",req.query.id)
    res.sendStatus(200);
})
app.get('/Remove', (req, res) => {
    io.emit("remove",req.query.id)
    res.sendStatus(200);
})
server.listen(3000);



