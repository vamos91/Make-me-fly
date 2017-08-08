Flyr = {};
(function() {

  var mobileRez = 767

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  /////////////////////////////////////////////////////////
  /// PollyFills and DOM Helper functions
  ///

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;
      for (; from < len; from++) {
        if (from in this && this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
      if (this === void 0 || this === null)
        throw new TypeError();
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
        throw new TypeError();
      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t))
            res.push(val);
        }
      }
      return res;
    };
  }

  if (typeof String.prototype.toCamel !== 'function') {
    String.prototype.toCamel = function(){
      return this.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
    };
  }

  if(typeof String.camelToDash !== 'function') {
    String.prototype.camelToDash = function() {
      return this.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    };
  }

  if (!document.location.origin) {
      document.location.origin = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ':' + document.location.port: '');
  }

  function addEventListener(el, eventName, handler, capture) {
    capture = capture || false;
    if (el.addEventListener) {
      el.addEventListener(eventName, handler, capture);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }
  }

  function removeEventListener(el, eventName, handler) {
    if (el.removeEventListener)
      el.removeEventListener(eventName, handler);
    else
      el.detachEvent('on' + eventName, handler);
  }

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  function encode (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        console.log("invalid character for encoding");
        return null;
      }
      block = block << 8 | charCode;
    }
    return output;
  }


  var objectFromAttrs  = function(el) {
    // given an element this generates a js object from its attrs
    var object = {}, name, param;
    var attrs = [].filter.call(el.attributes, function(at) {
      if(/^data-flyr-/.test(at.name)) {
        name = at.name.replace('data-flyr-', '');
        param = at.value;
        object[name.toCamel()] = param;
      }
    });
    return object;
  };

  var appendHtml = function(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  };

  var setText = function(el, str) {
    if (el.textContent !== undefined) {
      el.textContent = str;
    } else {
      el.innerText = str;
    }
  };

  var removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
     } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  var addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
     } else {
      el.className += ' ' + className;
    }
  };

  var hasClass = function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  var mergeObjects = function (obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  };

  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  /////////////////////////////////////////////////////////
  /// Actual FlyrJS Library Methods
  ///


  var parseButton = function(button) {
    var itenerary = JSON.parse(button.getAttribute('data-flyr-obj'));
    var searchInfo = JSON.parse(button.getAttribute('data-flyr-searchInfo'));
    itenerary.searchInfo = searchInfo;
    return (itenerary);
  };

  var createDeepLink = function(params, modalType) {
    var url = domain + 'index.html?vers=' + version + '&params=';
    var paramString = 'standAlone=true&searchID=' + _sessionId + '&userID=' + _userId;
    paramString += "&timeStamp=" + (new Date().toJSON().split('.')[0]);
    paramString += "&product=" + modalType;
    for( var k in params) {
      paramString += '&' + k + '=' + params[k];
    }
    return url + encode(paramString);
  };

  var farekeepOnClick = function(button) {
    var params = button.getAttribute('data-flyr-premium-id');
    if (params) {
      if (scriptAttrs.offsiteLink && scriptAttrs.offsiteLink.toLowerCase() === 'true') {
        var url = button.getAttribute('data-flyr-deeplink');
        var offsiteMethod = null;
        if(scriptAttrs.modalMethod && scriptAttrs.modalMethod.toLowerCase() === 'window') {
          offsiteMethod = "toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width={width},height={height}".replace("{width}", window.innerWidth).replace("{height}", window.innerHeight);
          console.log("new window modal method");
        }
        window.open(url, '_blank', offsiteMethod);
      } else {
        openModal('farekeep', params);
      }
    }
  };

  var tripcashOnClick = function(button) {
    console.log('TC_DEEPLINK_URL:', button.getAttribute('data-flyr-deeplink'));
    var params = button.getAttribute('data-flyr-savings-id');
    if (params) {
      if (scriptAttrs.offsiteLink && scriptAttrs.offsiteLink.toLowerCase() === 'true') {
        var url = button.getAttribute('data-flyr-deeplink');
        var offsiteMethod = null;
        if(scriptAttrs.modalMethod && scriptAttrs.modalMethod.toLowerCase() === 'window') {
          offsiteMethod = "toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width={width},height={height}".replace("{width}", window.innerWidth).replace("{height}", window.innerHeight);
          console.log("new window modal method");
        }
        window.open(url, '_blank', offsiteMethod);
      } else {
        openModal('tripcash', params);
      }
    }
  }

  var foresightOnClick = function(button) {
    var params = parseButton(button);
    if (params) {
      if (scriptAttrs.offsiteLink && scriptAttrs.offsiteLink.toLowerCase() === 'true') {
        var url = createDeepLink(params, 'foresight');
        window.open(url, '_blank');
      } else {
        openModal('foresight', params);
      }
    }
  };

  // code to disable scrolling of background in desktop modal
  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  function scrollFix(e) {
    window.scrollTo(scrollPosition.x, scrollPosition.y);
  }
  function disableScroll() {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.addEventListener('MozMousePixelScroll', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.onwheel = preventDefault; // modern standard
    document.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
    if(window.innerWidth > mobileRez) {
      window.onscroll = scrollFix;
    }
  }
  function enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener('MozMousePixelScroll', preventDefault, false);

    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    document.ontouchmove = null;
    window.onscroll = null;
    document.onkeydown = null;
  }

  function resizeListener(e) {
    if(window.innerWidth > mobileRez && _modalOpen) {
      scrollFix();
    }
    messageToFrame("resize-event", {
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  var scrollPosition = {};
  var originalResizeListener;
  var openModal = function(type, params) {
    _modalOpen = true;
    var farekeepFrame = document.getElementById('flyr-farekeep-iframe');
    farekeepFrame.style.display = 'block';
    messageToFrame('modal-' + type, params);
    scrollPosition.y = window.pageYOffset;
    scrollPosition.x = window.pageXOffset;
    var html = document.querySelectorAll('html')[0];
    addClass(html, 'flyr-modal-open');
    farekeepFrame.style.top = window.pageYOffset + "px";
    farekeepFrame.style.left = window.pageXOffset + "px";
    disableScroll();
    originalResizeListener = window.onresize;
    resizeListener(null);
    window.onresize = resizeListener;
  };

  var closeModal = function() {
    _modalOpen = false;
    enableScroll();
    document.getElementById('flyr-farekeep-iframe').style.display = 'none';
    var html = document.querySelectorAll('html')[0];
    removeClass(html, 'flyr-modal-open');
    window.scrollTo(scrollPosition.x, scrollPosition.y);
    window.onresize = originalResizeListener;
  }

  var isFarekeepButton = function(button) {
    var className = button.className;
    if ((typeof className === "string") && (className.indexOf('farekeep-button') > -1)) {
      return true;
    }
    return false;
  };

  var isTripcashButton = function(button) {
    var className = button.className;
    if ((typeof className === "string") && (className.indexOf('tripcash-button') > -1)) {
      return true;
    }
    return false;
  };

  var isForesightButton = function(button) {
    var className = button.className;
    if ((typeof className === "string") && (className.indexOf('foresight-button') > -1)) {
      return true;
    }
    return false;
  };


  var modalListener = function(event) {
    var button = event.target || event.srcElement;
    if (isFarekeepButton(button)) {
      farekeepOnClick(button);
    } else if (isTripcashButton(button)) {
      tripcashOnClick(button);
    }
  };

  var climbToNode = function(element, target, stopper) {
    try {
      var node = element.parentNode;
      while(!hasClass(node, target)) {
        if(stopper && hasClass(node, stopper)) {
          return null;
        }
        node = node.parentNode;
      }
      return node;
    } catch(exception) {
      return null;
    }
  }

  var farekeepClickListener = function(event) {
    var button = event.currentTarget || climbToNode(event.srcElement, 'farekeep-button');
    farekeepOnClick(button);
  }

  var tripcashClickListener = function(event) {
    var button = event.currentTarget || climbToNode(event.srcElement, 'tripcash-button');
    tripcashOnClick(button);
  }

  var findParentContainer = function(button) {
    return climbToNode(button, 'farekeep-parent-container')
  };
  var hideElement = function(el) {
    if(_noFarekeepDisplay === "visibility:hidden") {
      el.style.visibility = "hidden";
    } else if (_noFarekeepDisplay === "display:none") {
      el.style.display = "none";
    } else if( /^class:/i.test(_noFarekeepDisplay) ) {
      var className = _noFarekeepDisplay.slice(_noFarekeepDisplay.indexOf(':') + 1);
      addClass(el, className);
    }
  };
  var showElement = function(el) {
    if(_noFarekeepDisplay === "visibility:hidden") {
      el.style.visibility = "visible";
    } else if (_noFarekeepDisplay === "display:none") {
      el.style.display = null;
    } else if( /^class:/i.test(_noFarekeepDisplay) ) {
      var className = _noFarekeepDisplay.slice(_noFarekeepDisplay.indexOf(':') + 1);
      removeClass(el, className);
    }
  };

  var handleUnpricedSavings = function ( button ) {
    var decoupledSavings = (scriptAttrs.decoupledSavings && scriptAttrs.decoupledSavings.toLowerCase() === 'true');
    removeClass(button, "tripcash-button");
    addClass(button, "tripcash-button-disabled");
    if (decoupledSavings) {
      var container = findParentContainer(button);
      var label = container.querySelectorAll('.tripcash-savings-label')[0];
      if (_unavailableMessage !== "" && _unavailableMessage !== null ) {
        var message = _unavailableMessage;
        setText(label, message);
        showElement(container);
      } else {
        hideElement(container);
      }
    } else {
      if (_unavailableMessage !== "" && _unavailableMessage !== null ) {
        var message = _unavailableMessage;
        setText(button, message);
        showElement(button);
      } else {
        hideElement(button);
      }
    }
  };

  var handleUnpricedPremium = function( button ) {
    var decoupledPremium = (scriptAttrs.decoupledPremium && scriptAttrs.decoupledPremium.toLowerCase() === 'true');
    removeClass(button, "farekeep-button");
    addClass(button, "farekeep-disabled-button");
    if (decoupledPremium) {
      var container = findParentContainer(button);
      var label = container.querySelectorAll('.farekeep-premium-label')[0];
      if (_unavailableMessage !== "" && _unavailableMessage !== null ) {
        var message = _unavailableMessage;
        setText(label, message);
        showElement(container);
      } else {
        hideElement(container);
      }
    } else {
      if (_unavailableMessage !== "" && _unavailableMessage !== null ) {
        var message = _unavailableMessage;
        setText(button, message);
        showElement(button);
      } else {
        hideElement(button);
      }
    }
  };

  var fillFarekeepPrices = function(prices, pricesLegacy, wording, currencyFormat) {
    if (prices === null || !_abSlice) { return null; }
    removeEventListener(window, 'click', modalListener, false);
    var buttons = document.querySelectorAll('.farekeep-button');
    var keys = Object.keys(prices);
    var decoupledPremium = (scriptAttrs.decoupledPremium && scriptAttrs.decoupledPremium.toLowerCase() === 'true');
    for (var i = 0; i < buttons.length; i++) {
      if (!buttons[i].getAttribute('data-flyr-price-acquired') && keys.indexOf(buttons[i].getAttribute('data-flyr-index')) > -1) {
        buttons[i].setAttribute('data-flyr-price-acquired', "true");
        var index = buttons[i].getAttribute('data-flyr-index');

        var premiumObj = prices[index];
        var premiumObjLegacy = pricesLegacy[index];

        var premium = premiumObjLegacy.premium;
        var expiry = premiumObjLegacy.expiry;

        if ( premiumObj.premium_id !== null && premiumObj.premium_id !== undefined ) {
          // if we can price farekeep on the flight
          if (!buttons[i].getAttribute('data-flyr-noaction') || buttons[i].getAttribute('data-flyr-noaction') !== "true") {
            addEventListener(buttons[i], 'click', farekeepClickListener, false);
          }
          buttons[i].setAttribute('data-flyr-deeplink', premiumObj.deep_link);
          buttons[i].setAttribute('data-flyr-premium-id', premiumObj.premium_id);
          var formattedCurrency = currencyFormat.replace('XX', premium); // TODO determine how this array works and how to display price
          if (decoupledPremium) {
            var container = findParentContainer(buttons[i]);
            var label = container.querySelectorAll('.farekeep-premium-label')[0];
            setText(label, formattedCurrency);
            showElement(container);
          } else {
            var text;
            if (scriptAttrs.buttonWording) {
              text = scriptAttrs.buttonWording.replace('{price}', formattedCurrency ).replace('{expiry}', expiry);
            } else {
              text = wording.replace('{price}', formattedCurrency ).replace('{expiry}', expiry);
            }
            setText(buttons[i], text);
            showElement(buttons[i]);
          }
        } else {
          // if we can NOT price farekeep for the flight
          handleUnpricedPremium(buttons[i]);
        }
      }
    }
  };

  var fillTripcashPrices = function(prices, pricesLegacy, wording, currencyFormat) {
    if (prices === null || !_abSlice) { return null; }
    removeEventListener(window, 'click', modalListener, false);
    var buttons = document.querySelectorAll('.tripcash-button');
    var keys = Object.keys(prices);
    var decoupledSavings = (scriptAttrs.decoupledSavings && scriptAttrs.decoupledSavings.toLowerCase() === 'true');
    for (var i = 0; i < buttons.length; i++) {
      if (!buttons[i].getAttribute('data-flyr-price-acquired') && keys.indexOf(buttons[i].getAttribute('data-flyr-index')) > -1) {
        buttons[i].setAttribute('data-flyr-price-acquired', "true");
        var index = buttons[i].getAttribute('data-flyr-index');

        var savingsObj = prices[index];
        var savingsObjLegacy = pricesLegacy[index];

        var savings = savingsObjLegacy.savings;

        if ( savingsObj.savings_id !== null && savingsObj.savings_id !== undefined ) {
          // TripCash savings on the flight is available
          if (!buttons[i].getAttribute('data-flyr-noaction') || buttons[i].getAttribute('data-flyr-noaction') !== "true") {
            addEventListener(buttons[i], 'click', tripcashClickListener, false);
          }
          buttons[i].setAttribute('data-flyr-deeplink', savingsObj.flyr_purchase_deeplink);
          buttons[i].setAttribute('data-flyr-savings-id', savingsObj.savings_id);
          var formattedCurrency = currencyFormat.replace('XX', Math.ceil(savings)); // TODO determine how this array works and how to display price
          if (decoupledSavings) {
            var container = findParentContainer(buttons[i]);
            var label = container.querySelectorAll('.tripcash-savings-label')[0];
            setText(label, formattedCurrency);
            showElement(container);
          } else {
            var text;
            if (scriptAttrs.savingsButtonWording) {
              text = scriptAttrs.savingsButtonWording.replace('{price}', formattedCurrency );
            } else {
              text = wording.replace('{price}', formattedCurrency );
            }
            setText(buttons[i], text);
            showElement(buttons[i]);
          }
        } else {
          // TripCash savings on the flight is not available
          handleUnpricedSavings(buttons[i]);
        }
      }
    }
  };

  var sendEvent = function(eventName, payload, alternateEndpoint) {
    alternateEndpoint = alternateEndpoint || false;
    messageToFrame('event', {eventName: eventName, payload: payload, alternateEndpoint: alternateEndpoint});
  };

  var callbackPrepFarekeepLegacy = function(premiums, range, currencyFormat) {
    if (premiums === null || !_abSlice) { return null; }
    var resultsObject = {};
    var transformedData = [];
    for (var i = range.first; i < range.last + 1; i++) {
      var flight = premiums[i];
      if (flight !== null && flight.premium !== null) {
        flight.premium_string = currencyFormat.replace('XX', flight.premium);
      } else if(flight !== null) {
        flight.premium_string = null;
      } else {
        flight = {
          "deep_link": "javascript:void(0);",
          "premium_id": null,
          "payout_cap_currency": null,
          "currency": null,
          "expiry": null,
          "payout_cap": null,
          "premium": null,
          "premium_string": null
        }
      }
      transformedData.push( flight );
    };
    resultsObject.premiums = transformedData;
    return resultsObject;
  };

  var callbackPrepFarekeep = function(premiums, premiumsSimple, currencyFormat) {
    if (premiums === null || !_abSlice) { return null; }
    var resultsObject = {};
    var keys = Object.keys(premiums);
    for (var i = 0; i < keys.length; i++) {
      if (premiumsSimple[keys[i]].premium !== null) {
        premiums[keys[i]].premium_string = currencyFormat.replace('XX', premiumsSimple[keys[i]].premium);
        premiums[keys[i]].premium = premiumsSimple[keys[i]].premium;
      }
    };
    return {premiums: premiums};
  };

  var callbackPrepTripcashLegacy = function(savings, range, currencyFormat) {
    if (savings === null || !_abSlice) { return null; }
    var resultsObject = {};
    var transformedData = [];
    for (var i = range.first; i < range.last + 1; i++) {
      var flight = savings[i];
      if (flight !== null && flight.savings !== null) {
        flight.savings_string = currencyFormat.replace('XX', Math.ceil(flight.savings));
      } else if(flight !== null) {
        flight.savings_string = null;
      } else {
        flight = {
          "available": false,
          "savings_id": null,
          "currency": null,
          "total_fare": null,
          "savings": null,
          "savings_string": null,
          "booking_window": null,
          "change_window": null,
          "flyr_purchase_deeplink": "javascript:void(0);"
        }
      }
      transformedData.push( flight );
    };
    resultsObject.savings = transformedData;
    return resultsObject;
  };


  var callbackPrepTripcash = function(savings, savingsSimple, currencyFormat) {
    if (savings === null || !_abSlice) { return null; }
    var resultsObject = {};
    var keys = Object.keys(savings);
    for (var i = 0; i < keys.length; i++) {
      if (premiumsSimple[keys[i]].premium !== null) {
        savings[keys[i]].savings_string = currencyFormat.replace('XX', savingsSimple[keys[i]].savings);
        savings[keys[i]].savings = savingsSimple[keys[i]].savings;
      }
    }
    return {savings: savings};
  };

  var callbackPrepForeSight = function(results, mapping) {
    var finalResults = [];
    var keys = Object.keys(mapping);
    for (var k in keys ) {
      if (mapping[k]) {
        finalResults.push(results[k]);
      } else {
        finalResults.push(null);
      }
    }
    return finalResults;
  };

  var _iFrameReady = false;
  var _premiumQueue = [];
  var _savingsQueue = [];
  var blurCallback = null;
  var messageListener = function (e) {
    if (e.data && typeof e.data == 'string' && (e.data.indexOf('flyrMessage') > -1)) {
      var messageObj = JSON.parse(e.data);
      var data = messageObj.data;
      switch(messageObj.flyrMessage) {
        case "modal-has-closed":
          closeModal();
          break;
        case "savings-return":
          var mapping;
          if (data.savings) {
            mapping = _resultMapping[data.request_id];
            delete _resultMapping[data.request_id];
          } else {
            mapping = _resultMapping[data.request_id];
            delete _resultMapping[data.request_id];
          }
          if (mapping.callback === null) {
            fillTripcashPrices(data.savings, data.savingsLegacy, data.wording, data.currencyFormat);
          } else {
            if(mapping.reference) {
              mapping.callback(callbackPrepTripcash(data.savings, data.savingsLegacy, data.currencyFormat));
            } else {
              mapping.callback(callbackPrepTripcashLegacy(data.savingsLegacy, mapping.range, data.currencyFormat));
            }
          }
          break;
        case "premiums-return":
          var mapping;
          if (data.premiums) {
            mapping = _resultMapping[data.request_id];
            delete _resultMapping[data.request_id];
          } else {
            mapping = _resultMapping[data.request_id];
            delete _resultMapping[data.request_id];
          }
          if (mapping.callback === null) {
            fillFarekeepPrices(data.premiums, data.premiumsLegacy, data.wording, data.currencyFormat);
          } else {
            if(mapping.reference) {
              mapping.callback(callbackPrepFarekeep(data.premiums, data.premiumsLegacy, data.currencyFormat));
            } else {
              mapping.callback(callbackPrepFarekeepLegacy(data.premiumsLegacy, mapping.range, data.currencyFormat));
            }
          }
          break;
        case "user-id-notification":
          _userId = data;
          break;
        case "iframe-ready":
          var partner_id = (scriptAttrs.partnerId) ? scriptAttrs.partnerId.toLowerCase() : null;
          var location = (scriptAttrs.placementLocation) ? scriptAttrs.placementLocation.toLowerCase() : null;
          var deeplink = (document.URL) ? document.URL : null;
          var referral_link = (document.referrer) ? document.referrer : null;
          sendEvent(
            "sdk_loaded", {
              "type": "page_load",
              "name": "sdk_loaded",
              "version": "v3",
              "configuration": {
                "partner_id": partner_id,
                "location": location
              },
              "properties": {
                "deeplink": deeplink,
                "referral_link": referral_link
              }
            }, "sdkloads/v3/");
          _iFrameReady = true;
          for (var i = 0; i < _premiumQueue.length; i ++) {
            Flyr.getPremiums(_premiumQueue[i].searchInfo, _premiumQueue[i].paramsList, _premiumQueue[i].callback);
          }
          for (var j = 0; j < _savingsQueue.length; j ++) {
            Flyr.getSavings(_savingsQueue[j].searchInfo, _savingsQueue[j].paramsList, _savingsQueue[j].callback);
          }
          break;
        case "applepay-check":
          if(scriptAttrs.allowStripe === "true" && window.Stripe) {
            window.Stripe.setPublishableKey(data.key);
            Stripe.applePay.checkAvailability(availabilityCheckHandler);
          }
          break;
        case "begin-applepay":
          var session = window.Stripe.applePay.buildSession(data.paymentRequest, finishApplePay, applePayError);
          session.begin();
          break;
        case "complete-applepay":
          applePayCompletion(data.success);
          break;
        case "inputBlur":
          if(window.innerWidth > mobileRez) {
            window.onscroll = scrollFix;
          }
          blurCallback = setTimeout(scrollFix, 500);
          break;
        case "inputFocus":
          clearTimeout(blurCallback);
          window.onscroll = null;
          break;
        case "device-id-ready":
          break;
        case "fk-purchase-complete":
          try {
            _fkPurchaseCallback(data);
          } catch (e) {
            if(_fkPurchaseCallback !== null) {
              console.error(e);
            }
          }
          break;
      }
    }
  };

  var messageToFrame = function(name, data) {
    if (farekeepWindow) {
      farekeepWindow.postMessage(JSON.stringify({flyrMessage: name, data: data, origin: document.location.origin}), origin);
    } else {
      console.log("The iframe is not yet ready");
    }
  };

  /////////////////////////////////////////////////////////
  /// ApplePay iFrame code
  ///

  var applePayCompletionCallback = null;
  function availabilityCheckHandler(available) {
    if(available) {
      messageToFrame('applepay-availability-return', true);
    }
  }

  function finishApplePay(result, completion) {
    applePayCompletionCallback =  completion,
    messageToFrame('applepay-token-return', {
      token: result.token.id
    });
  }

  function applePayError(error) {
    console.error(error.message);
  }

  function applePayCompletion(success) {
    if(success) {
      applePayCompletionCallback(ApplePaySession.STATUS_SUCCESS);
    } else {
      applePayCompletionCallback(ApplePaySession.STATUS_FAILURE)
    }
  }







  /////////////////////////////////////////////////////////
  /// Non-Private Methods Flyr namespaced
  ///

  Flyr.changeLanguage = function(lang) {
    messageToFrame('language-change', lang);
  };
  Flyr.closeModal = function() {
    closeModal();
    messageToFrame("modal-close", null);
  };

  var predictionIndex = 0;
  Flyr.getPredictions = function(flights, callback) {
    if (!callback) { console.log("Please include a callback method."); return null; }
    var mapping = {};
    var validFlights = [];
    var firstValidFound = false;
    mapping['callback'] = callback;
    for (var i in flights) {
      var flight = flights[i];
      if ( hasRequiredParams(flight, false) && validateParams(flight, false)) {
        if (!firstValidFound) {
          firstValidFound = true;
          _resultMapping["foresight" + predictionIndex] = mapping;
        }
        flight.index = predictionIndex;
        mapping[predictionIndex] = true;
        validFlights.push(flight);
      } else {
        mapping[predictionIndex] = false;
      }
      predictionIndex ++;
    }
    if (!firstValidFound) {
      // handle no valid flights
      callback(null);
      return null;
    }
    messageToFrame('predictions-request', {flights: validFlights});
  };

  Flyr.openModal = function(type, params) {
    type = type.toLowerCase();
    if (['foresight', 'farekeep', 'tripcash'].indexOf(type) < 0) {
      console.log('invalid modal type option');
      return null;
    }
    if (params) {
      openModal(type, params);
    }
  };

  var buttonIndex = 0;
  var _searchString = null;
  var _resultMapping = {};
  var _deapLinks = {};
  var _userId = null;

  var buildRequestFromFares = function( requestType, searchInfo, paramsList, callback ) {

    if (typeof requestType === 'undefined') {
      console.error("Request type was not provided. Could not gather valid flights to make request.");
      return null;
    }

    if (!_iFrameReady) {
      if (requestType === 'premiums-request') {
        _premiumQueue.push({searchInfo: searchInfo, paramsList: paramsList, callback: callback});
      } else if (requestType === 'savings-request') {
        _savingsQueue.push({searchInfo: searchInfo, paramsList: paramsList, callback: callback});
      }
      return null;
    }

    var paramsEntry;
    var firstValidFound = false;
    var validFlights = [];
    var request_id = generateUUID();
    var activeButtonClass;
    var disabledButtonClass;
    var queryString;
    _resultMapping[request_id] = {};

    // Premiums request with an undefined paramsList
    if (requestType === 'premiums-request' && paramsList === undefined) {
      activeButtonClass = 'farekeep-button';
      disabledButtonClass = 'farekeep-disabled-button';
      queryString = '.' + activeButtonClass;
      if (searchInfo.finalUpdate || searchInfo.final_update) {
        queryString = '.' + activeButtonClass + ', .' + disabledButtonClass;
      }
      var buttons = document.querySelectorAll(queryString);
      for (var i = 0; i < buttons.length; i++) {
        if ( (searchInfo.finalUpdate || searchInfo.final_update) || (!buttons[i].getAttribute('data-flyr-price-acquired') && buttons[i].getAttribute('data-flyr-index') === null) ) {
          addClass(buttons[i], activeButtonClass);
          removeClass(buttons[i], disabledButtonClass);
          try{
            paramsEntry = JSON.parse(buttons[i].getAttribute('data-flyr-obj'));
            paramsEntry.index = buttonIndex;
            if (!firstValidFound) {
              firstValidFound = true;
              _resultMapping[request_id].callback = null;
            }
            validFlights.push(paramsEntry);
            buttons[i].setAttribute('data-flyr-index', buttonIndex);
            buttons[i].removeAttribute('data-flyr-price-acquired');
            buttons[i].setAttribute('data-flyr-searchInfo', JSON.stringify(searchInfo));
            buttonIndex ++;
          } catch(e) {
            console.error("There was a problem with the json structure of one of the buttons.", e);
            handleUnpricedPremium(buttons[i]);
          }
        }
      }

    // Savings request with an undefined paramsList
    } else if (requestType === 'savings-request' && paramsList === undefined) {
      activeButtonClass = 'tripcash-button';
      disabledButtonClass = 'tripcash-button-disabled';
      queryString = '.' + activeButtonClass;
      if (searchInfo.finalUpdate || searchInfo.final_update) {
        queryString = '.' + activeButtonClass + ', .' + disabledButtonClass;
      }
      var buttons = document.querySelectorAll(queryString);

      for (var i = 0; i < buttons.length; i++) {
        if ( (searchInfo.finalUpdate || searchInfo.final_update) || (!buttons[i].getAttribute('data-flyr-price-acquired') && buttons[i].getAttribute('data-flyr-index') === null) ) {
          addClass(buttons[i], activeButtonClass);
          removeClass(buttons[i], disabledButtonClass);
          try{
            paramsEntry = JSON.parse(buttons[i].getAttribute('data-flyr-obj'));
            paramsEntry.index = buttonIndex;
            if (!firstValidFound) {
              firstValidFound = true;
              _resultMapping[request_id].callback = null;
            }
            validFlights.push(paramsEntry);
            buttons[i].setAttribute('data-flyr-index', buttonIndex);
            buttons[i].removeAttribute('data-flyr-price-acquired');
            buttons[i].setAttribute('data-flyr-searchInfo', JSON.stringify(searchInfo));
            buttonIndex ++;
          } catch(e) {
            console.error("There was a problem with the json structure of one of the buttons.", e);
            handleUnpricedSavings(buttons[i]);
          }
        }
      }

    // paramsList is provided in request, regardless of request type
    } else {
      // if paramsList is provided, must include a callback function
      if (!callback) { console.error("Please include a callback method."); return null; }
      for( var i in paramsList ) {
        paramsEntry = paramsList[i];

        if (true) { // TODO add some validation
          if (!firstValidFound) {
            firstValidFound = true;
            _resultMapping[request_id].callback = callback;
            if (paramsEntry.reference) {
              _resultMapping[request_id].reference = true;
            } else {
              _resultMapping[request_id].reference = false;
              _resultMapping[request_id].range = {first: buttonIndex};
            }
          }
          validFlights.push(paramsEntry);
        } else {
        }

        if (paramsEntry.reference && _resultMapping[request_id].reference === true) {
          paramsEntry.index = paramsEntry.reference;
        } else if(!paramsEntry.reference && _resultMapping[request_id].reference === false) {
          paramsEntry.index = buttonIndex;
          buttonIndex ++;
        } else {
          callback(null);
          console.error("The reference attribute must be supplied to all or no entries.")
          return null;
        }

      }
      if(!_resultMapping[request_id].reference) {
        _resultMapping[request_id].range.last = buttonIndex -1;
      }
    }

    if (validFlights.length === 0) {
      // handle no valid flights
      if (callback) {
        callback(null);
      }
      return null;
    }

    messageToFrame(requestType, {flights: validFlights, searchInfo: searchInfo, request_id: request_id});
  };

  Flyr.getPremiums = function( searchInfo, paramsList, callback ) {
    buildRequestFromFares( 'premiums-request', searchInfo, paramsList, callback );
  };

  Flyr.getSavings = function( searchInfo, paramsList, callback ) {
    buildRequestFromFares( 'savings-request', searchInfo, paramsList, callback );
  }

  Flyr.setUnsupportedFKBehavior = function(behavior) {
    _noFarekeepDisplay = behavior;
  };

  Flyr.setUnsupportedFKMessage = function(message) {
    _unavailableMessage = message;
  };

  Flyr.reportBooking = function(flight) {
    sendEvent('get_books', flight);
  };

  Flyr.setOffsiteLinking = function(bool) {
    scriptAttrs.offsiteLink = bool;
  }

  _fkPurchaseCallback = null;
  Flyr.setFKPurchaseCallback = function(callback) {
    _fkPurchaseCallback = callback;
  }

  /////////////////////////////////////////////////////////
  /// Setting up the iFrame
  ///

  addEventListener(window, 'message', messageListener, false);
  addEventListener(window, 'click', modalListener, false);
  addEventListener(window, 'resize', resizeListener, false);

  var script = document.querySelector('script[data-flyr="Library"]');
  if (!script) {
    console.log('data-flyr="Library" missing on Flyr script tag');
    return;
  }
  var scriptAttrs = objectFromAttrs(script);
  if (!scriptAttrs.apiKey) {
    console.log('Please attach data-flyr-api-key to the Flyr script tag');
    return;
  }
  var _unavailableMessage = scriptAttrs.unavailableMessage || null;
  var _noFarekeepDisplay = scriptAttrs.hiddenBehavior || "visibility:hidden";
  scriptAttrs.parentDomain = document.location.origin;
  var html = '<iframe id="flyr-farekeep-iframe" frameborder="0"';
  html += 'allowtransparency="true" src="{url}"';
  html += '></iframe>';
  var domain = script.src;
  var version = domain.slice(domain.indexOf('js/flyr') + 7, -3);
  domain = domain.slice(0, domain.indexOf('js/flyr'));
  var env = "prod";
  if (scriptAttrs.env) {
    env = scriptAttrs.env;
  } else if (scriptAttrs.devAddress) {
    if (scriptAttrs.devAddress === 'dev') {
      env = 'dev';
    } else {
      env = scriptAttrs.devAddress
    }
  } else if (scriptAttrs.staging) {
    env = 'staging';
  } else if (scriptAttrs.sandbox) {
    env = 'sandbox';
  }
  html = html.replace('{url}',  domain +  '#/?iframe=true&apiKey=' + scriptAttrs.apiKey + '&env=' + env + '&origin=' + document.location.origin);
  // html = html.replace('{url}', 'https://js.fareprotection.com/index.html?iframe=true&apiKey=' + scriptAttrs.apiKey + '&whiteLabel=' + scriptAttrs.whiteLabel);
  var origin = domain;
  // var origin = 'https://js.fareprotection.com/';

  var styleLink = "<link id='style-tag' rel='stylesheet' type='text/css' href='" + domain + "css/flyr-modal-helper.css'>";


  var _modalOpen = false;

  var _abSlice = true;
  var _slicePercent = 10;
  var _needsTracking = false;


  var farekeepWindow = null;

  // This is for tasks that are to be performed when the partner page dom is loaded
  function afterReadyTasks() {
    if(!document.body) {
      window.setTimeout(function() { ready(afterReadyTasks); }, 100);
      return null;
    }

    // add stripe library to partner site if allowed this doesnt work
    // if(scriptAttrs.allowStripe === "true") {
    //   var stripeScriptTag = '<script type="text/javascript" src="https://js.stripe.com/v2/"></script>';
    //   appendHtml(document.head, stripeScriptTag);
    // }

    // append the iframe
    appendHtml(document.head, styleLink);
    appendHtml(document.body, html);
    farekeepWindow = document.getElementById('flyr-farekeep-iframe').contentWindow;

  }

  function ready(fn) {
    if (document.readyState !== 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(afterReadyTasks);

}).call(this);
