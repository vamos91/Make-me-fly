var banner = $('#banner-user-disconnect').hide();

function toto(){
  $('#banner-user-disconnect').fadeIn();
}

setTimeout(toto, 3000);

function close_banner(){
  $("#banner-user-disconnect").remove();
};



// commantaire article
$('#show-comment').hide();
$('#unbutton-comment').hide();
function show(){
  $('#show-comment').fadeIn().show();
  $('#unbutton-comment').show();
  $('#hide-comment').hide();
  $('#button-comment').hide();
};

function reduce(){
  $('#show-comment').hide();
  $('#unbutton-comment').hide();
  $('#hide-comment').fadeIn().show();
  $('#button-comment').show();
}
