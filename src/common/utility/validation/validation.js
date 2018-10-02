/**
 * This function is used to test input values
 *
 * @param {int|string|bool} value data to run the test against
 * @param {object} rules object keys are the name of the rule and a truthy value will run the test
 */

const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules) {
		/* remove white space and make sure there is some input */
		if (rules.required) {
			isValid = !empty(value) && isValid;
			//console.log('[validation.js] checkValidity(): rules.required ->', isValid);
		}

		if (rules.minLength) {
			isValid = isLength(value, rules.minLength) && isValid;
			//console.log('[validation.js] checkValidity(): rules.minLength ->', isValid);
		}

		if (rules.maxLength) {
			isValid =  isLength(value, rules.maxLength) && isValid;
			//console.log('[validation.js] checkValidity(): rules.maxLength ->', isValid);
		}

		if (rules.isNumber) {
			isValid = isNumber(value) && isValid;
			//console.log('[validation.js] checkValidity(): rules.isNumber ->', isValid);
		}

		if (rules.isString) {
			isValid = isString(value) && isValid;
			//console.log('[validation.js] checkValidity(): rules.isString ->', isValid);
		}

		if (rules.isEmail) {
			isValid = isEmail(value) && isValid;
			//console.log('[validation.js] checkValidity(): rules.isEmail ->', isValid);
		}
	}

	return isValid;
};

/* Improved Type Checking */
const isString = value => (typeof value === 'string' || value instanceof String);
const isNumber = value => (typeof(Number(value)) === 'number' && !isNaN(Number(value)));
const isFunction = value => (typeof(value) === 'function' || Object.prototype.toString.call(value).indexOf('Function') > -1);
const isArray = value => (value.constructor === Array && value instanceof Array && Array.isArray(value));
const isObject = value => (!isArray(value) && !isFunction(value)) && value === Object(value);

/* Check if a given data point is empty - this could be written more elegantly, but for readability it's gross */
const empty = value => {
	try {
		if (value === null || typeof(value) === undefined) {
			return true;
		}

		if (isString(value)) {
			return (value.trim() === '' || value.length === 0);
		}

		if (isNumber(value)) {
			return false;
		}

		if (isArray(value)) {
			return !value.length;
		}

		if (isFunction(value)) {
			return false; //@TODO this needs testing
		}

		if (isObject(value)) {
			for (let key in value) {
				if (value.hasOwnProperty(key)) {
					return false;
				}
			}
			return true;
		}
	} catch (error) {
		console.log('[validation.js] -> empty() error ->', error);
	}
};

/* Form Validation */
// Works for both min and max lengths
const isLength = (value, length) => (value.length >= length);

const isEmail = value => {
	// eslint-disable-next-line
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(value).toLowerCase());
};

export default checkValidity;