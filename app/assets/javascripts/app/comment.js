// commentaire article
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
