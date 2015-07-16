$(document).ready(function(){
    var socket = io();
    $( "#model_btn" ).click(function() {
        $('#myModal').modal('hide');
        socket.emit('new user', $('#username').val());
    });
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    $("#m").keyup(function(){
        socket.emit('user typing', 'is typing...');
    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('new user', function(msg){
        $('#messages').append($('<li>').text(msg + " " +"connected"));
        $('#connected_user').append($('<li>').text(msg));
    });
    socket.on('user', function(msg){
        $('#messages').append($('<li>').text(msg + " "+ "disconnected" ));
    });
    socket.on('user typing', function(msg){
        var typingTimer;
        var doneTypingInterval = 7000;

        $('#user_typing').html(msg + " " + "id typing...");
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);

        function doneTyping () {
            $('#user_typing').html("");
        }
    });
});

$(window).load(function(){
    $('#myModal').modal('show');
});



