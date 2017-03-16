var app = require('express')();
var http = require('http').Server(app);
//this is where the events and stuff comes from
var io = require('socket.io')(http);
var colors = [];

/* this is the main page we will serve */
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*this is for reference. It's a demo of the socketIO stuff */
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

//io.on = when request detected
//socket.on('disconnect') = when disconnect detected
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('allColors', colors);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('colorMessage', function(colorMsg) {
    colors.push({id: colorMsg['id'], color: colorMsg['color']});
    console.log(colors);
    io.emit('allColors', colors);
  });
});
http.listen(3030, function(){
  console.log('listening on *:3030');
});
