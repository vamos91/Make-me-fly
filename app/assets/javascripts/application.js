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
        duration: 3000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

window.sr = ScrollReveal()
sr.reveal('h1');
sr.reveal('.banner.h1', { delay: 600, reset:false });
sr.reveal('.card', { origin:"bottom",
  distance : '100px' , duration: 1000, reset:false });
sr.reveal('.wrapper-grey', { origin:"left", move: '50px', duration: 1000, reset:true })
