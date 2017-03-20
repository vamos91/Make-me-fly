(function(){
    $(window).scroll(function() {

        if($(this).scrollTop() > 750) {
            $('.navbar-wagon').addClass('nav--sticky');
        } else {
            $('.navbar-wagon').removeClass('nav--sticky');
        }
    });
  })();


