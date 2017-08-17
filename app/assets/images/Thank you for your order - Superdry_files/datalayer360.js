;var DataLayerStorage={init:function(){var t=DataLayerStorage._country('country'),a=DataLayer360.access('superdry.default_symbol'),e=DataLayer360.access('superdry.site_id');switch(t){case'XXX':DataLayerStorage._delete(e+'_default_country');DataLayerStorage._delete(e+'_default_currency');break;case'GBU':DataLayerStorage._store(e+'_default_country','default');DataLayerStorage._store(e+'_default_currency',a);break;default:break}},_isQuotaExceeded:function(e){var t=!1;if(e){if(e.code){switch(e.code){case 22:t=!0;break;case 1014:if(e.name==='NS_ERROR_DOM_QUOTA_REACHED'){t=!0};break}}
else if(e.number===-2147024882){t=!0}};return t},_store:function(e,t){try{localStorage.setItem(e,t)}catch(a){if(DataLayerStorage._isQuotaExceeded(a)){DataLayerStorage._delete(e);DataLayerStorage._clear()}}},_clear:function(){try{localStorage.clear()}catch(e){}},_get:function(e){try{return localStorage.getItem(e)}catch(t){if(DataLayerStorage._isQuotaExceeded(t)){DataLayerStorage._delete(e);DataLayerStorage._clear()}};return null},_delete:function(e){try{localStorage.removeItem(e)}catch(t){}},_country:function(e){url=window.location.href;e=e.replace(/[\[\]]/g,'\\$&');var a=new RegExp('[?&]'+e+'(=([^&#]*)|&|#|$)'),t=a.exec(url);if(!t){return''};if(!t[2]){return''};return decodeURIComponent(t[2].replace(/\+/g,' '))}};var DataLayer360={init:function(){try{this._helper=new DataLayerHelper(dataLayer)}catch(e){};this.listener();DataLayerStorage.init()},GTMstore:function(e,t){return},GTMget:function(e){return null},GTMdelete:function(e){return},errorMessages:function(e,t){dataLayer.push({'event':'errormessages','errorMessage':{'type':e,'value':t}})},listener:function(){switch(DataLayer360.access('page.category')){case'product':DataLayer360.productPageListener();break;case'category':DataLayer360.categoryPageListener();break;case'checkout':this._step=2;DataLayer360.checkoutStepListener();break};DataLayer360.formListener()},access:function(e){try{return this._helper.get(e)}catch(t){}},checkoutStepListener:function(){if($('billing_address')!=null){$('billing_address').getElements('input').each(function(e){e.addEventListener('click',function(){DataLayer360.checkoutStepBasket(3,'Billing Address')})})};if($('delivery-options')!=null){$('delivery-options').getElements('input').each(function(e){e.addEventListener('click',function(){DataLayer360.checkoutStepBasket(4,'Delivery Address')})})};if($('payment_method')!=null){$('payment_method').getElements('input').each(function(e){e.addEventListener('click',function(){DataLayer360.checkoutStepBasket(6,'Payment Method')})})}},checkoutStepBasket:function(e,t){if(DataLayer360._step!=e){DataLayer360._step=e;DataLayer360.checkoutStep(e,t)}},checkoutStep:function(e,t){var a=[],c=DataLayer360.access('ecommerce.checkout.products');c.each(function(e){a.push({id:e.id,name:e.name,category:e.category,brand:e.brand,price:e.price,quantity:e.quantity,dimension12:e.dimension12,dimension18:e.dimension18})});dataLayer.push({'event':'checkoutStep','ecommerce':{'currencyCode':DataLayer360.access('superdry.currency'),'checkout':{'actionField':{'step':e,'option':t},'products':a}}})},changeQuantity:function(e,t){var a=DataLayer360.access('ecommerce.checkout.products');a.filter(function(a){if(a.dimension18==e){dataLayer.push({'ecommerce':{'click':{'products':[{'id':a.id,'dimension18':a.dimension18,'dimension19':a.dimension19,'quantity':t}]}}})}})},removeFromBasket:function(e){var t=DataLayer360.access('ecommerce.checkout.products');t.filter(function(t){if(t.dimension18==e){dataLayer.push({'event':'removeFromBasket','ecommerce':{'remove':{'products':[{'id':t.id,'dimension18':t.dimension18,'dimension19':0}]}}})}})},formListener:function(){if(typeof $('login')!='undefined'&&$('login')!=null){$('login').addEvent('submit',function(){DataLayer360.formSubmit('Sign In')})};if(typeof $('resetform')!='undefined'&&$('resetform')!=null){$('resetform').addEvent('submit',function(){DataLayer360.formSubmit('Forgotten Password')})}},formSubmit:function(e){dataLayer.push({'event':'formSubmit','formTracking':{'name':e}})},categoryPageListener:function(){$$('li.hproduct').addEvent('click',function(e){var t=this.id;t=t.replace('product','');DataLayer360.productClick(t)})},filterClick:function(e,t){dataLayer.push({'event':'filterClick','productFilters':{'filterType':e,'values':t}})},sortClick:function(e,t){dataLayer.push({'event':'sortClick','productSort':{'filterType':e,'values':t}})},productClick:function(e){var t=DataLayer360.access('ecommerce.products');t.filter(function(t){if(t.id==e){dataLayer.push({'event':'productClick','ecommerce':{'currencyCode':DataLayer360.access('superdry.currency'),'click':{'actionField':{'list':DataLayer360.access('ecommerce.impressions.0.list')},'products':[{'id':e,'name':t.name,'category':t.category,'price':t.price,'position':t.position}]}}})}})},productPageListener:function(){if(typeof $('load-zoom')!='undefined'&&$('load-zoom')!=null){$('load-zoom').addEvent('click',function(){DataLayer360.productInteraction('Zoom')})};if(typeof $('load-video')!='undefined'&&$('load-video')!=null){$('load-video').addEvent('click',function(){DataLayer360.productInteraction('Video')})};if(typeof $('sizing-guide')!='undefined'&&$('sizing-guide')!=null){$('sizing-guide').addEvent('click',function(){DataLayer360.productInteraction('Size Guide')})}},productInteraction:function(e){dataLayer.push({'event':'productInteraction','productAction':{'id':DataLayer360.access('ecommerce.detail.products.0.id'),'type':e}})},addToBasket:function(e){dataLayer.push({'event':'addToBasket','ecommerce':{'add':{'products':[{'id':DataLayer360.access('ecommerce.detail.products.0.dimension18'),'name':DataLayer360.access('ecommerce.detail.products.0.name'),'category':DataLayer360.access('ecommerce.detail.products.0.category'),'brand':DataLayer360.access('ecommerce.detail.products.0.brand'),'price':DataLayer360.access('ecommerce.detail.products.0.price'),'quantity':1,'dimension11':DataLayer360.access('ecommerce.detail.products.0.dimension11'),'dimension13':DataLayer360.access('ecommerce.detail.products.0.dimension13'),'dimension14':DataLayer360.access('ecommerce.detail.products.0.dimension14'),'dimension15':DataLayer360.access('ecommerce.detail.products.0.dimension15'),'dimension16':DataLayer360.access('ecommerce.detail.products.0.dimension16'),'dimension17':DataLayer360.access('ecommerce.detail.products.0.dimension17'),'dimension18':parseInt(e),'dimension19':1,'dimension20':DataLayer360.access('ecommerce.detail.products.0.dimension20'),'dimension21':DataLayer360.access('ecommerce.detail.products.0.dimension21'),}]}}})}};