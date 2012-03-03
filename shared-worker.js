(function () {
  "use strict";

  var count = 0
    , peers = []
    ;
  self.addEventListener('connect', function (e) {
    // ports appears to be absolutely useless:
    // it's a `sequence`, not an `Array` (and `sequence` has no documentation)
    // there is no `length`
    // it can't be JSON.stringified
    var port = e.ports[0];
    peers.push(port);
    count += 1;
    port.postMessage({ msg: 'Hello World! You are connection #' + count });
    port.addEventListener('message', function (e) {
      peers.forEach(function (port) {
        port.postMessage(e.data);
      });
      /*
      ports.forEach(function (port) {
        port.postMessage('new msg', e.target.result);
      });
      */
    });
    port.start();
  });
}());
