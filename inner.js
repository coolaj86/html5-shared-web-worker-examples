(function () {
  "use strict";

  var worker = new SharedWorker('shared-worker.js', 'my-shared-scope')
    , log = document.getElementById('log')
    , sendMessage
    , sendBark
    ;

  worker.port.addEventListener('message', function (e) {
    log.textContent += '\n' + e.data.msg;
  });

  worker.port.start();

  sendBark = (function () {
    var count = 0
      ;

    return function (ev) {
      console.log('going to bark');
      worker.port.postMessage({ msg: '[' + count + '] Bark!' });
      count += 1;
    };
  }());
  
  sendMessage = (function () {
    var count = 0
      ;

    return function (ev) {
      ev.preventDefault();

      var msg = $(this).find('.js-message').val()
        ;

      console.log('going to send message (from inner):', msg);
      worker.port.postMessage({ msg: '[' + count + ']' + msg });
      count += 1;
    };
  }());

  function attachHandlers() {
    $('body').delegate('.js-bark', 'click', sendBark);
    $('body').delegate('form.js-messenger', 'submit', sendMessage);
  }

  $.domReady(attachHandlers);
}());
