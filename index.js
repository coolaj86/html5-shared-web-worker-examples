(function () {
  "use strict";

  var worker = new SharedWorker('shared-worker.js')
    , log = document.getElementById('log')
    , $ = require('ender')
    , window = require('window')
    , addWindow
    ;

  worker.port.addEventListener('message', function (e) {
    log.textContent += '\n' + e.data;
  }, false);

  worker.port.start();
  worker.port.postMessage('ping');

  function addIframe() {
    console.log('adding another iframe');
    $('body').append($("<iframe src='inner.html'>"));
  }

  addWindow = (function () {
    var count = 0
      ;
      
    return function () {
      window.open('inner.html', 'win' + count);
      count += 1;
    }
  }());

  function attachHandlers() {
    $('body').delegate('.js-add-iframe', 'click', addIframe);
    $('body').delegate('.js-add-window', 'click', addWindow);
  }

  $.domReady(attachHandlers);
}());
