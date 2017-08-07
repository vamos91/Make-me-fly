/**
 * Scroll to an invalid element when a validate event is fired.
 * @author Jonathan Jefferies
 */
var FormValidationHandler =

/**
 * @param form {Element}
 * @param validator {Validator}
 * @param scroller {Function} A callback to scroll the page.
 */
function(form, validator, scroller) {
	this.__form = form;
	this.__validator = validator;
	this.__scroller = scroller;
	this.__offset = 200;
};

/**
 * Listen for the validate event.
 */
FormValidationHandler.prototype.activate = function() {
	this.__form.addEvent(
		FormValidationHandler.EVENT_NAME,
		this.__checkValidation.bind(this)
	);
};

/**
 * Check the validator and scroll to the invalid element.
 * @param e {Event}
 */
FormValidationHandler.prototype.__checkValidation = function(e) {
	if(!this.__validator.validate()) {
		e.preventDefault();
		
		this.__scroller(
			Math.max(this.__validator.getInvalidElement().getPosition().y - this.__offset, 0)
		);
	}
};

/**
 * The name of the custom event.
 * @var String
 */
FormValidationHandler.EVENT_NAME = "sg.validate";
