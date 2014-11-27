subscribe = function() {
  //console.log($scope.channel);
  var url = ('ws://' + window.location.hostname + ':'
      + window.location.port + '/kitchen');
  ws = new ReconnectingWebSocket(url);

  ws.onopen = function() {
    console.log('open')
  };

  ws.onmessage = function(evt) {
    console.log(evt.data);
  }
}

$(document).ready(function() {
  subscribe();
});
