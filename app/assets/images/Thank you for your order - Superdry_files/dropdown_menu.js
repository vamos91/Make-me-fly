;var Utilities=function(e){var r=!!('ontouchstart' in window)?150:0,n=[],o,a=100,c='hidden',u='highlight';e.DropdownMenu={init:function(e){n=e;for(var t=n.length-1;t>-1;t--){if(!$defined(n[t].menu_item))n.splice(t,1)};n.each(function(e){e.menu_item.grab(i(e));m(e)})}};function m(e){t(e).addEvents({'mouseenter':function(){clearTimeout(o);setTimeout(function(){l(e);d(e);v(e)},r)},'mouseleave':function(){o=setTimeout(function(){s(e);f()},a)}});if($defined(t(e).getElement('a'))){var m='a'}
else{var m='span'};t(e).getElement(m).addEvent('click',function(n){new Event(n).stop();var i=t(e);if(i.hasClass(u)&&i.getElement('a')!=null){window.location=i.getElement('a').href}});var n=i(e);if(n!=null){n.addEvents({'showme':function(){n.removeClass(c)},'hideme':function(){n.addClass(c)},'mouseenter':function(){clearTimeout(o)},'mouseleave':function(){o=setTimeout(function(){s(e);f()},a)}})}};function d(e){n.each(function(n){if(e!=n){i(n).fireEvent('hideme')}})};function l(e){f();t(e).addClass(u)};function f(){n.each(function(e){t(e).removeClass(u)})};function v(e){i(e).fireEvent('showme')};function s(e){i(e).fireEvent('hideme')};function t(e){return e.menu_item};function i(e){return $(e.dropdown_id)};return e}(Utilities||{});