;function csrfToken(t){if((typeof $('csrf_token')=='undefined'||$('csrf_token')==null)){var e=document.createElement('input');e.setAttribute('type','hidden');e.setAttribute('name',t);e.setAttribute('id','csrf_token');e.setAttribute('value','1');document.body.appendChild(e)}};function product_recently(){var e=$('recently-viewed_shop.product_details');if(e!=null){var t=live_site+'index.php?option=com_varnish&format=raw&varnish=1&task=product_recently';if($('p')!==null&&$('iid')!==null){t=t+'&i='+$('iid').value+'&p='+$('p').value}(new Ajax(t,{method:'get',noCache:!0,onComplete:function(t){e.set('html',t)}})).request()}};function product_links(){if($('product-links')!=null){var e,o;if($('product_id')!=null&&!e){e=$('product_id').value};if($('add-to-bag')!=null){for(var t=0;t<$('add-to-bag').length;t++){if($('add-to-bag')[t].name=='product_id'){e=$('add-to-bag')[t].value}};var n=$('add-to-bag').action;n=n.split('=');o=n[1]};if(o&&o.length>e.length){e=o};var i=live_site+'index.php?option=com_varnish&format=raw&task=product_links&varnish=1&product_id='+e,r=function(e){var i=JSON.parse(e);$('product-links').innerHTML=i.html;ProductPage.Wishlist.init();var o=i.wishlistids,n;o=o.split(',');for(t=0;t<o.length;t++){n=parseInt(o[t]);ProductPage.Wishlist.ids.push(n)}},a={method:'get',onComplete:r,noCache:!0};(new Ajax(i,a)).request()}};function getCookie(t){var n=t+'=',i=document.cookie.split(';');for(var o=0;o<i.length;o++){var e=i[o];while(e.charAt(0)==' ')e=e.substring(1);if(e.indexOf(n)!=-1)return e.substring(n.length,e.length)};return''};function update_prices(t,e,o){var c=getCookie('staffdiscount');if(c==1||o!=''){try{var n='';if(typeof campaign_products=='object'&&campaign_products.length>0){n=','+window.campaign_products.join()};var i=live_site+'index.php?option=com_varnish&format=raw&task=update_prices&varnish=1&prodpage='+t+'&promo='+o+'&product_ids='+e+n,r=function(e){for(var n in e.products){if(e.products.hasOwnProperty(n)){var r=$$('#product'+n+', #campaign-product'+n);r.getElement('.price').set('html',e.products[n])}};var i=$$('.promotion-name-container');i.each(function(t){t.empty()});if(typeof e.promotion!=='undefined'){var o=new Element('a',{'class':'promotion inverted button promo-name'});if(t){o.setAttribute('href','promotions/'+e.promotion.uuid)}
else{o.addClass('no-action')};o.set('html',e.promotion.name);i.each(function(t){t.grab(o.clone())});if(t){$('promo_id').value=e.promotion.uuid}}},a={method:'get',url:i,noCache:!0,onComplete:r};new Request.JSON(a).get()}catch(s){}}};window.addEvent('domready',function(){try{var t=live_site+'index.php?option=com_varnish&format=raw&task=signin_register&varnish=1',e=function(t){csrfToken(t.token);var a=($('checkout_form')!==null);if(!a){var r=new MiniBag($('viewcart_price'),$('minicart-count'));r.update(t.basket.price,t.basket.count);var i=t.basket.credit_amount.replace(/[^0-9]/g,'').toFloat(),n=$('account_dropdown');if(n!=null&&i>0){var e=new MyAccountDropDown($('account_dropdown'));e.setUserInfo(t.basket.customer_name,t.basket.credit_amount);var o=$$('.header-menu li')[0];o.addEvents({'mouseenter':function(){var t=(o.getPosition().x+(o.getSize().x/2)-120);e.setPosition(t);e.open()},'mouseleave':e.closeSoon.bind(e)});n.addEvents({'mouseenter':e.open.bind(e),'mouseleave':e.closeSoon.bind(e)})}};if(t.basket.gift_cards_enabled){$$('.menu_giftcard').setStyle('display','block')}
else{$$('.menu_giftcard').setStyle('display','none')}},o={method:'get',url:t,noCache:!0,onComplete:e};new Request.JSON(o).get();product_recently();$script.ready('product',function(){product_links()})}catch(n){}});var MiniBag=function(t,e){this.__value_container=t;this.__count_container=e};MiniBag.prototype.update=function(t,e){this.__value_container.set('html',t);this.__count_container.getElement('span').set('text',e)};var MyAccountDropDown=function(t){this.__timeout=null;this.__dropdown=t};MyAccountDropDown.prototype.setUserInfo=function(t,e){this.__dropdown.getElement('#account_name').set('html',t);this.__dropdown.getElement('#credit_amount').set('html',e)};MyAccountDropDown.prototype.setPosition=function(t){this.__dropdown.setStyle('left',t)};MyAccountDropDown.prototype.open=function(){clearTimeout(this.__timeout);this.__dropdown.removeClass('hidden')};MyAccountDropDown.prototype.closeSoon=function(){clearTimeout(this.__timeout);this.__timeout=setTimeout(this.closeNow.bind(this),600)};MyAccountDropDown.prototype.closeNow=function(){this.__dropdown.addClass('hidden')};