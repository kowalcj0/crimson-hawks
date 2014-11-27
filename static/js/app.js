!function ($) {
  var cookie_song = null;

  subscribe = function() {
    //console.log($scope.channel);
    var url = ('ws://' + window.location.hostname + ':'
        + window.location.port + '/kitchen');
    ws = new ReconnectingWebSocket(url);

    ws.onopen = function() {
      console.log('open');
    };

    ws.onmessage = function(evt) {
      console.log(evt.data);
      food_avail();
    }
  }

  food_avail = function() {
    play_cookie_song();
    show_cookie_monster();
  }

  food_unavail = function() {
    hide_cookie_monster();
    stop_cookie_song();
  }

  play_cookie_song = function() {
    if (cookie_song == null) {
      cookie_song = new Audio("/media/cookie.mp3");
    }
    cookie_song.currentTime = 0
    cookie_song.play();
  }

  stop_cookie_song = function() {
    if (cookie_song != null) {
      cookie_song.pause();
    }
  }

  show_cookie_monster =  function() {
    $('div#cookieMonster').removeClass('hide');
  }

  hide_cookie_monster =  function() {
    $('div#cookieMonster').addClass('hide');
  }

  $(document).ready(function() {
    $.material.init();
    subscribe();

    $('input#foodAvail').click(function() {
      var $this = $(this);
      if ($this.prop('checked')) {
        food_avail();
      } else {
        food_unavail();
      }
    })
  });
}(window.jQuery);
