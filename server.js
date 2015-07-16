var express= require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
    var username = '';
    var connected_people = [];

    socket.on('new user',  function(msg){
        connected_people.push(msg);
        username = msg;
        io.emit('new user', msg);
    });
    socket.on('chat message',  function(msg){
        io.emit('chat message', msg);
    });
    socket.on('user typing',  function(msg){
        io.emit('user typing', username);
    });
    socket.on('disconnect', function(){
        io.emit('user', username);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});