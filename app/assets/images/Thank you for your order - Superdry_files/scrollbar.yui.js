//See slider.js
var _hasscrollbar=true;function makeScrollbar(k,q,i,b,l,h,p){var f=new Fx.Styles(k,{duration:1000,wait:false});var b=(typeof b=="undefined")?true:b;var l=(typeof l=="undefined")?false:l;var h=Number(h)||0;var p=p||[];var m=0;if(k!=null&&q!=null&&i!=null){if(k.className=="infoscroller"){m=10}var n=(b?(k.getSize().scrollSize.x-k.getSize().size.x):(k.getSize().scrollSize.y+m-k.getSize().size.y));var c=new Slider(q,i,{steps:n,mode:(b?"horizontal":"vertical"),onChange:function(s){var r=(b?s:0);var t=(b?0:s);k.scrollTo(r,t)}}).set(0);if(!l){$$(k,q).addEvent("mousewheel",function(s){s=new Event(s).stop();var r=c.step-s.wheel*30;c.set(r)})}if(h>0){c.set(c.step+h)}if(b){var j=false;var o=false;var e=0;var g=0;$("scrollbar-scrollright").addEvent("mousedown",function(){if(j==false){j=true;d("left")}else{clearTimeout(g);j=false;o=false}}).addEvent("mouseup",function(){j=false;o=false});$("scrollbar-scrollleft").addEvent("mousedown",function(){if(o==false){o=true;d("right")}else{clearTimeout(g);j=false;o=false}}).addEvent("mouseup",function(){j=false;o=false});var a={startleft:function(){while(o==true){d(left)}},startright:function(){while(j==true){d(right)}},stop:function(){j=false;o=false}};document.addEvent("keydown",function(r){switch(r.keyCode){case 37:c.set(c.step-249);break;case 39:c.set(c.step+249);break;default:}})}else{if(p.length==2){p[0].addEvent("click",function(){c.set(c.step-50)});p[1].addEvent("click",function(){c.set(c.step+50)})}else{$("scrollbar-scroll-up").addEvent("click",function(){c.set(c.step-50)});$("scrollbar-scroll-down").addEvent("click",function(){c.set(c.step+50)})}}function d(r){switch(r){case"left":for($i=0;$i<2;$i++){c.set(c.step+3)}break;case"right":for($i=0;$i<2;$i++){c.set(c.step-3)}break}if(o!=false){g=setTimeout(function(){d(r)},1)}if(j!=false){g=setTimeout(function(){d(r)},1)}}}};