(function () {
  "use strict";

  var worker = new SharedWorker('shared-worker.js', 'my-shared-scope')
    , log = document.getElementById('log')
    ;

  worker.port.addEventListener('message', function (e) {
    log.textContent += '\n' + e.data.msg;
  });

  worker.port.start();
}());
