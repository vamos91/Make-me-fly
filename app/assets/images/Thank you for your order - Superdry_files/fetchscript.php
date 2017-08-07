var postcode_Format = /^(BFPO[ ]?[0-9]{1,4})$|^(GIR[ ]?0AA)$|^([A-PR-UWYZ][0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$|^([A-PR-UWYZ][0-9][0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$|^([A-PR-UWYZ][A-HK-Y0-9][0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$|^([A-PR-UWYZ][A-HK-Y0-9][0-9][0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$|^([A-PR-UWYZ][0-9][A-HJKS-UW0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$|^([A-PR-UWYZ][A-HK-Y0-9][0-9][ABEHMNPRVWXY0-9][ ]?[0-9][ABD-HJLNPQ-UW-Z]{2})$/;

window.addEvent('domready', function() {
	//addToggles();
        var ship_to;
	//categoryFilter();
        
    if ($('create_account_link') !== null) {
    	$('create_account_link').addEvent('click', function(e) {   
    		$('login').action = lang_register;
    		$('login').submit();
    	});
    }

	if ($$('.forgotten-password a') != null) {
    	$$('.forgotten-password a').addEvent('click', function(e) {
    		$('login').action = lang_forgot_password;
    		$('login').submit();
    	});
    }
	
});



/*function validatePassword (pw, options) {
	// default options (allows any password)
	var o = {
		lower:    0,
		upper:    0,
		alpha:    0, /* lower + upper */
/*		numeric:  0,
		special:  0,
		length:   [0, Infinity],
		custom:   [ /* regexes and/or functions *//* ],
		badWords: [],
		badSequenceLength: 8,
		noQwertySequences: false,
		noSequential:      false
	};

	for (var property in options)
		o[property] = options[property];

	var	re = {
			lower:   /[a-z]/g,
			upper:   /[A-Z]/g,
			alpha:   /[A-Z]/gi,
			numeric: /[0-9]/g,
			special: /[\W_]/g
		},
		rule, i;

	// enforce min/max length
	if (pw.length < o.length[0] || pw.length > o.length[1])
		return 0;

	// enforce lower/upper/alpha/numeric/special rules
	for (rule in re) {
		if ((pw.match(re[rule]) || []).length < o[rule])
			return 0;
	}

	// enforce word ban (case insensitive)
	for (i = 0; i < o.badWords.length; i++) {
		if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1)
			return 0;
	}

	// enforce the no sequential, identical characters rule
	if (o.noSequential && /([\S\s])\1/.test(pw))
		return 0;

	// enforce alphanumeric/qwerty sequence ban rules
	if (o.badSequenceLength) {
		var	lower   = "abcdefghijklmnopqrstuvwxyz",
			upper   = lower.toUpperCase(),
			numbers = "0123456789",
			qwerty  = "qwertyuiopasdfghjklzxcvbnm",
			start   = o.badSequenceLength - 1,
			seq     = "_" + pw.slice(0, start);
		for (i = start; i < pw.length; i++) {
			seq = seq.slice(1) + pw.charAt(i);
			if (
				lower.indexOf(seq)   > -1 ||
				upper.indexOf(seq)   > -1 ||
				numbers.indexOf(seq) > -1 ||
				(o.noQwertySequences && qwerty.indexOf(seq) > -1)
			) {
				return 0;
			}
		}
	}

	// enforce custom regex/function rules
	for (i = 0; i < o.custom.length; i++) {
		rule = o.custom[i];
		if (rule instanceof RegExp) {
			if (!rule.test(pw))
				return 0;
		} else if (rule instanceof Function) {
			if (!rule(pw))
				return 0;
		}
	}

	// great success!
	return 1;
}*/


function paypal_processing() {
	processing();
	setTimeout('document.adminForm.submit()',1000);
}

/*function processing() {
    var content = '<div class="newsletter-confirm popup-message"><img src="/public/images/process.gif" style="width:32px;height:32px;border:none" />';
   	content += '<br /><br /><span>'+lang_theme_processing+'</span>';
    popup(content, 80);
}*/


function checkPayment() {
}

function blacklist(country) {
	return false;
}



/*
 * RW: Checks the Users Email for Unregistered Users
 */


/**
 * reinstates the links for image substitution.
 */



/**
 * @deprecated Don't think this is used anymore. JJ - 04/08/2011
 */
function flypageColor(noIncrements,button) {
    var totIncrement = document.getElementById('totIncrement').value;
    var increment = 152;
    var count = document.getElementById('count').value;
    var fx = new Fx.Style('available-colours', 'margin-left', {
        duration: 1000,
        transition: Fx.Transitions.Back.easeOut,
        wait: true
    });

    if(button=='next'){
        if(count>=0 && ((count + 1) <= noIncrements)){
        count++;
        document.getElementById('count').value = count;
        totIncrement = totIncrement - increment;
        document.getElementById('totIncrement').value = totIncrement;
        fx.stop();
        fx.start(totIncrement);
        }

    } else if (button == 'back') {

        if($('available-colours').getStyle('margin-left') != '0px'){
       totIncrement = totIncrement + increment;
        fx.stop();
        fx.start(noIncrements);
        count = 0;
        document.getElementById('count').value = count;
        totIncrement = 0;
        document.getElementById('totIncrement').value = totIncrement;
                fx.stop();
                fx.start(0);
                count--;
        }
    }

}

/**
 * TODO Find out if this is still used
 * @param product
 * @param noIncrements
 * @param button
 */
function catsColor(product,noIncrements,button) {

    var totIncrement = document.getElementById('totIncrement_'+product).value;
    var increment = 218;
    var count = document.getElementById('count_'+product).value;
    var fx = new Fx.Style('available-colours-cat_'+product, 'margin-left', {
        duration: 1000,
        transition: Fx.Transitions.Back.easeOut,
        wait: true
    });

    if(button=='next'){
        if(count>=0 && ((count + 1) <= noIncrements)){
	        count++;
	        document.getElementById('count_'+product).value = count;
	        totIncrement = totIncrement - increment;
	        document.getElementById('totIncrement_'+product).value = totIncrement;
	        fx.stop();
	        fx.start(totIncrement);
        }

    } else {
    	totIncrement = totIncrement + increment;
    	fx.stop();
    	fx.start(noIncrements);
    	count = 0;
    	document.getElementById('count_'+product).value = count;
    	totIncrement = 0;
    	document.getElementById('totIncrement_'+product).value = totIncrement;
    	fx.stop();
    	fx.start(0);
    	count = 0;
	}
}

/**
 * 
 * @param el
 */
/*function slideColours(el) {
	el = $(el);
	var holder = el.getParent().getParent().getElement('.page-holder');
	//Get the width to scroll from the width of the first ul
	var d = holder.getFirst().getSize().size.x;

    var fx = new Fx.Style(holder, 'left', {
        duration: 1000,
        transition: Fx.Transitions.Back.easeOut,
        fps: 30
    });
    //Get current left and strip off 'px'
    var left = holder.getStyle('left');
    left = Number(left.substr(0, left.length - 2));

    left -= left%d;

	if(el.hasClass('next')) {
		left -= d;
	}
	else left += d;

	var width = holder.getSize().size.x;
	if(left > 0 ) left = 0;
	else if((-left + d) > width) left += d;
	fx.start(left);
}*/

// AJAX FUNCTIONS

function loadNewPage( el, url, isproduct ) {
	var _prodchange = $('sd_prod_change').value;
	var theEl = $(el);
	var callback = {
		success : function(responseText) {
			theEl.innerHTML = responseText;
			//var ww = new WordWrapper({element: 'product-desc'});
			reinstatelinks();
		}
	};
	var opt = {
	    method: 'get',
	    onComplete: callback.success
    };
	new Ajax( url + '&only_page=1&prod_change='+_prodchange, opt ).request();
}


/**
 * @deprecated Use ProductPage.addToBag
 * @param formId {String}
 * @param success {function} An optional callback to be called on success.
 */
function handleAddToCart( formId, success) {
	//has a size been selected
	var formAddToCart = $(formId);

	if ((typeof formAddToCart.product_id != 'undefined' && formAddToCart.product_id.value != "0")
		|| (typeof formAddToCart['prod_id[]'] != 'undefined' &&
			((typeof formAddToCart['prod_id[]'].value != 'undefined' && formAddToCart['prod_id[]'].value != 0)
			|| (typeof formAddToCart['prod_id[]'].length != 'undefined' && formAddToCart['prod_id[]'].length > 0)))) {
		//$('addtocartbtn').disabled = true;

		//Close any previous popup
		if(typeof document.boxB != 'undefined') {
			document.boxB.close();
		}
		if(typeof timeoutID != 'undefined') {
			clearTimeout(timeoutID);
		}

		if($('quantity') != null) {
			var qty = $('quantity').value;
			var m_strOut = String(qty);
			qty = m_strOut.replace(/[^0-9]/g, '');
			$('quantity').value = qty;
			if (qty == '') $('quantity').value = '1'; //Sets the default quantity in
		}

		//formAddToCart.quantity = 1;
		var callback = function(responseText) {

			//var close = true;
			//On success, update minicart

			if(responseText.indexOf('"success"') > -1 && responseText.indexOf('shop_info') > -1) {
				//updateMiniCarts();
				/* RedEye Tracking */
				if ($('tracking_div') != null) {
					$('tracking_div').innerHTML = '';
					$('tracking_div').innerHTML = responseText;
				}
				minicart_update();

				//delay hiding the minicart
				(function() {
					$('minicart_dropdown').setStyle('visibility', 'hidden');
				}).delay(6000);

				
				// Call success callback
				if(typeof success == "function") success(); 
				
				//Track event
				if(typeof ProductPage != "undefined") {
					Template.Utilities.trackEvent('Product', 'Added to bag', ProductPage._getParentSku() + ':' + ProductPage.product.name);
				}
				
			} else {
				//At this point, it can only ever be a low stock message
				//
				//Show Select Size or Low Stock message
				//var message = (responseText == 'Low stock')? lang_theme_low_stock: lang_theme_select_size;
				//var message = (responseText.indexOf('"low-stock"') > -1)? lang_theme_low_stock: lang_theme_select_size;
				//var content = '<div class="newsletter-confirm popup-message">'+message;
				//content += '<div class="buttons"><a title="'+lang_theme_close_link+'" class="arrow-button-left close">'+lang_theme_close_link+'</a></div></div>'
				//popup(content, 120);

				//Please select a size
				var content = '<div class="newsletter-confirm popup-message">'+lang_theme_low_stock+'</div>';
				if(typeof document.boxB != 'undefined') {
					document.boxB.close();
				}

				document.boxB = new MooPrompt('', content, {
					buttons:0,
					overlay:true,
					showCloseBtn:false
				});

				setTimeout(function() {
					document.boxB.close();
				}, 3000);

				//Track event
				Template.Utilities.trackEvent('Error Message', 'Add to bag', lang_theme_low_stock);
			}
			//$('addtocartbtn').disabled = false;
		};

		new Element('input', {
			type: 'hidden',
			name: 'ajax',
			value: 1
		}).inject(formAddToCart);

		var opt = {
			method: 'post',
			data: formAddToCart,
			onComplete: callback,
			evalScripts: true
		};

		new Ajax(formAddToCart.action, opt).request();
	}

	//Please select a size
	else {

		new Utilities.ProductPopup($(document.body).getElement('.content .wrapper'), $('p').value, {
			base_url: live_site + "index.php",
			template: 'select_a_size'
		}, new Utilities.Overlay(document.body, "fixed"));
		
//		var content = '<div class="newsletter-confirm popup-message">'+lang_theme_select_size+'</div>';
//		if(typeof document.boxB != 'undefined') {
//			document.boxB.close();
//		}
//
//		document.boxB = new MooPrompt('', content, {
//			buttons:0,
//			overlay:true,
//			showCloseBtn:false
//		});
//
//		setTimeout(function() {
//			document.boxB.close();
//		}, 3000);

		//Track event
		Template.Utilities.trackEvent('Error Message', 'Add to bag', lang_theme_select_size);
	}
}

function doPopupNews(content) {
	//Close any previous popup
	if(typeof document.boxB != 'undefined') {
		document.boxB.close();
	}
	if(typeof(timeoutID) != 'undefined') {
		clearTimeout(timeoutID);
	}

	document.boxB = new MooPrompt('notice', content, {
		buttons:0,
		width:331,
		height:87,
		overlay:true,
		showCloseBtn:false
	});
	setTimeout('document.boxB.close()', 3000);

}

function CreateXMLHttpRequest() {
	if( typeof XMLHttpRequest == "undefined" ) {
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP") }     catch(e) {}
			try { return new ActiveXObject("Microsoft.XMLHTTP") }  catch(e) {}
			throw new Error( "This browser does not support XMLHttpRequest or XMLHTTP." )
		};
	}
	return new XMLHttpRequest();
}


function handleNewsletter( formId) {

	var errorMSG = '';
	var iserror=0;

   if (document.newsletter.first_name.value == "") {
		document.getElementById('lbl_first_name').style.color='red';
		iserror=1;
	} else document.getElementById('lbl_first_name').style.color='white';

   if (document.newsletter.last_name.value == "") {
		document.getElementById('lbl_last_name').style.color='red';
		iserror=1;
	} else document.getElementById('lbl_last_name').style.color='white';

   if (document.newsletter.email.value == "") {
		document.getElementById('lbl_email').style.color='red';
		iserror=1;
	} else document.getElementById('lbl_email').style.color='white';

   if (document.newsletter.gender.value == "0") {
		document.getElementById('lbl_gender').style.color='red';
		iserror=1;
	} else document.getElementById('lbl_gender').style.color='white';

	var email_Format = /^\w(\.?[\w-])*@\w(\.?[\w-])*\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2})?$/i;
	if (document.newsletter.email.value.search(email_Format)== -1)
	{
                document.getElementById('lbl_email').style.color='red';
		iserror=1;
	} else document.getElementById('lbl_email').style.color='white';

	if (document.newsletter.mens.checked == false && document.newsletter.womens.checked == false){
		document.getElementById('lbl_mens').style.color='red';
                document.getElementById('lbl_womens').style.color='red';
		iserror=1;
	} else {
            document.getElementById('lbl_mens').style.color='white';
            document.getElementById('lbl_womens').style.color='white';
        }


	if (iserror==1) {
		//alert(errorMSG);
                document.getElementById('news_error').style.display='block';
		return false;
	} else {
                document.getElementById('news_error').style.display='none';
		var obj = document.getElementById(formId);
		var getstr='';
		 for (i=0; i<obj.getElementsByTagName("input").length; i++) {

		  	if (obj.getElementsByTagName("input")[i].type == "text") {
	           getstr += obj.getElementsByTagName("input")[i].name + "=" +
	           obj.getElementsByTagName("input")[i].value + "&";
	        }


	        if (obj.getElementsByTagName("input")[i].type == "checkbox") {
	           if (obj.getElementsByTagName("input")[i].checked) {
	              getstr += obj.getElementsByTagName("input")[i].name + "=" +
	                   obj.getElementsByTagName("input")[i].value + "&";
	           } else {
	              getstr += obj.getElementsByTagName("input")[i].name + "=&";
	           }
	        }
	        if (obj.getElementsByTagName("input")[i].type == "radio") {
	           if (obj.getElementsByTagName("input")[i].checked) {
	              getstr += obj.getElementsByTagName("input")[i].name + "= 1" +
	                   obj.getElementsByTagName("input")[i].value + "&";
	           }
	       }

			   if (obj.getElementsByTagName("SELECT")[i]) {
			var sel = obj.getElementsByTagName("SELECT")[i];
	        getstr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
	     		}

			if (obj.getElementsByTagName("input")[i].type == "hidden") {
	           getstr += obj.getElementsByTagName("input")[i].name + "=" +
	           obj.getElementsByTagName("input")[i].value + "&";
	        }

	  }

		var params = getstr;

		xmlHttp2=CreateXMLHttpRequest();
		xmlHttp2.open("POST",obj.action,true);
		xmlHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp2.setRequestHeader("Content-length", params.length);
		xmlHttp2.setRequestHeader("Connection", "close");
		xmlHttp2.onreadystatechange = function() {
			if (xmlHttp2.readyState == 4) {
				doPopupNews('<div class="newsletterthanks"></div>');

                                // PSH to clear the fields...

                                document.newsletter.last_name.value = "";
                                document.newsletter.first_name.value = "";
                                document.newsletter.house_no.value = "";
                                document.newsletter.postcode.value = "";
                                document.newsletter.email.value = "";
                                document.newsletter.telephone.value = "";
                                document.newsletter.dob_day.value = "00";
                                document.newsletter.dob_month.value = "00";
                                document.newsletter.dob_year.value = "0000";
                                document.newsletter.gender.value = "0";
                                document.newsletter.mens.checked = false;
                                document.newsletter.womens.checked = false;
                                document.newsletter.marketing.checked = false;
			}

		};
		// CHANGED xmlHttp2.send(params);
		xmlHttp2.send(params);


		return false;
	}
}

/**
 * Used in Phase 4
 */
/*function handleAddToWishlist(formId, parameters) {
	var formAddToWishlist = document.getElementById(formId),
		form = $('add-to-bag'),
		product_id = form.product_id.value;

	//if(formAddToWishlist.getElement('input[name=product_id]').getProperty('value') > 0) {
	if(form.product_id.value > 0) {
		formAddToWishlist.product_id.value = form.product_id.value;
		var callback = function(responseText) {
			//var product_id = formAddToWishlist.getElement('input[name=product_id]').getProperty('value');
			//var item_id = formAddToWishlist.getElement('input[name=Itemid]').getProperty('value');
			//updateWishlistButton(product_id, item_id);
			if(formAddToWishlist.func.value == 'waitinglistadd') {
				var message = lang_theme_wishlist_added;
				ProductPage.Wishlist.addProduct(product_id);
			}
			else {
				var message = lang_theme_wishlist_removed;
				ProductPage.Wishlist.removeProduct(product_id);
				
			}

			doPopup('<p>'+message+'</p>');
			//reinstatelinks();
			//ProductPage.Wishlist.update(formAddToWishlist.product_id.value);
		};

		var opt = {
		    method:'post',
		    data:$(formId),
		    onComplete:callback,
		    evalScripts: true
		};

		new Ajax(formAddToWishlist.action, opt).request();
	}
	else {
		//handleAddToWishlistFailure(formId);
		doPopup('<p>'+lang_theme_wishlist_select_size+'</p>');
	}
	return false;
}*/


/**
* This function searches for all elements with the class name "vmCartModule" and
* updates them with the contents of the page "shop.basket_short" after a cart modification event
*/
function updateMiniCarts() {
	var callbackCart = function(responseText) {
		carts = $$( '.vmCartModule' );
		if( carts ) {
			try {
				for (var i=0; i<carts.length; i++){
					carts[i].innerHTML = responseText;
				}
			} catch(e) {}
		}
		reinstatelinks();
	};
	var option = { method: 'post', onComplete: callbackCart, data: { only_page:1,page: "shop.basket_short", option: "com_virtuemart" } };
	new Ajax( live_site + 'index2.php', option).request();
}
/**
* This function allows you to present contents of a URL in a really nice stylish dhtml Window
* It uses the WindowJS, so make sure you have called vmCommonHTML::loadWindowsJS(); before
*/
function fancyPop( url, parameters ) {
	parameters = parameters || {};
	popTitle = parameters.title || '';
	popWidth = parameters.width || 700;
	popHeight = parameters.height || 600;
	popModal = parameters.modal || false;

	window_id = new Window('window_id', {className: "mac_os_x",
										title: popTitle,
										showEffect: Element.show,
										hideEffect: Element.hide,
										width: popWidth, height: popHeight});
	window_id.setAjaxContent( url, {evalScripts:true}, true, popModal );
	window_id.setCookie('window_size');
	window_id.setDestroyOnClose();
}

/**
 * Update the wishlist button after adding or removing
 * @deprecated
 */
function updateWishlistButton(productid, item_id) {
	var callback = function(responseText) {
		button = $('wishlist-button');
		try {
			button.innerHTML = responseText;
		} catch(e) {}
	};
	var option = { method: 'post', onComplete: callback, data: {only_page:1, page:"shop.wishlist_button", option:"com_virtuemart", Itemid:item_id, product_id:productid} };
	new Ajax( live_site + 'index2.php', option).request();
}

/*function doPopup(content) {
	//Close any previous popup
	if(typeof document.boxB != 'undefined') {
		document.boxB.close();
	}
	if(typeof timeoutID != 'undefined') {
		clearTimeout(timeoutID);
	}

	document.boxB = new MooPrompt('notice', content, {
		buttons:0,
		width:331,
		overlay:true,
		showCloseBtn:true
	});
	//setTimeout('document.boxB.close()', 3000);
	//Fix to stop it from freezing on screen all the time
	if(typeof document.boxB != 'undefined') {
        setTimeout('document.boxB.close()', 3000);
    }
}*/











function quantityControls() {
	//Shopping basket change quantity arrows
	if ($$('#com_shopping-bag .decrease') != null) {
		var less = $$('#com_shopping-bag .decrease');
		less.addEvent('click', function() {
			var input = $(this).getNext();
			var value = input.getProperty('value');
			value = (value < 1)? 0: value - 1;
			input.setProperty('value', value);
		});
	}
	if ($$('#com_shopping-bag .increase') != null) {
		var more = $$('#com_shopping-bag .increase');
		more.addEvent('click', function() {
			var input = $(this).getPrevious();
			var value = input.getProperty('value');
			value = (value > 99)? 100: parseInt(value) + parseInt(1);
			input.setProperty('value', value);
		});
	}
}
