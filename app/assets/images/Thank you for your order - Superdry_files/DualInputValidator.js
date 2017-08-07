/**
 * Checks that two inputs are valid and that their values are the same.
 * @author Jonathan Jefferies
 */
var DualInputValidator = 

/**
 * @param element_1 {Element} The first element to validate.
 * @param element_2 {Element} The element to match the first element.
 * @param additional_validator {Validator} (optional) A validator to be invoked when element validation changes.
 */
function(element_1, element_2, additional_validator) {
	this.__element_1 = element_1;
	this.__element_2 = element_2;
	this.__additional_validator = additional_validator;
	this.__invalid_element = null;
};

/**
 * Listen for changes to the inputs.
 * @param while_typing {Boolean} Also validate while the user is typing. (optional)
 * @visibility public
 */
DualInputValidator.prototype.activate = function(while_typing) {
	while_typing = while_typing || false;
	this.__element_1.addEvent('change', this.__firstInputCallback.bind(this));
	this.__element_2.addEvent('change', this.validate.bind(this));
	if(while_typing) {
		this.__element_2.addEvent('keyup', this.__partialValidate.bind(this));
	}
};

/**
 * Check if the inputs are valid.
 * @visibility public
 * @return boolean
 */
DualInputValidator.prototype.validate = function() {
	var success = true;

	if(!this.__checkFirstInput()) {
		this.__invalid_element = this.__element_1;
		success = false;
	}
	else if(!this.__checkSecondInput()) {
		this.__invalid_element = this.__element_2;
		success = false;
	}
	else {
		this.__invalid_element = null;
	}
	
	return success;
};

/**
 * Get an invalid element.
 * @visibility public
 */
DualInputValidator.prototype.getInvalidElement = function() {
	return this.__invalid_element;
};

/**
 * Check the values in the two elements are the same.
 * @visibility private
 * @return Boolean
 */
DualInputValidator.prototype.__valuesMatch = function() {
	return this.__element_1.value === this.__element_2.value;
};

/**
 * Check the value of the given element is empty.
 * @visibility private
 * @return Boolean
 */
DualInputValidator.prototype.__isEmpty = function(element) {
	return element.value == "";
};

/**
 * Check the validity of an element.
 * @visibility private
 * @param element {Element} The element to validate.
 */
DualInputValidator.prototype.__checkValidity = function(element) {
	return (typeof element.checkValidity == "undefined" || element.checkValidity()) &&
	       (typeof this.__additional_validator == "undefined" || this.__additional_validator.validate(element.value));
};

/**
 * @visibility protected
 */
DualInputValidator.prototype.__firstInputCallback = function(e) {
	if(!this.__checkFirstInput()) {
		return;
	}

	if(!this.__isEmpty(this.__element_2)) {
		this.__checkSecondInput();
	}
};

/**
 * Check the value of the first element is valid.
 * @visibility private
 * @return Boolean
 */
DualInputValidator.prototype.__checkFirstInput = function() {
	if(this.__checkValidity(this.__element_1)) {
		this.__element_1.fireEvent(DualInputValidator.EVENT_VALID);
		return true;
	}
	
	this.__element_1.fireEvent(DualInputValidator.EVENT_INVALID);
	
	return false;
};

/**
 * Check the value of the second element is valid and matches the first element.
 * @visibility private
 * @return Boolean
 */
DualInputValidator.prototype.__checkSecondInput = function() {
	if(this.__checkValidity(this.__element_2) && this.__valuesMatch()) {
		this.__element_2.fireEvent(DualInputValidator.EVENT_VALID);
		return true;
	}
	
	this.__element_2.fireEvent(DualInputValidator.EVENT_INVALID);
	
	return false;
};

/**
 * Validate that the characters entered into field 2 are currently correct.
 * @visibility private
 * @return Boolean
 */
DualInputValidator.prototype.__partialValidate = function() {
	var char_count = this.__element_2.value.length;

	if(this.__element_2.value === this.__element_1.value.substr(0, char_count)) {
		this.__element_2.fireEvent(DualInputValidator.EVENT_NEITHER);
		return true;
	}

	this.__element_2.fireEvent(DualInputValidator.EVENT_INVALID);
	return false;
};

/**
 * Fields are definitely valid.
 * @type {string}
 */
DualInputValidator.EVENT_VALID = "sg.valid";

/**
 * Fields are definitely invalid.
 * @type {string}
 */
DualInputValidator.EVENT_INVALID = "sg.invalid";

/**
 * Fields neither valid nor invalid. Fired while user is typing.
 * @type {string}
 */
DualInputValidator.EVENT_NEITHER = "sg.neither";
