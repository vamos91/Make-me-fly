var MformExtra = (function(){

	var debug 				= false;
	var JQ 					= srv.jQuery;
	var thankscount 		= 0;
	var brandurl;
	var brandname;
	var language;
	var emailscore;
	var thanksheadertxt;
	var thanksplaintxt;
	var customerservice;
	var url = document.location.href;
	var errorSet = false;

	//vars for reinit selectbox
	var dropHeader;
	var	dropPlaceholder;
	var	drop1;
	var	drop2;
	var	drop3;
	var	drop4;
	var	drop5;

	log('start loading language and brand');

	function init(){
		//add Classes
		addClasses();

		//set brand and language
		setBrand();

		//translate form
		Mtranslate();

		addCss();

		//initialize form clickevents
		general();

		log('selected brand name: ' + brandname);
		log('selected brand url: ' + brandurl);
		log('selected language: ' + language);

		JQ('#surveySubmitBtn').mousedown(function(){
			errorSet = false;
			log('start setting thanksheader');
			thanksheader();
			thankscount = 0;
		});
		JQ('#surveySubmitBtn').mouseup(function(){
			errorSet = false;
		});
	}

	function addClasses(){
		var Ma = 0;
	    JQ('.control-group').each(function(){
	        JQ(this).addClass('block'+Ma);
	        Ma++;
	    });

	    var Mb = 0;
	    JQ('.section-title').each(function(){
	        JQ(this).addClass('title'+Mb);
	        Mb++;
	    });

	    var Mc = 0;
	    JQ('.block-title').each(function(){
	        JQ(this).addClass('title'+Mc);
	        Mc++;
	    });

	    var Md = 0;
	    JQ('.section-description').each(function(){
	        JQ(this).addClass('title'+Md);
	        Md++;
	    });
	}

	function Mtranslate(){

		log('function Mtranslate');

		if(language != '' && typeof language != 'undefined'){
			Mlanguage = 'https://travix.mopinion.com/survey/travix/websiteforms/language/'+language+'.json';
		}else{
			Mlanguage = 'https://travix.mopinion.com/survey/travix/websiteforms/language/en.json';
		}

		//LOAD LANGUAGE
	    JQ.getJSON(Mlanguage, function(Mlang) {

	    	//Translates with dynamic brand
	    	var trans = {
	    		headertitle:Mlang.header.headertitle,
	    		q2title:Mlang.q2.headertitle
	    	}

	    	jQuery.each(trans, function(key,value) {
				var Jtext = trans[key];
				Jtext = Jtext.replace('{brand name}', brandname);
				trans[key] = Jtext;
			});

	        //Header
	       	JQ("#surveyHead #surveyTitle h1").text(trans.headertitle);
	       	
	       	//question1
	       	JQ("#surveyContent .control-group:nth-child(1) legend").text(Mlang.q1.headertitle);
	       	JQ("#surveyContent .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(1) label").text(Mlang.q1.yes);
	       	JQ("#surveyContent .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(2) label").text(Mlang.q1.partly);
	       	JQ("#surveyContent .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(3) label").text(Mlang.q1.no);

	       	//question2
	       	JQ("#surveyContent .control-group:nth-child(2) legend").text(trans.q2title);
	       	JQ("#surveyContent .control-group:nth-child(2) .nice-select .current").text(Mlang.q2.placeholder);
	       	JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(1)").text(Mlang.q2.placeholder);
			JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(2)").text(Mlang.q2.option1);
			JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(3)").text(Mlang.q2.option2);
			JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(4)").text(Mlang.q2.option3);
			JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(5)").text(Mlang.q2.option4);
			JQ("#surveyContent .control-group:nth-child(2) .nice-select ul.list li:nth-child(6)").text(Mlang.q2.option5);

	       	//question3
	       	JQ("#surveyContent .control-group:nth-child(3) legend").text(Mlang.q3.headertitle);
	       	JQ("#surveyContent .control-group:nth-child(3) .nice-select .current").text(Mlang.q3.placeholder);
	       	JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(1)").text(Mlang.q3.placeholder);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(2)").text(Mlang.q3.option1);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(3)").text(Mlang.q3.option2);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(4)").text(Mlang.q3.option3);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(5)").text(Mlang.q3.option4);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(6)").text(Mlang.q3.option5);

			dropHeader = Mlang.q3.headertitle
			dropPlaceholder = Mlang.q3.placeholder;
			drop1 = Mlang.q3.option1
			drop2 = Mlang.q3.option2
			drop3 = Mlang.q3.option3
			drop4 = Mlang.q3.option4
			drop5 = Mlang.q3.option5

	       	//question4
	       	JQ("#surveyContent .control-group:nth-child(4) legend").text(Mlang.q4.headertitle);

	       	//question5
	       	JQ("#surveyContent .control-group:nth-child(5) legend").text(Mlang.q5.headertitle);

	       	//customer service message
	       	JQ("#surveyContent .control-group:nth-child(6)").html(Mlang.customerservice);
	       	//set url
	      	JQ("#surveyContent .control-group:nth-child(6) a").attr('href', brandurl);

	      	JQ("#surveyContent #surveySubmitBtn").text(Mlang.submit);

	        //Errormessage
	        error_message = Mlang.errormessage.veld_is_verplicht;
	        //Thanks
	        thanksheadertxt = Mlang.thanks.headertitle;
	        thanksplaintxt = Mlang.thanks.plain;

	    });
	}

	function thanksheader(){
		
		setTimeout(function(){
			if(JQ('#lastPage').is(':visible')){
				log('set last page extra text');
				JQ("#surveyHead #surveyTitle h1").text(thanksheadertxt);
				JQ("#surveyContent #lastPage").html('<div class="completed-anim do-anim">'+
													'<i class="fa fa-check"></i>'+
												'</div>'+thanksplaintxt);
	        }else if(thankscount < 250){
	        	thankscount++;
	        	thanksheader();
	        	log('last page not yet visible');
	        	if(errorSet == false && JQ(".alert.alert-danger").length > 0){
	        		log(JQ(".alert.alert-danger").text());
	        		log('set errormessage');
	        		JQ(".alert.alert-danger").text(error_message);
	        		errorSet = true;	
	        	}
	        }else{
	        	log('count finished');
	        }
		},50);	
	}

	function reinitDropDown(){
		JQ("#surveyContent .control-group:nth-child(3) legend").text(dropHeader);
		if(JQ('#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(1)').attr('data-value') ==''){
			JQ("#surveyContent .control-group:nth-child(3) .nice-select .current").text(dropPlaceholder);
	       	JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(1)").text(dropPlaceholder);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(2)").text(drop1);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(3)").text(drop2);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(4)").text(drop3);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(5)").text(drop4);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(6)").text(drop5);
		}else{
			JQ("#surveyContent .control-group:nth-child(3) .nice-select .current").text(dropPlaceholder);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(1)").text(drop1);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(2)").text(drop2);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(3)").text(drop3);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(4)").text(drop4);
			JQ("#surveyContent .control-group:nth-child(3) .nice-select ul.list li:nth-child(5)").text(drop5);
		}
       	
	}

	function setBrand(){

		var referrer = document.referrer;

		// TESTPAGINA 
		if(referrer.match(/survey\/travix\/websiteforms\/testpage/ig) !== null){
			brandname 	= getUrlParameter('brand');
			brandurl 	= getUrlParameter('brandurl');
			language 	= getUrlParameter('language');
		}
		// CHEAPTICKETS
		else if(referrer.match(/cheaptickets/ig) !== null){
			brandname 	= 'CheapTickets';
			// NL
			if(referrer.match(/cheaptickets.nl\/en/ig) !== null ){
				brandurl	= 'https://www.cheaptickets.nl/en/customer-service';
				language 	= 'en';
			}
			else if(referrer.match(/cheaptickets.nl/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.nl/klantenservice';
				language 	= 'nl';
			}
			// BE
			else if(referrer.match(/cheaptickets.be\/fr/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.be/fr/service-client';
				language 	= 'fr';		
			}
			else if(referrer.match(/cheaptickets.be/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.be/klantenservice';
				language 	= 'nl';
			}
			// DE
			else if(referrer.match(/cheaptickets.de/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.de/kundenservice';
				language 	= 'de';
			}
			// TH
			else if(referrer.match(/cheaptickets.co.th\/en/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.co.th/en/customer-service';
				language 	= 'en';
			}
			else if(referrer.match(/cheaptickets.co.th/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.co.th/customer-service';
				language 	= 'th';
			}
			// HK
			else if(referrer.match(/cheaptickets.hk\/en/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.hk/en/customer-service';
				language 	= 'en';
			}
			else if(referrer.match(/cheaptickets.hk/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.hk/customer-service';
				language 	= 'zh';
			}
			// CH
			else if(referrer.match(/cheaptickets.ch\/fr/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.ch/fr/service-client';
				language 	= 'fr';
			}
			else if(referrer.match(/cheaptickets.ch\/en/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.ch/en/customer-service';
				language 	= 'en';
			}
			else if(referrer.match(/cheaptickets.ch/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.ch/kundenservice';
				language 	= 'de';
			}
			// SG
			else if(referrer.match(/cheaptickets.sg/ig) !== null ){
				brandurl 	= 'https://www.cheaptickets.sg/customer-service';
				language 	= 'en';
			}
			//fallback
			else{
				brandurl 	= 'https://www.cheaptickets.nl/en/customer-service';
				language 	= 'en';
			}
		}
		// VAYAMA 
		else if(referrer.match(/vayama/ig) !== null){
			brandname 	= 'Vayama';
			// IE
			if(referrer.match(/vayama.ie/ig) !== null ){
				brandname = 'vayama2'; // vayama.ie has Style of flugladen! ..so, overwrite style
				brandurl = 'https://www.vayama.ie/customer-service';
				language = 'en';
			}
			else if(url.match(/vayama.com\/es_ar/ig) !== null ){
				brandurl = 'https://www.vayama.com/es_ar/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			else if(url.match(/vayama.com\/es_cl/ig) !== null ){
				brandurl = 'https://www.vayama.com/es_cl/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			else if(url.match(/vayama.com\/es_co/ig) !== null ){
				brandurl = 'https://www.vayama.com/es_co/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			else if(url.match(/vayama.com\/es_mx/ig) !== null ){
				brandurl = 'https://www.vayama.com/es_mx/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			else if(url.match(/vayama.com\/es_pa/ig) !== null ){
				brandurl = 'https://www.vayama.com/es_pa/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			// COM
			else if(url.match(/vayama.com/ig) !== null ){
				brandurl = 'https://www.vayama.com/customer-service';
				language = 'en';
			}
			//fallback
			else{
				brandurl = 'https://www.vayama.com/customer-service';
				language = 'en';
			}
		}
		// BUDGETAIR 
		else if(referrer.match(/budgetair/ig) !== null){
			brandname 	= 'BudgetAir';
			// NL
			if(url.match(/budgetair.nl/ig) !== null){
				brandurl = 'https://www.budgetair.nl/klantenservice';
				language = 'nl';
			}
			// BE
			else if(referrer.match(/budgetair.be\/fr/ig) !== null){
				brandurl = 'https://www.budgetair.be/fr/service-client';
				language = 'fr';
			}
			else if(referrer.match(/budgetair.be/ig) !== null){
				brandurl = 'https://www.budgetair.be/klantenservice';
				language = 'nl';
			}
			// DK
			else if(referrer.match(/budgetair.dk\/en/ig) !== null){
				brandurl = 'https://www.budgetair.dk/en/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.dk/ig) !== null){
				brandurl = 'https://www.budgetair.dk/kundeservice';
				language = 'dk';
			}
			// CO UK
			else if(referrer.match(/budgetair.co.uk/ig) !== null){
				brandurl = 'https://www.budgetair.co.uk/customer-service';
				language = 'en';
			}
			// FR
			else if(referrer.match(/budgetair.fr/ig) !== null){
				brandurl = 'https://www.budgetair.fr/service-client';
				language = 'fr';
			}
			// IT
			else if(referrer.match(/budgetair.it/ig) !== null){
				brandurl = 'https://www.budgetair.it/servizio-clienti';
				language = 'it';
			}
			// LV
			else if(referrer.match(/budgetair.lv/ig) !== null){
				brandurl = 'https://www.budgetair.lv/customer-service';
				language = 'en';
			}
			// PT
			else if(referrer.match(/budgetair.pt/ig) !== null){
				brandurl = 'https://www.budgetair.pt/atendimento-ao-cliente';
				language = 'pt';
			}
			// ES
			else if(referrer.match(/budgetair.es/ig) !== null){
				brandurl = 'https://www.budgetair.es/servicio-de-atencion-al-cliente';
				language = 'es';
			}
			// SE
			else if(referrer.match(/budgetair.se\/en/ig) !== null){
				brandurl = 'https://www.budgetair.se/en/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.se/ig) !== null){
				brandurl = 'https://www.budgetair.se/kundservice';
				language = 'se';
			}
			// IN
			else if(referrer.match(/budgetair.in/ig) !== null){
				brandurl = 'https://www.budgetair.in/customer-service';
				language = 'en';
			}
			// COM AU
			else if(referrer.match(/budgetair.com.au/ig) !== null){
				brandurl = 'https://www.budgetair.com.au/customer-service';
				language = 'en';
			}
			// COM TW
			else if(referrer.match(/budgetair.com.tw\/en/ig) !== null){
				brandurl = 'https://www.budgetair.com.tw/en/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com.tw/ig) !== null){
				brandurl = 'https://www.budgetair.com.tw/customer-service';
				language = 'zh';
			}
			else if(referrer.match(/budgetair.com\/en_ae/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_ae/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_ca/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_ca/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_nz/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_nz/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_ph/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_ph/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_sa/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_sa/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_za/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_za/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/en_my/ig) !== null){
				brandurl = 'https://www.budgetair.com/en_my/customer-service';
				language = 'en';
			}
			else if(referrer.match(/budgetair.com\/ko_kr/ig) !== null){
				brandurl = 'https://www.budgetair.com/ko_kr/customer-service';
				language = 'kr';
			}
			else if(referrer.match(/budgetair.com\/pl_pl/ig) !== null){
				brandurl = 'https://www.budgetair.com/pl_pl/obsluga-klienta';
				language = 'pl';
			}
			else if(referrer.match(/budgetair.com\/tr_tr/ig) !== null){
				brandurl = 'https://www.budgetair.com/tr_tr/musteri-hizmetleri';
				language = 'tr';
			}
			else if(referrer.match(/budgetair.com\/id_id/ig) !== null){
				brandurl = 'https://www.budgetair.com/id_id/layanan-pelanggan';
				language = 'id';
			}
			// COM
			else if(referrer.match(/budgetair.com/ig) !== null){
				brandurl = '#';
				language = 'en';
			}
			else if(referrer.match(/budgetair.co.uk/ig) !== null){
				brandurl = 'https://www.budgetair.co.uk/customer-service';
				language = 'en';
			}
			//fallback
			else{
				brandurl = 'https://www.budgetair.co.uk/customer-service';
				language = 'en';
			}
		}
		// FLUGLADEN 
		else if(referrer.match(/flugladen/ig) !== null){
			brandname 	= 'Flugladen';
			if(referrer.match(/flugladen.de/ig) !== null ){
				brandurl 	= 'https://www.flugladen.de/kundenservice';
				language 	= 'de';
			}
			else if(referrer.match(/flugladen.at\/en/ig) !== null ){
				brandurl 	= 'https://www.flugladen.at/en/customer-service';
				language 	= 'en';
			}
			else if(referrer.match(/flugladen.at/ig) !== null ){
				brandurl 	= 'https://www.flugladen.de/kundenservice';
				language 	= 'de';
			}
			//fallback
			else{
				brandurl 	= 'https://www.flugladen.at/en/customer-service';
				language 	= 'en';
			}
		}
		// VLIEGWINKEL 
		else if(referrer.match(/vliegwinkel/ig) !== null){
			brandname 	= 'Vliegwinkel';
			if(url.match(/vliegwinkel.nl/ig) !== null ){
				brandurl = 'https://www.vliegwinkel.nl/klantenservice';
				language = 'nl';
			}
			//fallback
			else{
				brandurl = 'https://www.vliegwinkel.nl/klantenservice';
				language = 'nl';
			}
		}
	}

	function addCss(){
		var link = brandname.toLowerCase();
		JQ('body').append('<link rel="stylesheet" href="//travix.mopinion.com/survey/travix/websiteforms/css/'+link+'.mopinion.css" type="text/css">');
	}

	function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(document.referrer);
	    var sPageURLpart = sPageURL.split('?');
	    var sURLVariables = sPageURLpart[1].split('&');
	    var sParameterName;
	    var i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};

	function general(){

		JQ("#surveyContent .control-group:nth-child(1) .button-container .gcr-wrapper").click(function(){
				reinitDropDown();
		});
	}

	function log(s) {
		try {
			if (debug) console.log(s)
		} catch(e) {}
	}

	var Mobject = {}

	Mobject.init = init;
	Mobject.Mtranslate = Mtranslate;
	Mobject.reinitDropDown = reinitDropDown;


	return Mobject;

}());

var MformOutside = (function(){

	var JQ = srv.jQuery;
	var debug = false;

	var url = document.location.href;
	var bottomDisclaimer = JQ('.disclaimer__description');
	var Mcounter = 0;
	var checkBtn = 0;
	var passiveBtn = JQ('#surveyContent .btn-open-survey.btn.btn-primary');

	function init(){
		log('init feedbackbutton');
		
		//set new z-index
		checkZindex();

		//add style of brand to button
		checkBtnClass();
	}

	function checkBtnClass(){
		if(JQ('#surveyContent .btn-open-survey.btn.btn-primary').length > 0){
			log('add button class');
			addBtnClass();
		}else if(checkBtn < 100){
			log('passive button length: ' + passiveBtn.length)
			setTimeout(function(){
				checkBtnClass();
				log('check btn again');
				checkBtn++;
			},500);
		}else{
			log('checkBtn count: ' + checkBtn);
			log('surveyContent btn timeOut');
		}
	}

	function addBtnClass(){
		if(url.match(/cheaptickets/ig) !== null){
			log('add CheapTickets class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('cheaptickets');
		}
		else if(url.match(/flugladen/ig) !== null){
			log('add Flugladen class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('flugladen');
		}
		else if(url.match(/vliegwinkel/ig) !== null){
			log('add Vliegwinkel class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('vliegwinkel');
		}
		else if(url.match(/vayama\.ie/ig) !== null){/* Vayama ie has budgetair style */
			log('add Budgetair-vliegwinkel class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('budgetair');
		}
		else if(url.match(/vayama/ig) !== null){
			log('add Vayama class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('vayama');
		}
		else if(url.match(/budgetair/ig) !== null){
			log('add Budgetair class');
			JQ('.btn-open-survey.btn.btn-primary').addClass('budgetair');
		}else{
			log('no url brand detected');
		}

		if(JQ('.btn-open-survey.btn.btn-primary').hasClass('tab-right')){
			JQ(this).removeClass('tab-right').addClass('tab-bottom-right');
		}
		setTimeout(function(){
			log('fade in button');
			passiveBtn.show();
		},1000);

		//LOAD CSS BUTTONPOSITION
		if( url.match(/vluchtresultaten/ig) !== null || 
			url.match(/flightresults/ig) !== null || 
			url.match(/checkout/ig) !== null
		){
			checkElement();
		}

		if( url.match(/klantenservice/ig)!== null || 
			url.match(/en\/customer-service/ig)!== null ){
			JQ('#surveyContent').css('z-index','3');
		}

	}

	function checkElement(){
		setTimeout(function(){
			log('CHECK ELEMENT:passiveBtn.length: ' + JQ('#surveyContent .btn-open-survey.btn.btn-primary').length);
			log('CHECK ELEMENT:bottomDisclaimer.length: ' + bottomDisclaimer.length);
			if(bottomDisclaimer.length > 0 && Mcounter < 50 && JQ('#surveyContent .btn-open-survey.btn.btn-primary').length > 0){
				resetButtonPosition();	
			}
			else if(bottomDisclaimer.length > 0 && Mcounter < 50 && JQ('#surveyContent .btn-open-survey.btn.btn-primary').is(":visible")){
				resetButtonPosition();
			}
			else if(bottomDisclaimer.length >= 0 && Mcounter < 50){
				checkElement();
				Mcounter++;
			}else{
				log('stop checking element');
			}
		},100);
	}

	function checkZindex(){
		setTimeout(function(){
			log('CHECK Z-INDEX:passiveBtn.length: ' + JQ('#surveyContent .btn-open-survey.btn.btn-primary').length);
			log('CHECK Z-INDEX:bottomDisclaimer.length: ' + bottomDisclaimer.length);
			if(JQ('#surveyContent .btn-open-survey.btn.btn-primary').length > 0 && Mcounter < 50 && JQ('#surveyContent .btn-open-survey.btn.btn-primary').length > 0){
				setZindex();
			}
			else if(JQ('#surveyContent .btn-open-survey.btn.btn-primary').length > 0 && Mcounter < 50 && JQ('#surveyContent .btn-open-survey.btn.btn-primary').is(':visible')){
				setZindex();
			}
			else if(JQ('#surveyContent .btn-open-survey.btn.btn-primary').length >= 0 && Mcounter < 50){
				checkZindex();
				Mcounter++;
			}else{
				log('stop checking zIndex');
			}
		},100);
	}
	
	function resetButtonPosition(){
		var Buttonoffset = bottomDisclaimer.height();

		JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right').css('bottom',Buttonoffset+'px');

		JQ( window ).resize(function() {
			var bottomDisclaimer = JQ('.disclaimer__description');
			var Buttonoffset = bottomDisclaimer.height();

			JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right').css('bottom',Buttonoffset+'px');
		});
	}

	function setZindex(){
		var thisstyle = '';
		if(JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right').attr('style')){
			thisstyle = JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right').attr('style');
		}
		//z-index 1 for cookie bar
		if(JQ('.crash-message-container.cookies-type').length > 0){
			JQ(".btn-open-survey.btn.btn-primary.tab.tab-bottom-right").attr('style','z-index:1!important;'+thisstyle);
		}
		else{
			JQ(".btn-open-survey.btn.btn-primary.tab.tab-bottom-right").attr('style','z-index:998!important;'+thisstyle);
		}
		
	}


	function log(s) {
		try {
			if (debug) console.log(s)
		} catch(e) {}
	}

	var MobjectOutside = {}

	MobjectOutside.init = init;
	MobjectOutside.checkElement = checkElement;
	MobjectOutside.checkZindex = checkZindex;

	return MobjectOutside;

}());

jQuery(function(){
	srv.jQuery('#surveyContent .btn-open-survey.btn.btn-primary').hide();
	if(document.location.href.match(/collect.mopinion.com/ig) !== null){
		//functions inside form
		MformExtra.init();
	}else{
		//functions outside form
		MformOutside.init();
	}
});