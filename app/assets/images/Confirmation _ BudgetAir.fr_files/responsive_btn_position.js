Mextra =(function(){

	var JQ = srv.jQuery
	var Mcounter = 0;
	var Zcounter = 0;
	var url = document.location.href;
	var bottomDisclaimer = JQ('.disclaimer__description');
	var Fbutton = JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right');
	var Mlanguage = "dutch";

	//LOAD CSS BUTTONPOSITION
	if( url.match(/vluchtresultaten/ig) !== null || 
		url.match(/flightresults/ig) !== null || 
		url.match(/checkout/ig) !== null
	){
		checkElement();
	}
	if(url.match(/www\.cheaptickets\.be/ig)!== null){
		setLanguage();
	}
	if(url.match(/checkout/ig)!== null){
		checkZindex();
	}

	if( url.match(/klantenservice/ig)!== null || 
		url.match(/en\/customer-service/ig)!== null ){
		JQ('#surveyContent').css('z-index','3');
	}
	
	function checkElement(){
		setTimeout(function(){
			if(bottomDisclaimer.length > 0 && Mcounter < 40 && Fbutton.is(':visible')){
					resetButtonPosition();	
			}else if(bottomDisclaimer.length > 0 && Mcounter < 40){
				checkElement();
				Mcounter++;
			}else if(bottomDisclaimer.length == 0 && Mcounter < 40){
				checkElement();
				Mcounter++;
			}
		},100);
	}

	function checkZindex(){
		setTimeout(function(){
			if(Fbutton.length > 0 && Mcounter < 40 && Fbutton.is(':visible')){
				setZindex();
			}else if(Fbutton.length > 0 && Mcounter < 40){
				checkZindex();
				Mcounter++;
			}else if(Fbutton.length == 0 && Mcounter < 40){
				checkZindex();
				Mcounter++;
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
		JQ(".btn-open-survey.btn.btn-primary.tab.tab-bottom-right").attr('style','z-index:998!important;'+thisstyle);
	}

	function setLanguage(){
		if(url.match(/www\.cheaptickets\.be\/fr/ig) !== null){
			Mlanguage = 'https://travix.mopinion.com/customerscript/travix/language/french.json';
		}
		else{
			Mlanguage = 'https://travix.mopinion.com/customerscript/travix/language/dutch.json';
		}

		var thankscount = 0;
		var thanksheadertxt;

		//LOAD LANGUAGE
	    JQ.getJSON(Mlanguage, function(Mlang) {

	    	//FEEDBACKBTN
	    	JQ('.btn-open-survey.btn.btn-primary.tab.tab-bottom-right').html('<i class="fa fa-commenting-o" style="margin-right: 10px;"></i>'+Mlang.btntext);
	        //PAGE 1
	        JQ("#surveyBody #surveyHead #surveyTitle h1").text(Mlang.header.headertitle);
	        //Question1
	        JQ("#surveyBody .control-group:nth-child(1) .block-title").text(Mlang.question1.headertitle);
	        JQ("#surveyBody .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(1) label").text(Mlang.question1.yes);
	        JQ("#surveyBody .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(2) label").text(Mlang.question1.partly);
	        JQ("#surveyBody .control-group:nth-child(1) .button-container .gcr-wrapper:nth-child(3) label").text(Mlang.question1.no);
	        //Question2
	        JQ("#surveyBody .control-group:nth-child(2) .block-title").text(Mlang.question2.headertitle);
	        JQ("#surveyBody .control-group:nth-child(2) .nice-select .current").text(Mlang.question2.placeholder);
	        JQ("#surveyBody .control-group:nth-child(2) .list .option[data-value='Ik oriënteer me op een bestemming']").text(Mlang.question2.option1);
	        JQ("#surveyBody .control-group:nth-child(2) .list .option[data-value='Ik wil tickets vergelijken']").text(Mlang.question2.option2);
	        JQ("#surveyBody .control-group:nth-child(2) .list .option[data-value='Ik wil mijn ticket (binnenkort) boeken']").text(Mlang.question2.option3);
	        JQ("#surveyBody .control-group:nth-child(2) .list .option[data-value='Ik wil mijn geboekte ticket of gegevens bekijken/wijzigen']").text(Mlang.question2.option4);
	        JQ("#surveyBody .control-group:nth-child(2) .list .option[data-value='Ik wil contact opnemen']").text(Mlang.question2.option5);
	        //Question3
	        JQ("#surveyBody .control-group:nth-child(3) .block-title").text(Mlang.question3.headertitle);
	        JQ("#surveyBody .control-group:nth-child(3) .nice-select .current").text(Mlang.question3.placeholder);
	        JQ("#surveyBody .control-group:nth-child(3) .list .option[data-value='Ik ben me nog aan het oriënteren']").text(Mlang.question3.option1);
	        JQ("#surveyBody .control-group:nth-child(3) .list .option[data-value='Ik kan het juiste/gewenste ticket niet vinden']").text(Mlang.question3.option2);
	        JQ("#surveyBody .control-group:nth-child(3) .list .option[data-value='Ticket is te duur']").text(Mlang.question3.option3);
	        JQ("#surveyBody .control-group:nth-child(3) .list .option[data-value='Ik kan niet de juiste informatie vinden']").text(Mlang.question3.option4);
	        JQ("#surveyBody .control-group:nth-child(3) .list .option[data-value='Technisch probleem']").text(Mlang.question3.option5);
	        //Question4
	        JQ("#surveyBody .control-group:nth-child(4) .block-title").text(Mlang.question4.headertitle);
	        JQ("#surveyBody .control-group:nth-child(4) .rating-group [data-value='1']").attr('data-title',Mlang.question4.label1);
	        JQ("#surveyBody .control-group:nth-child(4) .rating-group [data-value='2']").attr('data-title',Mlang.question4.label2);
	        JQ("#surveyBody .control-group:nth-child(4) .rating-group [data-value='3']").attr('data-title',Mlang.question4.label3);
	        JQ("#surveyBody .control-group:nth-child(4) .rating-group [data-value='4']").attr('data-title',Mlang.question4.label4);
	        JQ("#surveyBody .control-group:nth-child(4) .rating-group [data-value='5']").attr('data-title',Mlang.question4.label5);
	        //Question5
	        JQ("#surveyBody .control-group:nth-child(5) .block-title").text(Mlang.question5.headertitle);
	        //Buttons
	        JQ("#surveyBody #surveySubmitBtn").text(Mlang.buttons.submit);
	        //Errormessage
	        JQ(".alert.alert-danger").text(Mlang.errormessage.veld_is_verplicht);
	        //Thanks
	        thanksheadertxt = Mlang.thanks.headertitle;
	        JQ("#surveyBody #lastPage").html('<div class="completed-anim do-anim">'+
													'<i class="fa fa-check"></i>'+
												'</div>'+Mlang.thanks.plain);
	    });

		JQ('#surveySubmitBtn').click(function(){
			thanksheader();
		});

		function thanksheader(){
			setTimeout(function(){
				if(JQ('#lastPage').is(':visible')){
		        	JQ('#surveyBody #surveyHead #surveyTitle h1').text(thanksheadertxt);
		        }else if(thankscount < 60){
		        	thankscount++;
		        	thanksheader();
		        }
			},50);
			
		}
	}

	var Mxtra = {};

	Mxtra.setLanguage = setLanguage;
	Mxtra.checkElement = checkElement;
	Mxtra.checkZindex = checkZindex;

	return Mxtra;

}());

