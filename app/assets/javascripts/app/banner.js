var banner = $('#banner-user-disconnect').hide();

function toto(){
  $('#banner-user-disconnect').fadeIn();
}

setTimeout(toto, 3000);

function close_banner(){
  $("#banner-user-disconnect").remove();
};


setTimeout(alert, 4000);
function alert(){
  $('.alert-info').fadeOut();
  $('.alert-warning').fadeOut();
  $('.alert-notice').fadeOut();
};










