//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require semantic-ui
//= require_tree ./app
//= require underscore
//= require gmaps/google
//= require jquery.turbolinks
//= require chosen-jquery
//= require messages
//= require moment
//= require bootstrap-datetimepicker
//= require daterangepicker


$(function () {
  $('[data-toggle="popover"]').popover()
})


$("input.date_picker").datepicker();
