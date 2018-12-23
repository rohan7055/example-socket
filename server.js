var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
const BASE_URL="http://localhost:9000/"
 


server.listen(5000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
    
  
  socket.on('sendquery', function (data) {
  console.log(data);
      //time consuming event
      //async method
   fs.readFile('big.txt', 'utf8', function(err, contents) {
    console.log(contents);
    
    socket.emit('completedquery',{url:BASE_URL+'big.txt'})
   });
 
    console.log('after calling readFile');
    
      
  });
});