(function () {
  "use strict";

  var worker = new SharedWorker('shared-worker.js', 'my-shared-scope')
    , log = document.getElementById('log')
    , $ = require('ender')
    , window = require('window')
    , addWindow
    , sendMessage
    , Notifications = window.webkitNotifications || window.mozNotifications
    ;

  worker.port.addEventListener('message', function (e) {
    log.textContent += '\n' + e.data.msg;
  }, false);

  worker.port.start();
  worker.port.postMessage({ msg: 'ping' });

  function addIframe() {
    console.log('adding another iframe');
    $('body').append($("<iframe src='inner.html'>"));
  }

  sendMessage = (function () {
    var count = 0
      ;

    return function (ev) {
      ev.preventDefault();

      var msg = $(this).find('.js-message').val()
        ;

      console.log('going to send message:', msg);
      worker.port.postMessage({ msg: '[' + count + ']' + msg });
      count += 1;
    };
  }());

  addWindow = (function () {
    var count = 0
      ;
      
    return function () {
      window.open('inner.html', 'win' + count);
      count += 1;
    };
  }());

  function askPermissionForNotifications() {
    console.log('Receiver asking permission to use remote');
    Notifications.requestPermission(function () {
      if (0 !== Notifications.checkPermission()) {
        return; 
      }

      // Browser supports it :)
      Notifications.createHTMLNotification('inner.html').show();
    });
  }

  function attachHandlers() {
    $('body').delegate('.js-add-iframe', 'click', addIframe);
    $('body').delegate('.js-add-window', 'click', addWindow);
    $('body').delegate('.js-add-notifications', 'click', askPermissionForNotifications);
    $('body').delegate('form.js-messenger', 'submit', sendMessage);
  }

  $.domReady(attachHandlers);
}());
