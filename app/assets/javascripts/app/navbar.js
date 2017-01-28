(function(){
    $(window).scroll(function() {

        if($(this).scrollTop() > 180) {
            $('.navbar-wagon').addClass('nav--sticky');
        } else {
            $('.navbar-wagon').removeClass('nav--sticky');
        }
    });
  })();
