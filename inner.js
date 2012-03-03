var worker = new SharedWorker('shared-worker.js');
var log = document.getElementById('log');
worker.port.onmessage = function(e) {
  log.textContent += '\n' + e.data;
}
