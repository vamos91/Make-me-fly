var _travDL = (function() {

	var debug = false;

	function init() {
		document.onreadystatechange = function() {

			if (typeof window.postMessage !== 'function') {
				return;
			}

			if (this.readyState === 'complete') {
				if (srv.outer_modal) {
					//outer
					log('init outer');
					outerEvents();
					//outerPM();
				} else {
					//inner
					log('init inner');
					initChildPM();
					modalOpened();
					innerEvents();
					//query datalayer
					postToOuter(false,'_travDL.queryDL');
				}
			}
		};
	}

	function outerEvents() {
		jQuery('#surveyMask').on('click', function() {
			var x = modalClosed();
			handleData(x);
		});
	}

	function innerEvents() {
		jQuery('#surveySubmitBtn').on('click', function() {
			var $btn = jQuery(this);
			setTimeout(function() {
				if ($btn.hasClass('is-submitting')) {
					var x = collectContent();
					postToOuter(x);
					submitData();
				}
			});
		});

		jQuery('#closeModalBtn').on('click', function() {
			var x = modalClosed();
			postToOuter(x);
		});
	}

	function collectContent() {

		var $content = jQuery('#surveyContent'),
			$questions = $content.find('.question'),
			q_str = 'mopinion_Q',
			a_str = 'mopinion_A',
			data = {
				event:'mopinion_answer',
				mopinion_formname: survey_properties ? survey_properties.name : '',
			};

		$questions.each(function(i,element) {

			var number = i + 1,
				$block = jQuery(element);

			var question = $block.find('.block-title').text();
			var answer = '';

			$block.find('input[type="text"],input[type="email"],input[type="phone"],input[type="number"],input[type="hidden"],select,textarea').each(function(l,input) {
				var val = jQuery(this).val();

				if (typeof val !== 'string') {
					try {
						val = JSON.stringify(val);
					} catch(e) {}
				}

				if (l !== 0 && val) {
					answer += ', '+val;
				} else {
					answer += val;
				}
			});

			data[q_str + number] = question;
			data[a_str + number] = answer;
		});

		return JSON.stringify(data);
	}

	function modalOpened() {
		var data = {
			'event': 'mopinion_survey', 
			'mopinion_survey': 'Mopinion survey', 
			'mopinion_formname': survey_properties ? survey_properties.name : '', 
			'mopinion_action': 'opened'
		};
		log('Posting open data'); 
		postToOuter(data);
	}

	function modalClosed() {
		var data = {
			'event': 'mopinion_survey', 
			'mopinion_survey': 'Mopinion survey', 
			'mopinion_formname': survey_properties ? survey_properties.name : '', 
			'mopinion_action': 'closed'
		};

		return data;
	}

	function submitData() {
		var data = {
			'event': 'mopinion_survey', 
			'mopinion_survey': 'Mopinion survey', 
			'mopinion_formname': survey_properties ? survey_properties.name : '', 
			'mopinion_action': 'submitted'
		};
		log('Posting submit data'); 
		postToOuter(data);
	}

	function postToOuter(x,fn) {
		if (!x) x = '{}';
		if (typeof x !== 'string') {
			x = JSON.stringify(x);
		}
		if (!fn) {
			var call = '_travDL.handle='+x;
		} else {
			var call = fn+'='+x;
		}
		log(call);
		srv.callParentWindow(call, srv.getParameterByName('parent', document.location.href));
	}

	function handleData(s) {
		if (typeof s !== 'object') {
			try {
				s = JSON.parse(s);
			} catch(e) {}
		}
		if (typeof dataLayer !== 'undefined') {
			log('Data pushed');
			log(s);
			dataLayer.push(s);
		}	
	}

	/** **/
	function initChildPM() {
		var messenger = function(e) {

            if (typeof event.data === 'string') {

                try {
                    var parsed = JSON.parse(event.data);
                    if (parsed.type === 'datalayer_object') {
                    	setDataLayerValues(parsed.datalayer);
                    }
                } catch (e) {
                }
            }

        };
        if (typeof window.addEventListener !== 'undefined') {
            window.addEventListener('message', messenger, false);
        } else {
            // Support for ie8
            window.attachEvent('onmessage', messenger);
        }
	}

	function getDataLayerValues() {
		var data = {
			type:'datalayer_object',
			datalayer: {
				air_code:'',
				air_name:'',
				booking_class:'',
				cabin_class:'',
				channel:'',
				cmp:'',
				cost:'',
				country:'',
				customer_id:'',
				dep_airport:'',
				dep_city:'',
				dep_date:'',
				departure_date_weekday:'',
				departure_year_month:'',
				dest_airport:'',
				dest_city:'',
				ecmp:'',
				event:'',
				fare_price:'',
				fare_type:'',
				fare_upsell:'',
				from_price:'',
				'gtm.uniqueEventId':'',
				inwardflight_departure_date:'',
				inwardflight_destination_location:'',
				inwardflight_origin_location:'',
				is_logged_in:'',
				is_meta_direct:'',
				is_upsell_direct:'',
				itinerary_search:'',
				lead_time:'',
				length_of_stay:'',
				logged_in_ts:'',
				no_adults:'',
				no_children:'',
				no_infants:'',
				order_date:'',
				order_year_month:'',
				package_type:'',
				page_name:'',
				page_sub_type:'',
				page_type:'',
				product_price:'',
				product_quantity:'',
				ret_date:'',
				return_date_weekday:'',
				return_year_month:'',
				route:'',
				screen_size:'',
				search_route:'',
				single_return:'',
				site_language:'',
				site_version:'',
				skyscanner_redirectid:'',
				sub_channel:'',
				total_pax:'',
				trip_type:'',
				use_upsell_options:'',
				user_agent:'',
				user_id:'',
			}
		};

		if (typeof dataLayer !== 'undefined') {
			jQuery.each(dataLayer, function(i,obj) {
				jQuery.each(obj, function(key,val) {
					if (data.datalayer.hasOwnProperty(key)) {	
						data.datalayer[key] = val;
					}
				});
			});
			postToFrame(data);
		}
	}

	function postToFrame(data) {
		if (typeof data !== 'string') {
			try {
				data = JSON.stringify(data);
			} catch(e) {}
		}
	    var child_frame = document.querySelector('#surveyWindow');
	    child_frame.contentWindow.postMessage(data,child_frame.getAttribute('src'));
	}

	function setDataLayerValues(s) {
		if (!s) s = '';
		if (typeof s !== 'string') {
			try {
				s = JSON.stringify(s);
			} catch(e) {}
		}
		if (jQuery('[placeholder=datalayer_object]').length) {
			jQuery('[placeholder=datalayer_object]').val(s);
		}

		var extra = ['cabin_class','dep_airport','dep_city','dest_airport','dest_city','fare_price','fare_type','is_logged_in','is_meta_direct','lead_time','length_of_stay','page_type','screen_size','single_return','total_pax'];
		var s_obj = {};

		try {
			s_obj = JSON.parse(s);
		} catch(e) {}

		jQuery.each(extra, function(i,data_var) {
			if (jQuery('[placeholder='+data_var+']').length && s_obj.hasOwnProperty(data_var)) {
				jQuery('[placeholder='+data_var+']').val(s_obj[data_var]);
			}
		});
	}

	function log(s) {
		try {
			if (debug) console.log(s)
		} catch(e) {}
	}

	return {
		init:init,
		handle:handleData,
		queryDL:getDataLayerValues
	}
}());

_travDL.init();