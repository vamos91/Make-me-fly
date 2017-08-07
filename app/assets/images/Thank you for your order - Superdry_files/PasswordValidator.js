/**
 * Password validator.
 * @author Jonathan Jefferies
 */
var PasswordValidator = function() {
	this.min_length = 8;
	this.max_length = 20;
};

/**
 * Validate a password.
 * @param password {String} The password to be validated.
 * @returns {Boolean}
 */
PasswordValidator.prototype.validate = function(password) {

	var length = password.length;
	
	if(length < this.min_length) {
		return false;
	}
	
	if(length > this.max_length) {
		return false;
	}
	
	if(!password.test(/([0-9])/)) {
		return false;
	}
	
	if(!password.test(/([a-zA-Z])/)) {
		return false;
	}

	return true;
};
