var isFoodAvail = false;

init = function(callback) {
  $.get('/msg-kitchen', function(data) {
    console.log(data);
    isFoodAvail = JSON.parse(data).isFoodAvail;
    callback();
  })
}

subscribe = function(callback) {
  var url = ('ws://' + window.location.hostname + ':'
      + window.location.port + '/ws-kitchen');
  ws = new ReconnectingWebSocket(url);

  ws.onopen = function() {
    console.log('open');
  };

  ws.onmessage = function(evt) {
    message = evt.data;
    console.log(message);
    if (message == 'food available') {
      isFoodAvail = true;
    } else {
      isFoodAvail = false;
    }
    callback();
  }
}
