const sio = require('socket.io')
let io = null

exports.io = function () {
  return io
};

exports.initialize = function(server) {
  io = sio(server)

  io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        console.log(msg)  
        io.emit('chat message', msg);
     })
  })
  
}