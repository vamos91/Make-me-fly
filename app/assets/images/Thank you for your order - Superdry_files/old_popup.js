function popup(content, height, width) {
	//Close any previous popup
	if(typeof document.boxB != 'undefined') {
		document.boxB.close();
	}

	document.boxB = new MooPrompt('', content, {
		buttons:0,
		width:width || 345,
		height:height,
		overlay:true,
		showCloseBtn:false
	});

	//Cancel
	$$('.popup-message .close').addEvent('click', function(e) {
		document.boxB.close();
	});
	 
	if ($('langclose') != null) {
		$('langclose').addEvent('click', function(e) {
			document.boxB.close();
		});
	}

	//Hide proceed button
	if($defined($('confirm-terms'))) {
		var confirm_link = $$('.popup-message .confirm');
		confirm_link.setStyle('display', 'none');
		$('confirm-terms').addEvent('click', function() {
			if(this.checked) confirm_link.setStyle('display', 'inline-block');
			else confirm_link.setStyle('display', 'none');
		});
	}
}

function getTerms() {
	var text = lang_theme_newsletter_terms;
	var confirm = '<p><input type="checkbox" name="confirm-terms" id="confirm-terms" /> <label for="confirm-terms">'+lang_theme_confirm_link+'</label></p>';
	return text+confirm;
}