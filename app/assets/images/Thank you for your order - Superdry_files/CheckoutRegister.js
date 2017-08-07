var CheckoutRegister = {
	init: function() {
		this.__request = new Request.JSON({
			url: "index.php",
			link: "ignore",
			onSuccess: this.__registerResult.bind(this)
		});
	},
	
	registerAccount: function() {
		if ($("register_button").hasClass("disabled")==false) {
			Template.termsPopup(SG.Lang.General.termsPopup, this.__registerRequest.bind(this));
		}
	},
	
	validateButton: function() {
		if ($("password").getParent().hasClass("valid") && $("password2").getParent().hasClass("valid")) {
			$("register_button").removeClass("disabled");
		} else {
			$("register_button").addClass("disabled");
		}
	},
	
	__registerRequest: function() {
		this.__request.post({
			"option": "com_virtuemart",
			"page": "checkout.register",
			"password": $('password').value,
			"only_page": 1
		});
	},
	
	__registerResult: function(response) {
        $script.ready(["google_datalayer"], function() {
			if (response.success==false) {
				Template.popup(response.message, "close");
			} else {
            	window.location.href = DataLayer360.access('superdry.static') + 'my-account/';
			}
        });
	}
};