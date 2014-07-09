var udp      = require('dgram')
  , util     = require('util')
  ;

function Socket(type, listener) {
  console.log(util.format('Creating socket %s', type));
  udp.Socket.call(this, type, listener);
  console.log('Got past this!');
}
util.inherits(Socket, udp.Socket);

Socket.prototype.bind = function(port, address) {
  return function(cb) {
    udp.Socket.bind.call(this, port, address, function() {
      cb();
    });
  };
};

exports.Socket = Socket;

exports.createSocket = function (type) {
  console.log('Got to outer createSocket');
  return function(cb) {
    console.log('Got to inner createSocket');
    var socket = new Socket(type, function(msg, rinfo) {
      console.log(util.format('Socket: %s', JSON.stringify(socket, null, 2)));
      cb(msg, socket);
    });
    console.log('Hello again!');
    return socket;
  };
};
