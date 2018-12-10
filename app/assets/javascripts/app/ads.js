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


// window.onmouseover=function(e) {
//         console.log(e.target.className);
// };




// $(function(){
//   $('.im'+'0').mouseover(function(){
//     for(i = 0; i < 5; i++){
//       if(i != 0){
//         alert('toto');
//        $('.im'+i).addClass('opacity');
//       }
//       // if (i == 4){
//       //  $('.im'+i).addClass('opacity');
//       // }
//     }
//   });
// });


// $(function(){
//   $('.im'+'0').mouseout(function(){
//     for(i = 0; i < 5; i++){
//      $('.im'+i).removeClass('opacity');
//     }
//   });
// });









$(function(){
  $('.im0').mouseover(function(){
    for(i = 0; i < 5; i++){
      if(i != 0){
       $('.im'+i).addClass('opacity');
      }
      // if (i == 4){
      //  $('.im'+i).addClass('opacity');
      // }
    }
  });
});
$(function(){
  $('.im0').mouseout(function(){
    for(i = 0; i < 5; i++){
     $('.im'+i).removeClass('opacity');
    }
  });
});


$(function(){
  $('.im1').mouseover(function(){
    for(i = 0; i < 5; i++){
      if(i != 1){
       $('.im'+i).addClass('opacity');
      }
      // if (i == 4){
      //  $('.im'+i).addClass('opacity');
      // }
    }
  });
});
$(function(){
  $('.im1').mouseout(function(){
    for(i = 0; i < 5; i++){
     $('.im'+i).removeClass('opacity');
    }
  });
});

$(function(){
  $('.im2').mouseover(function(){
    for(i = 0; i < 5; i++){
      if(i != 2){
       $('.im'+i).addClass('opacity');
      }
      // if (i == 4){
      //  $('.im'+i).addClass('opacity');
      // }
    }
  });
});
$(function(){
  $('.im2').mouseout(function(){
    for(i = 0; i < 5; i++){
     $('.im'+i).removeClass('opacity');
    }
  });
});

$(function(){
  $('.im3').mouseover(function(){
    for(i = 0; i < 5; i++){
      if(i != 3){
       $('.im'+i).addClass('opacity');
      }
      // if (i == 4){
      //  $('.im'+i).addClass('opacity');
      // }
    }
  });
});
$(function(){
  $('.im3').mouseout(function(){
    for(i = 0; i < 5; i++){
     $('.im'+i).removeClass('opacity');
    }
  });
});

$(function(){
  $('.im4').mouseover(function(){
    for(i = 0; i < 5; i++){
      if(i != 4){
       $('.im'+i).addClass('opacity');
      }
      // if (i == 4){
      //  $('.im'+i).addClass('opacity');
      // }
    }
  });
});
$(function(){
  $('.im4').mouseout(function(){
    for(i = 0; i < 5; i++){
     $('.im'+i).removeClass('opacity');
    }
  });
});
