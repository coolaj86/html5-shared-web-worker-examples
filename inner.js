(function () {
  "use strict";

  var worker = new SharedWorker('shared-worker.js')
    , log = document.getElementById('log')
    ;

  worker.port.addEventListener('message', function (e) {
    log.textContent += '\n' + e.data;
  });

  worker.port.start();
}());
