var app = require('express')();
var http = require('http').Server(app);
//this is where the events and stuff comes from
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//io.on = when request detected
//socket.on('disconnect') = when disconnect detected
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});
