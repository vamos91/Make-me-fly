$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});





// $(function () {
//         var fx = function fx() {
//           var dfd = $(".count").map(function (i, el) {
//               var data = parseInt(this.dataset.n, 10);
//               var props = {
//                 "from": {
//                     "count": 0
//                 },
//                 "to": {
//                     "count": 100
//                 }
//               };
//             return $(props.from).animate(props.to, {
//                 duration: 1000 * 1,
//                 step: function (now, fx) {
//                     $(el).text(Math.ceil(now));
//                 },
//                 complete: function() {
//                    if (el.dataset.sym !== undefined) {
//                   el.textContent = el.textContent.concat(el.dataset.sym)
//                    }
//                 }
//             }).promise();
//         }).toArray();
//             // return jQuery promise when all animations complete
//             return $.when.apply($, dfd);
//         };

//         var reset = function reset() {
//           console.log($(this).scrollTop());
//             // do stuff when window `.scrollTop()` > 75
//             if ($(this).scrollTop() > 50) {
//               // turn off scroll event so `fx` not called
//               // during ongoing animation
//               $(this).off("scroll");
//                 // when all animations complete
//                 fx()
//             }
//         };
//         // if `fx` should only be called once ,
//         // change `.on()` to `.one()` ,
//         // remove `.then()` callback following `fx()`
//         // within `reset`
//         $(window).on("scroll", reset);
//     });
