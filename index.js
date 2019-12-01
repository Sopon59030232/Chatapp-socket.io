var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('username',function(username){
        socket.username = username;
    });
    socket.on('chat message', function(msg){
        io.emit('chat message','<mark>'+ '<strong>' + socket.username + '</strong>' + '</mark>    ' + msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});