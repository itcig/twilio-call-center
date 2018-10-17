import React from 'react';
import classes from './Input.scss';

/**
 * Dynamically build an html input element
 *
 * @param props.elementType string - the type of html element to be used
 * @param props.elementConfig object - attributes to be added to element
 * @param props.invalid bool - if the input is invalid
 * @param props.shouldValidate bool - if the field requires validation
 * @param props.touched bool - if the field was touched by the user
 * @param props.value string|int|bool - the value of the input
 * @param props.changed function - logic to execute on change
 * @param props.keydown function - logic to execute on keydown
 * @param props.classes //@TODO add support for passing additional classes if needed
 */

const input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	if (!props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Valid);
	}

	//@TODO make sure name attribute is being properly added to the element
	switch (props.elementType) { /* eslint-disable indent */

		case ('hidden') :
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				/>;
			break;

		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={props.keydown} />;
			break;

		case ('search'):
			inputElement = <input
				className={inputClasses.join(' ')}
			{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={props.keydown} />;
			break;

		case ('textarea'):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={props.keydown} />;
			break;

		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;

		//@TODO update to take an array
		case ('checkbox'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
			break;


		// handles text, checkbox, hidden, search, and inputs
		default:
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={props.keydown} />;
			break;
	} /* eslint-enable indent */

	return (
		<div className={classes.Input}>
			<label className={classes.Label} htmlFor={props.elementConfig.name}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;