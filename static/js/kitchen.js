!function ($) {
  var buttonIsOn = false;
  syncButton = function() {
    console.log('buttonIsOn', buttonIsOn);
    console.log('isFoodAvail', isFoodAvail);
    buttonIsOn = isFoodAvail;
    setButton();
  };
  setButton = function() {
    $('input#onoff').prop('checked', !buttonIsOn);
  };
  toggleButton = function() {
    //isFoodAvail is from common.js
    buttonIsOn = !buttonIsOn;
    setButton();
  }
  $('input#onoff').on('click', function() {
    var $this = $(this);
    if ($this.prop('checked')) {
      var message = 'food finished';
    } else {
      var message = 'food available';
    }
    toggleButton();
    $.post('/msg-kitchen', {message: message});
  })
  $(document).ready(function() {
    init(syncButton);
    subscribe(syncButton);
  });
}(window.jQuery);

