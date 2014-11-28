!function ($) {
  var cookieSong = null;

  updateKitchenWidget = function() {
    console.log(isFoodAvail);
    toggleCookieMonster();
    toggleFoodLabel();
    toggleCookieSong();
  }

  toggleFoodLabel = function() {
    if (isFoodAvail) {
      var text = 'There is food. Hurry up!';
    } else {
      var text = 'Food is finished. Got to be quick next time!';
    }
    $('label#foodLabel').text(text);
  };

  toggleCookieSong = function() {
    if (isFoodAvail) {
      if (cookieSong == null) {
        cookieSong = new Audio("/media/cookie.mp3");
      }
      cookieSong.currentTime = 0
      cookieSong.play();
    } else {
      if (cookieSong != null) {
        cookieSong.pause();
      }
    };
  };

  toggleCookieMonster =  function() {
    $('div#cookieMonster').toggleClass('hide', !isFoodAvail);
  };

  $(document).ready(function() {
    $.material.init();
    init(updateKitchenWidget);
    subscribe(updateKitchenWidget);
  });
}(window.jQuery);
