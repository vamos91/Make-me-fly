jQuery(function(){

	jQuery('.btn-open-survey').removeClass('tab-right').addClass('tab-bottom-right')

	//extra button styles NEDERLAND
	if(jQuery('.disclaimer__description.disclaimer__description--big').length > 0 ){
		jQuery('#surveyContent .btn-open-survey.tab.tab-bottom-right').addClass('moveup');
	}
	// //extra button styles OVERIG
	else if(jQuery('.disclaimer__description .icon-SRP_info.gtm-btn-disclaimer-open').length > 0 ){
		jQuery('#surveyContent .btn-open-survey.tab.tab-bottom-right').addClass('moveup_small');
	}

});//end
