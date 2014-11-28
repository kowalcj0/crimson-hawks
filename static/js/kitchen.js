!function ($) {
  toggleButton = function() {
    $('input#onoff').prop('checked', !isFoodAvail)
  }
  $('input#onoff').on('click', function() {
    var $this = $(this);
    if ($this.prop('checked')) {
      var message = 'food finished';
    } else {
      var message = 'food available';
    }
    $.post('/msg-kitchen', {message: message});
  })
  $(document).ready(function() {
    init(toggleButton);
    subscribe(toggleButton);
  });
}(window.jQuery);

