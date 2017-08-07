/**
 * Initialises all the stuff needed for dual input validation with tooltips.
 * The dual validation will also be executed when the FormValidationHandler.EVENT_NAME
 * event is fired on the form.
 * @param form {Element}
 * @param input_1 {Object}
 * @param input_2 {Object}
 * @param additional_validator {Validator} (optional) A validator to be invoked when element validation changes.
 * @param tooltip_on_focus {Boolean} (optional) Always show first tooltip when input has focus
 */
var dual_validation_initialise = function(form, input_1, input_2, additional_validator, tooltip_on_focus) {

	var tooltip_builder = new TooltipBuilder();
	
	var add_tooltip = function(element, message, styles) {
		tooltip_builder.removeFrom(element);
		tooltip_builder.addTo(element, message, styles);
		
		setTimeout(function() {
			document.body.addEvents({
				"click": remove_tooltip,
				"keyup": remove_tooltip
			});
		}, 500);
	};
	
	// This has to be a named function so it can be removed from the event listener.
	var remove_tooltip = function() {
		tooltip_builder.removeFrom(this);
//		console.log("remove_tooltip");
		document.body.removeEvents({
			"click": remove_tooltip,
			"keyup": remove_tooltip
		});
	};
	
	var element_valid_callback = function() {
		this.getParent('.dual-validation-field')
			.removeClass('invalid')
			.addClass('valid');
	};
	
	var element_invalid_callback = function() {
		this.getParent('.dual-validation-field')
			.removeClass('valid')
			.addClass('invalid');
	};

	// Add events to element 1
	if (typeof tooltip_on_focus!=="undefined" && tooltip_on_focus==true) {
		$(input_1.id).addEvent('focus', function() {
			tooltip_builder.addTo(this.getParent('.dual-validation-field'), input_1.message, ["warning", "right"]);
		});

		$(input_1.id).addEvent('blur', function() {
			tooltip_builder.removeFrom(this.getParent('.dual-validation-field'));
		});
	} else {
		$(input_1.id).addEvent('sg.invalid', function() {
			add_tooltip(this.getParent('.dual-validation-field'), input_1.message, ["warning", "right"]);
		});
	}

	$(input_1.id).addEvents({
		'sg.valid': element_valid_callback,
		'sg.invalid': element_invalid_callback
	});
	
	// Add events to element 2
	$(input_2.id).addEvents({
		'sg.valid': element_valid_callback,
		'sg.invalid': element_invalid_callback
	});
	$(input_2.id).addEvent(DualInputValidator.EVENT_NEITHER, function() {
		this.getParent(".dual-validation-field")
			.removeClass("valid")
			.removeClass("invalid");
		remove_tooltip.bind(this);
	});
	$(input_2.id).addEvent(DualInputValidator.EVENT_INVALID, function() {
		add_tooltip(this.getParent('.dual-validation-field'), input_2.message, ["warning", "right"]);
	});

	// Initialise the dual input validation
	var element_1 = $(input_1.id);
	var validator = new DualInputValidator(
		element_1,
		$(input_2.id),
		additional_validator
	);
	validator.activate(element_1.type != "password");
	
	// Initialise form validation handler
	var form_validation_handler = new FormValidationHandler(
		form,
		validator,
		Template.scrollPage
	);
	form_validation_handler.activate();
};
