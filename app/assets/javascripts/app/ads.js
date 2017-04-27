// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {
  $('.card').on('click', function() {
    window.location.href = $(this).data('url');
  });
});


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
