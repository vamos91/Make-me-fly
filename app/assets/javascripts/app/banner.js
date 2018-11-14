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


var toto = 1;
$(".form-demande").hide();
function open_form(){
  if (toto == 1)
  {
  $(".xs-bouton-demande").slideDown("slow");
  $(".form-demande").show("slow");
  $('#close-button').text('Fermer');
  toto = 0;
  }else{
    $(".xs-bouton-demande");
    $(".form-demande").slideUp("slow");
    $('#close-button').text('Envoyer une demande');
    toto = 1
  }
};
