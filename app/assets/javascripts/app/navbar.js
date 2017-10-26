(function(){
    $(window).scroll(function() {

        if($(this).scrollTop() > 150) {
            $('.navbar-wagon-root').addClass('nav--sticky');
        } else {
            $('.navbar-wagon').removeClass('nav--sticky');
            $('.navbar-wagon-root').removeClass('nav--sticky');
        }
    });
  })();


function small_card(){
  //$('.card-ad').removeClass('hide-card');
  $('.card-ad').addClass('hide-card');
  $('.card').removeClass('hide-card');
  $('.card').addClass('active-card');
}

function big_card(){
  //$('.card-ad').removeClass('hide-card');
  $('.card-ad').removeClass('hide-card');
  $('.card').addClass('hide-card');
}

