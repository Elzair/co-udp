var udp      = require('dgram')
  , util     = require('util')
  ;

function Socket(type, listener) {
  udp.Socket.call(this, type, listener);
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
  return function(cb) {
    return new Socket(type, function(msg, rinfo) {
      cb(null, {msg: msg, rinfo: rinfo});
    });
  };
};
