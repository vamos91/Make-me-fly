var Pastease=function(){var Base_url=document.location.protocol+"//pastease.mopinion.com",Cookie_pro_active_days=365,LOG=!1,STREAM=!1,TRIGGERS=["passive","proactive","exit"],SERVICES=["mopinion"],USE_$=!1,AJAX_$=!1,SEPARATE_COOKIES=!0,SOCKET,EXIT=!1,EXIT_ACTIVATED=!1,DEBUG=!1,URL_DETECTION;return{load:function(e){Pastease.debug(),Pastease.log("loading Pastea.se "+e),USE_$&&Pastease.jquery(),STREAM&&(Pastease.socketio(),SOCKET=Pastease.socket()),Pastease.init(e)},init:function(e){Pastease.config(e)},config:function(e){var o="/config/"+e,t={},i=Pastease.parse;USE_$||AJAX_$?Pastease.send(o,t,i,"get"):Pastease.sendXML(o,t,i,"get")},parse:function(data){try{data=JSON.parse(data)}catch(e){Pastease.log(e)}if("code"in data&&200==data.code&&"deployment"in data&&"rules"in data.deployment)var rules=data.deployment.rules;else var rules=[];if(void 0===data||void 0==data||"published"in data.deployment&&!data.deployment.published)return Pastease.log("Not published!"),!1;var loaded_services=[];if(0==rules.length)return!1;for(var i=0;i<rules.length;i++){if(Pastease.log("============================"),Pastease.log("---RULE "+i),Pastease.log(JSON.stringify(rules[i])),!("if"in rules[i]&&"then"in rules[i]))return!1;if("id"in rules[i]&&null!=rules[i].id&&SEPARATE_COOKIES)var rule_id=rules[i].id;if(Pastease.log("RULE ID: "+rule_id),"session"in rules[i])var session=rules[i].session;else var session=null;if("show_form"in rules[i])var show_form=rules[i].show_form;else var show_form=null;"debug"in rules[i]&&rules[i].debug&&(DEBUG=!0);for(var if_rules=rules[i].if,then_rules=rules[i].then,all_ok=!1,j=0;j<if_rules.length;j++){Pastease.log("-----------------------"),Pastease.log("if rule "+j);var condition=if_rules[j];Pastease.log("condition: "+JSON.stringify(condition)),"trigger"in condition&&!(TRIGGERS.indexOf(condition.trigger)<0)||Pastease.log("WARNING: no trigger!");var loc_code_ok=!0;if("location"in condition&&condition.location.length>0){loc_code_ok=!1,0==condition.location.length&&(loc_code_ok=!0);for(var not_exists=[],m=0;m<condition.location.length;m++)if("object"==typeof condition.location[m]&&"value"in condition.location[m]&&"operator"in condition.location[m]){if("operator"in condition.location[m]&&["exists","does not exist"].indexOf(condition.location[m].operator)>-1)var operator=condition.location[m].operator;else var operator=null;if(null==operator||"exists"==operator){var loc_code_ok_temp=Pastease.searchLocation(condition.location[m].value,!1,operator);if(loc_code_ok_temp){loc_code_ok=!0;break}}else{var loc_code_ok_temp=Pastease.searchLocation(condition.location[m].value,!1,operator);not_exists.push(loc_code_ok_temp)}}else{var loc_code_ok_temp=Pastease.searchLocation(condition.location[m],!1,"exists");if(loc_code_ok_temp){loc_code_ok=!0;break}}not_exists.length>0&&-1==not_exists.indexOf(!1)&&(loc_code_ok=!0)}Pastease.log("location: "+loc_code_ok);var ref_code_ok=!0;if("referrer"in condition&&condition.referrer.length>0){ref_code_ok=!1,0==condition.referrer.length&&(ref_code_ok=!0);for(var p=0;p<condition.referrer.length;p++){var ref_code_ok_temp=Pastease.referrer(condition.referrer[p],!1);if(ref_code_ok_temp){ref_code_ok=!0;break}}}Pastease.log("referrer: "+ref_code_ok);var cookie_code_ok=!0;if("cookie"in condition&&condition.cookie.length>0){cookie_code_ok=!1;for(var n=0;n<condition.cookie.length;n++)if("name"in condition.cookie[n]&&("value"in condition.cookie[n]||"operator"in condition.cookie[n])){if("operator"in condition.cookie[n]&&["exists","does not exist","contains","matches exactly"].indexOf(condition.cookie[n].operator)>-1)var operator=condition.cookie[n].operator;else var operator=null;if(null==operator){if(Pastease.getCookie(condition.cookie[n].name,!0)==condition.cookie[n].value){cookie_code_ok=!0;break}}else if("exists"==operator){if(""!=Pastease.getCookie(condition.cookie[n].name,!0)){cookie_code_ok=!0;break}}else if("does not exist"==operator){if(""==Pastease.getCookie(condition.cookie[n].name,!0)){cookie_code_ok=!0;break}}else if("matches exactly"==operator){if(Pastease.getCookie(condition.cookie[n].name,!0)==condition.cookie[n].value){cookie_code_ok=!0;break}}else if("contains"==operator){if(null!=Pastease.getCookie(condition.cookie[n].name,!0).match(condition.cookie[n].value)){cookie_code_ok=!0;break}}else if("does not contain"==operator&&null==Pastease.getCookie(condition.cookie[n].name,!0).match(condition.cookie[n].value)){cookie_code_ok=!0;break}}}Pastease.log("cookie: "+cookie_code_ok);var js_code_ok=!0;if("js"in condition&&condition.js.length>0){js_code_ok=!1;for(var o=0;o<condition.js.length;o++)if("name"in condition.js[o]&&("value"in condition.js[o]||"operator"in condition.js[o])){if("operator"in condition.js[o]&&["exists","does not exist","contains","matches exactly","does not contain"].indexOf(condition.js[o].operator)>-1)var operator=condition.js[o].operator;else var operator=null;if(eval(Pastease.jsVar(condition.js[o].name,condition.js[o].value,operator,!0))){js_code_ok=!0;break}}}Pastease.log("js: "+js_code_ok);var css_selector_code_ok=!0;if("css_selector"in condition&&condition.css_selector.length>0){css_selector_code_ok=!1;for(var o=0;o<condition.css_selector.length;o++)if("name"in condition.css_selector[o]&&("value"in condition.css_selector[o]||"operator"in condition.css_selector[o])){if("operator"in condition.css_selector[o]&&["exists","does not exist","contains","matches exactly","does not contain"].indexOf(condition.css_selector[o].operator)>-1)var operator=condition.css_selector[o].operator;else var operator=null;if(Pastease.cssSelector(condition.css_selector[o].name,condition.css_selector[o].value,operator)){css_selector_code_ok=!0;break}}}Pastease.log("css_selector: "+css_selector_code_ok);var pages_code_ok=!0;pages_code_ok=!("number_of_pages"in condition&&"check"in condition.number_of_pages&&"amount"in condition.number_of_pages)||Pastease.numberOfPages(condition.number_of_pages.check,condition.number_of_pages.amount,!1,rule_id),Pastease.log("nr of pages: "+pages_code_ok);var device_code_ok=!0;if("devices"in condition&&condition.devices.length>0){for(var show=!1,device_info=Pastease.testDevice(),q=0;q<condition.devices.length;q++)("desktop"!=condition.devices[q]||device_info.phone||device_info.seven_inch||device_info.tablet)&&("tablet"!=condition.devices[q]||!0!==device_info.tablet&&!0!==device_info.seven_inch)?"mobile"==condition.devices[q]&&!0===device_info.phone&&(show=!0):show=!0;device_code_ok=show}Pastease.log("device: "+device_code_ok);var type_code_ok=!0;if(type_code_ok=!("type"in condition&&["new","returning"].indexOf(condition.type)>-1)||Pastease.type(condition.type,!1,rule_id),Pastease.log("new/returning visitor: "+type_code_ok),"scrollpos"in condition&&"from"in condition.scrollpos&&"px"in condition.scrollpos)var set_scroll=!0;else var set_scroll=!1;var condition_ok=loc_code_ok&&ref_code_ok&&cookie_code_ok&&js_code_ok&&pages_code_ok&&device_code_ok&&type_code_ok&&css_selector_code_ok;condition_ok&&(all_ok=!0)}for(var basic_codes=[],trigger_codes=[],k=0;k<then_rules.length;k++){var service=then_rules[k];if(!("service"in service&&"args"in service))return!1;-1==loaded_services.indexOf(service.service)&&all_ok&&(basic_codes.push(Pastease.services(service[["service"]],service.args,!1)),set_scroll||loaded_services.push(service.service))}if(all_ok){Pastease.log("All OK!");var code=function(){for(var e=0;e<basic_codes.length;e++)basic_codes[e](),Pastease.log("basic code: "+basic_codes[e]);for(var o=0;o<if_rules.length;o++){var t=Pastease.triggers(service[["service"]],service.args,if_rules[o].trigger,if_rules[o].percentage,if_rules[o].time,session,show_form,if_rules[o].time_in_session,!1,rule_id);t(),Pastease.log("trigger code: "+t)}Pastease.log("triggered!")}}else{var code=function(){};Pastease.log("not all OK..."),Pastease.clearService(service.args)}all_ok&&(set_scroll?Pastease.scroll(condition.scrollpos.from,condition.scrollpos.px,code):Pastease.run(code,!0,!1))}STREAM&&Pastease.streamInfo(),URL_DETECTION||(URL_DETECTION=document.location.href);var detectURLChange=setInterval(function(){URL_DETECTION!==document.location.href?(clearInterval(detectURLChange),Pastease.log("URL changed: rechecking rules"),URL_DETECTION=document.location.href,Pastease.parse(data)):Pastease.log("No URL change")},150)},run:function(code,try_catch,return_code){if(DEBUG)Pastease.log("DEBUG MODE, code will not be executed");else if(try_catch=void 0!==try_catch&&try_catch)try{return_code?(Pastease.log("code: "+code),eval(code)):code()}catch(e){Pastease.log(e)}else return_code?(Pastease.log("code: "+code),eval(code)):code()},searchLocation:function(e,o,t){return o=void 0===o||o,o?'(document.location.host+document.location.pathname+location.search).match("'+e+'") != null':"exists"==t?null!=(document.location.host+document.location.pathname+location.search).match(e):null==(document.location.host+document.location.pathname+location.search).match(e)},referrer:function(e,o){return o=void 0===o||o,o?'(document.referrer).match("'+e+'") != null':null!=document.referrer.match(e)},jsVar:function(e,o,t,i){return i=void 0===i||i,null==t?i?"(typeof "+e+' !== "undefined" && '+e+' == "'+o+'")':void 0!==e&&e==o:"exists"==t?i?"(typeof "+e+' !== "undefined")':void 0!==e:"does not exist"==t?i?"(typeof "+e+' === "undefined")':void 0===e:"matches exactly"==t?i?"(typeof "+e+' !== "undefined" && '+e+' == "'+o+'")':void 0!==e&&e==o:"contains"==t?i?"(typeof "+e+' !== "undefined" && '+e+'.match("'+o+'"))':void 0!==e&&null!=e.match(o):"does not contain"==t?i?"(typeof "+e+' !== "undefined" && !'+e+'.match("'+o+'"))':void 0!==e&&null==e.match(o):void 0},cssSelector:function(e,o,t){if(!t)return!1;var i;try{i=document.querySelectorAll(e)}catch(e){}if("exists"===t){if(void 0!==i)return i.length>0}else if("does not exist"===t){if(void 0!==i)return 0===i.length}else if("contains"===t){if(void 0!==i&&i.length>0){n=(i=i[0]).textContent||i.innerText;return o=o||"",n.match(new RegExp(o,"gi"))}}else if("matches exactly"===t){if(void 0!==i&&i.length>0)return n=(n=(i=i[0]).textContent||i.innerText).replace(/^\s+|\s+$/g,""),o==n}else if("does not contain"===t&&void 0!==i&&i.length>0){var n=(i=i[0]).textContent||i.innerText;return o=o||"",!n.match(new RegExp(o,"gi"))}},numberOfPages:function(e,o,t,i){return t=void 0===t||t,i=void 0===i?null:i,e="min"==e?">":"max"==e?"<":null,""!=Pastease.getCookie("page_count",!1,i)?count=Pastease.getCookie("page_count",!1,i):count=0,(""==Pastease.getCookie("last_page",!1,i)||""!=Pastease.getCookie("last_page",!1,i)&&Pastease.getCookie("last_page",!1,i)!=document.location.pathname)&&(count+=1),Pastease.setCookie("last_page",document.location.pathname,0,"/",void 0,!1,i),Pastease.setCookie("page_count",count,0,"/",void 0,!1,i),null==e?!t||"":t?"("+count+" "+e+"= "+o+")":">"==e?count>=o:"<"==e?count<=o:void 0},type:function(e,o,t){return o=void 0===o||o,t=void 0===t?null:t,1==Pastease.getCookie("Pastease.returning",!1,t)?code="returning"==e?!o||"true":!!o&&"false":code="new"==e?!o||"true":!!o&&"false",Pastease.setCookie("Pastease.returning",1,0,"/",void 0,!1,t),code},scroll:function(e,o,t){e="undefined"!==e?e:"top",perc=isNaN(o),perc&&(o=o.replace("%","")),o=parseInt(o);var i=!1,n=USE_$?$(document).height():document.body.clientHeight,a=USE_$?$(window).height():window.innerHeight;return USE_$?$(window).scroll(function(){i=Pastease.onScroll(event,e,o,t,perc,i,n,a)}):window.onscroll=function(){i=Pastease.onScroll(event,e,o,t,perc,i,n,a)},"true"},onScroll:function(e,o,t,i,n,a,s,r){var c=USE_$?$(window).scrollTop():(window.pageYOffset||document.scrollTop)-(document.clientTop||0),l=(c+r)/s*100,d=s-(c+r),u=100-l;return Pastease.log("top: "+c),Pastease.log("top: "+l+" %"),Pastease.log("bottom: "+d),Pastease.log("bottom: "+u+" %"),Pastease.log("code loaded: "+a),"top"==o?!a&&(!n&&c>=t||n&&l>=t)&&(Pastease.run(i,!1),a=!0):"bottom"==o&&!a&&(!n&&d<=t||n&&u<=t)&&(Pastease.run(i,!1),a=!0),a},exit:function(e,o,t,i,n,a,s,r){i=void 0!==i&&null!=i?i:Cookie_pro_active_days,n=void 0!==n&&null!=n?n:"once",o=void 0!==o&&null!=o?o:0,a=void 0!==a?a:null,Pastease.log("Exit activated!");var c,l="once"!=n,d=Math.floor(100/e);if(""==Pastease.getCookie("Pastease.exit.chance",!1,r)){var u=Pastease.rnd(d);Pastease.setCookie("Pastease.exit.chance",u,i,"/",void 0,!1,r)}if(!USE_$)var v=Pastease.listeners(),f=v.addListener,_=v.removeListener;if(USE_$)$(document).mousemove(function(e){e=e||window.event,IE=!!document.all,IE,mouseY=e.clientY,c=mouseY});else{var g=function(e){e=e||window.event,IE=!!document.all,IE,mouseY=e.clientY,Pastease.log("mouseY: "+mouseY),c=mouseY};f(document,"mousemove",g)}return o=Pastease.outAtime(o,a,"Pastease.exit.timestamp",r),Pastease.log("trigger time: "+o),setTimeout(function(){if(Pastease.log("waiting for exit..."),USE_$)$(document).mouseleave(function(e){c<=100&&d==Pastease.getCookie("Pastease.exit.chance",!1,r)&&(1!=Pastease.getCookie("Pastease.exit.activated",!1,r)||l)&&Pastease.getExit()&&!EXIT_ACTIVATED&&(Pastease.setCookie("Pastease.exit.activated",1,i,"/",void 0,!1,r),EXIT_ACTIVATED=!0,t(),Pastease.log("Oh no, left page...exit!"))});else{var e=document.getElementsByTagName("html")[0],o=function(n){Pastease.log("y : "+c),Pastease.log("y_min : 100"),Pastease.log("nth : "+d),Pastease.log("EXIT_ACTIVATED : "+EXIT_ACTIVATED),c<=100&&d==Pastease.getCookie("Pastease.exit.chance",!1,r)&&(1!=Pastease.getCookie("Pastease.exit.activated",!1,r)||l)&&Pastease.getExit()&&!EXIT_ACTIVATED&&(Pastease.setCookie("Pastease.exit.activated",1,i,"/",void 0,!1,r),EXIT_ACTIVATED=!0,Pastease.log("exit code:"),Pastease.log(t),t(),Pastease.log("Oh no, left page...exit!"),_(e,"mousemove",o),_(document,"mousemove",g))};f(e,"mouseleave",o)}},o),s?"Pastease.setExit();":Pastease.setExit},listeners:function(){var e,o;return document.addEventListener?(e=function(e,o,t){return e.addEventListener(o,t,!1)},o=function(e,o,t){return e.removeEventListener(o,t,!1)}):(e=function(e,o,t){return e.attachEvent("on"+o,t)},o=function(e,o,t){return e.detachEvent("on"+o,t)}),{addListener:e,removeListener:o}},setExit:function(e){void 0===e&&(e=!0),EXIT=!!e},getExit:function(){return EXIT},passive:function(e,o,t,i,n,a,s,r){i=void 0!==i&&null!=i?i:Cookie_pro_active_days,n=void 0!==n&&null!=n?n:"once",o=void 0!==o?o:null,a=void 0!==a?a:null,r=void 0===r?null:r;var c="once"!=n,l=Math.floor(100/e);if(""==Pastease.getCookie("Pastease.passive.chance",!1,r)){var d=Pastease.rnd(l);Pastease.setCookie("Pastease.passive.chance",d,i,"/",void 0,!1,r),Pastease.setCookie("Pastease.passive.activated",0,i,"/",void 0,!1,r),Pastease.log("passive condition set: 1 in "+l+", random nr: "+d)}if(o=Pastease.outAtime(o,a,"Pastease.passive.timestamp",r),l!=Pastease.getCookie("Pastease.passive.chance",!1,r)||1==Pastease.getCookie("Pastease.passive.activated",!1,r)&&!c)if(s)u="";else u=function(){};else{if(s)u="setTimeout(function() { "+t+" }, "+o+");";else var u=function(){setTimeout(function(){t()},o)};Pastease.log("service starting in "+o/1e3+" seconds...")}return u},proActive:function(e,o,t,i,n,a,s,r){i=void 0!==i&&null!=i?i:Cookie_pro_active_days,n=void 0!==n&&null!=n?n:"once",o=void 0!==o?o:null,a=void 0!==a?a:null,r=void 0===r?null:r;var c="once"!=n,l=Math.floor(100/e);if(""==Pastease.getCookie("Pastease.pro_active.chance",!1,r)){var d=Pastease.rnd(l);Pastease.setCookie("Pastease.pro_active.chance",d,i,"/",void 0,!1,r),Pastease.setCookie("Pastease.pro_active.activated",0,i,"/",void 0,!1,r),Pastease.log("pro active condition set: 1 in "+l+", random nr: "+d)}if(o=Pastease.outAtime(o,a,"Pastease.pro_active.timestamp",r),l!=Pastease.getCookie("Pastease.pro_active.chance",!1,r)||1==Pastease.getCookie("Pastease.pro_active.activated",!1,r)&&!c)if(s)u="";else u=function(){};else{if(s)u="setTimeout(function() { "+t+' Pastease.setCookie( "Pastease.pro_active.activated", 1, '+i+', "/", undefined, false ); }, '+o+");";else var u=function(){setTimeout(function(){t(),Pastease.setCookie("Pastease.pro_active.activated",1,"+session+","/",void 0,!1,r)},o)};Pastease.log("service starting in "+o/1e3+" seconds...")}return u},clearService:function(e){if(e.length>=3){Pastease.log("Removing content in div "+e[2]);var o=document.getElementById(e[2]);if(o)for(;o.firstChild;)o.removeChild(o.firstChild)}},outAtime:function(e,o,t,i){if(i=void 0===i?null:i,null!=o&&0!=o){var n=Pastease.timestamp(),a=""!=Pastease.getCookie(t,!1,i)?Pastease.getCookie(t,!1,i):n,s=n-a,e=o-s;Pastease.log("timestamp: "+n),Pastease.log("prev_timestamp: "+a),Pastease.log("time_passed: "+s),Pastease.log("time: "+e),""==Pastease.getCookie(t,!1,i)&&Pastease.setCookie(t,n,0,"/",void 0,!1,i)}return 1e3*e},timestamp:function(){return Date.now||(Date.now=function(){return(new Date).getTime()}),Math.floor(Date.now()/1e3)},rnd:function(e){return Math.floor(Math.random()*e)+1},observer:function(){MutationObserver=window.MutationObserver||window.WebKitMutationObserver,new MutationObserver(function(e,o){Pastease.log(e,o),Pastease.stream("dom",{html:document.documentElement.innerHTML})}).observe(document,{subtree:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0,attributeFilter:!0})},streamInfo:function(){$(document).mousemove(function(e){e=e||window.event,IE=!!document.all,IE?(mouseX=event.clientX,mouseY=event.clientY+document.body.scrollTop):(mouseX=e.pageX,mouseY=e.pageY),Pastease.stream("mouse",{x:mouseX,y:mouseY})}),Pastease.observer(),Pastease.stream("dom",{html:document.documentElement.innerHTML})},stream:function(e,o){try{var t=SOCKET,i={id:Pastease.getId(),type:e,vars:o,agent:navigator.userAgent,host:document.location.host,protocol:document.location.protocol,resolution:{width:screen.width,height:screen.height},viewport:{width:Math.max(document.documentElement.clientWidth,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight,window.innerHeight||0)}};t.emit("json",i)}catch(e){Pastease.log("stream ERROR: "+e)}Pastease.log("stream: "+JSON.stringify(i))},getId:function(){var e=Pastease.getCookie("stream_id");if(e&&""!=e)return e;var o=Pastease.randomString(30);return Pastease.setCookie("stream_id",o),o},randomString:function(e){return Math.round(Math.pow(36,e+1)-Math.random()*Math.pow(36,e)).toString(36).slice(1)},getCookie:function(e,o,t){t=void 0===t?null:t,void 0===o&&(o=!1);var n=document.cookie.split(";"),a="",s="",r=!1;for(SEPARATE_COOKIES&&null!=t&&!o&&(e+="."+t),i=0;i<n.length;i++){if(a=n[i].split("="),a[0].replace(/^\s+|\s+$/g,"")==e)return r=!0,a.length>1&&(s=unescape(a[1].replace(/^\s+|\s+$/g,""))),s;a=null,""}if(!r)return""},setCookie:function(e,o,t,i,n,a,s){s=void 0===s?null:s;var r=new Date;r.setTime(r.getTime()),t&&(t=1e3*t*60*60*24),SEPARATE_COOKIES&&null!=s&&(e+="."+s);var c=new Date(r.getTime()+t);document.cookie=e+"="+escape(o)+(t?";expires="+c.toGMTString():"")+(i?";path="+i:"")+(n?";domain="+n:"")+(a?";secure":"")},makeDiv:function(e){if(document.getElementById(e))Pastease.log("Div: "+e+" found, nothing inserted");else{var o=document.createElement("div");o.setAttribute("id",e),document.getElementsByTagName("body")[0].appendChild(o),Pastease.log("inserted div: "+e)}},triggers:function(e,o,t,i,n,a,s,r,c,l){c=void 0===c||c,l=void 0===l?null:l,i=null==i?100:i,n=null==n?0:n,r=null==r?0:r;d="";if("mopinion"==e){if("passive"==t){if(Pastease.log("trigger: passive"),c)d="var try_code; try_code = setInterval(function() { try { "+(d='srv.showButton("'+o[0]+'");')+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);";else{Pastease.code=function(){setTimeout(function(){try{srv.showButton(o[0])}catch(e){Pastease.log(e),Pastease.code()}},100)};d=Pastease.code}return[null,0].indexOf(n)>-1&&[null,0].indexOf(r)>-1&&[null,0].indexOf(i)>-1?(Pastease.log("plain passive code"),d):(Pastease.log("passive code with timeout or %..."),Pastease.passive(i,n,d,a,s,r,c,l))}if("proactive"==t){if(Pastease.log("trigger: proactive"),c)d="var try_code = setInterval(function() { try { "+(d='srv.openModal(true, "'+o[0]+'");')+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);";else d=function(){Pastease.try_code=setInterval(function(){try{srv.openModal(!0,o[0]),clearInterval(Pastease.try_code)}catch(e){Pastease.log(e)}},100)};return Pastease.proActive(i,n,d,a,s,r,c,l)}if("exit"==t){if(Pastease.log("trigger: exit"),c)d="var try_code = setInterval(function() { try { "+(d='srv.openModal(true, "'+o[0]+'");')+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);";else var d=function(){Pastease.try_code=setInterval(function(){try{srv.openModal(!0,o[0]),clearInterval(Pastease.try_code)}catch(e){Pastease.log(e)}},100)};return Pastease.exit(i,n,d,a,s,r,c,l)}if("test"==t)return Pastease.log("test trigger"),c?"":function(){}}},testDevice:function(){var e=/iPhone/i,o=/iPod/i,t=/iPad/i,i=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,n=/Android/i,a=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,s=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,r=/Windows Phone/i,c=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,l=/BlackBerry/i,d=/BB10/i,u=/Opera Mini/i,v=/(CriOS|Chrome)(?=.*\bMobile\b)/i,f=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,_=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),g=function(e,o){return e.test(o)};return new function(m){var p=m||navigator.userAgent,h=p.split("[FBAN");if(void 0!==h[1]&&(p=h[0]),void 0!==(h=p.split("Twitter"))[1]&&(p=h[0]),this.apple={phone:g(e,p),ipod:g(o,p),tablet:!g(e,p)&&g(t,p),device:g(e,p)||g(o,p)||g(t,p)},this.amazon={phone:g(a,p),tablet:!g(a,p)&&g(s,p),device:g(a,p)||g(s,p)},this.android={phone:g(a,p)||g(i,p),tablet:!g(a,p)&&!g(i,p)&&(g(s,p)||g(n,p)),device:g(a,p)||g(s,p)||g(i,p)||g(n,p)},this.windows={phone:g(r,p),tablet:g(c,p),device:g(r,p)||g(c,p)},this.other={blackberry:g(l,p),blackberry10:g(d,p),opera:g(u,p),firefox:g(f,p),chrome:g(v,p),device:g(l,p)||g(d,p)||g(u,p)||g(f,p)||g(v,p)},this.seven_inch=g(_,p),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this}},services:function(service,args,return_code){return_code=void 0===return_code||return_code;var code="";"mopinion"==service?(code='(function(d, e, v) {var f = d.createElement(e),vars = {"key":"{0}","domain":"{1}","divName":"{2}","button":false};f.src = "https://collect.mopinion.com/assets/surveys/"+v+"/js/survey.min.js?v=1.25";f.onload = f.onreadystatechange = function() {var r = this.readyState; if (r) if (r != "complete") if (r != "loaded") return;try {srv.loadSurvey(vars);} catch (x) {}};var s = d.getElementsByTagName(e)[0],p = s.parentNode;p.insertBefore(f, s);})(document, "script", "1.2");',args.length>=3&&Pastease.makeDiv(args[2])):"CFMS"==service&&(code='Mgo.loadMopinion("mopinion","{0}","none","{1}");');for(var j=0;j<args.length;j++){var match="{"+j+"}",token=args[j];code=code.replace(match,token)}return return_code?code:function(){eval(code)}},jquery:function(){var e=document.location.protocol+"//code.jquery.com/jquery-1.9.1.js";if(!1===Pastease.fileExists(e)){var o=document.createElement("script");o.type="text/javascript",o.src=e,document.getElementsByTagName("head")[0].appendChild(o)}var t=function(){window.jQuery?Pastease.log("jQuery loaded!"):window.setTimeout(function(){t()},200)};t()},socketio:function(){var e=document.location.protocol+"//cdn.socket.io/socket.io-1.4.5.js";if(!1===Pastease.fileExists(e)){var o=document.createElement("script");o.type="text/javascript",o.src=e,document.getElementsByTagName("head")[0].appendChild(o)}var t=function(){window.io?Pastease.log("Socket.io loaded!"):window.setTimeout(function(){t()},200)};t()},fileExists:function(e){for(var o=document.getElementsByTagName("script"),t=0;t<o.length;t++)if(Pastease.log("looking for: "+e),Pastease.log("found: "+o[t].src),o[t].src==e)return!0;return!1},socket:function(){var e="pastea.se"==document.location.host?"socket.pastea.se":"localhost:8585";return io.connect(document.location.protocol+"//"+e)},sendXML:function(e,o,t,i){url=Base_url+e;var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState==XMLHttpRequest.DONE||4==n.readyState)if(200==n.status){var e=n.responseText;t(e)}else Pastease.log("Ajax ERROR "+n.status)},n.open(i,url,!0),n.send()},send:function(e,o,t,i){url=Base_url+e;var n={url:url,type:i,data:o,dataType:"json",success:function(e){t(e)},error:function(e){Pastease.log("AJAX ERROR: "+JSON.stringify(e)),Pastease.log("url: "+url),Pastease.log(e,!0)}};$.ajax(n)},use$:function(e){void 0===e&&(e=!1),USE_$=e},ajax$:function(e){void 0===e&&(e=!1),AJAX_$=e},debug:function(e){void 0===e&&(e=!1),LOG="true"==Pastease.getCookie("LOG")||e},log:function(e,o){if(void 0===o&&(o=!1),LOG)try{o?console.log(e):console.log("P> "+e)}catch(e){}}}}();