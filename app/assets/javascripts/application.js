//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .
//= require underscore
//= require gmaps/google

$(function(){
  $.stellar({
    horizontalScrolling: false,
    verticalOffset: 40
  });
});




$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

