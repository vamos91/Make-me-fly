var banner = $('#banner-user-disconnect').hide();
setTimeout(toto, 3000);
function toto(){
  $('#banner-user-disconnect').fadeIn();
}

document.getElementById("close-button").onclick = function() {close_banner()};
function close_banner(){
  document.getElementById("banner-user-disconnect").remove();
};
