(function(){
    $(window).scroll(function() {

        if($(this).scrollTop() > 750) {
            $('.navbar-wagon-root').addClass('nav--sticky');
        } else {
            $('.navbar-wagon').removeClass('nav--sticky');
            $('.navbar-wagon-root').removeClass('nav--sticky');
        }
    });
  })();

