//Required module
var express= require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jQuery');;

//Variable
var connected_people = [];

//Load static files
app.use(express.static('public'));

//Add remove method to Javascript Prototype array
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//Made HTTP request on URL/ and respond with client.html in response
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
    var username = '';

    socket.on('new user',  function(msg){
        username = msg;
        connected_people.push(msg);
        io.emit('new user', {msg:msg,people:connected_people});
    });
    socket.on('chat message',  function(msg){
        io.emit('chat message', msg);
    });
    socket.on('user typing',  function(msg){
        io.emit('user typing', username);
    });
    socket.on('disconnect', function(){
        connected_people.remove(username);
        io.emit('user', {name:username,people:connected_people});
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
