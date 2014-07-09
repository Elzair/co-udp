var co  = require('co')
  , udp = require(__dirname + '/../')
  ;
function *main() {
  var socket = yield udp.createSocket('udp4');
  return socket;
}
var done = false;
var m = main();
while(!done) {
  var item = m.next();
  console.log(JSON.stringify(item));
  done = item.done;
}
