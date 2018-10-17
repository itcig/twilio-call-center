import React, { Component } from 'react';
import classes from './Phone.scss';

import { checkValidity, keyDownIsAlpha } from '../../../common/utility/validation/validation';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

class Phone extends Component {
	state = {
		dialerKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
		transferCall: false,

		formIsValid: false,
		dialerForm: {
			phoneNumber: {
				elementType: 'input',
				elementConfig: {
					name: 'phone',
					type: 'search', /* adds handy clear all x */
					placeholder: '281-330-8004',
					id: 'phoneNumber',
				},
				value: '',
				validation: false,
				valid: true,
				touched: true,
			},
		},
	};

	/**
	 * Remove hyphens, and preface number with US country code
	 */
	cleansePhoneNumber = number => {
		//@TODO should this use state or a passed in value
		//@TODO should also make sure the second character isn't a 1?
		//@TODO should also fix unusual placment of # and  *
		const cleanNumber = number.replace(/-|\+/g, '');// remove all hyphens and plus symbols
		return (cleanNumber.charAt(0) === '1') ? `+${cleanNumber}` : `+1${cleanNumber}`;
	}

	updatePhoneNumber = keyValue => {
		if (keyValue) {
			const dialerForm = {...this.state.dialerForm};
			dialerForm.phoneNumber.value += keyValue;
			this.setState({dialerForm});
		}
	};

	createCallHandle = () => {
		//something
	}

	endCallHandler = () => {
		//@TODO w/o mobx this needs to be moved to the parent container
	}

	keyDownHandler = event => {
		//@TODO add some notification if a non-number is used --> keyDownIsAlpha()
		if (document.activeElement.id === 'phoneNumber') {
			event.preventDefault();
			const dialerForm = {...this.state.dialerForm};

			// remove last character
			if (event.key === 'Backspace') {
				dialerForm.phoneNumber.value = dialerForm.phoneNumber.value.slice(0, -1);
			}

			// add to end of number (if input is one of the dialer keys or a hyphen)
			if ([...this.state.dialerKeys, '-'].includes(event.key.toString())) {
				dialerForm.phoneNumber.value += event.key.toString();
			}

			this.setState({dialerForm});
		}
	}

	componentDidMount() {
		document.querySelector('#phoneNumber').addEventListener('search', this.clearPhoneNumber);
	}

	clearPhoneNumber = event => {
		event.preventDefault();
		if (!this.props.activeCall || this.state.transferCall) {
			const dialerForm = {...this.state.dialerForm};
			dialerForm.phoneNumber.value = '';
			this.setState({dialerForm});
		}
	}

	//@TODO add error messages for which validation fails
	inputChangedHandler = (event, inputID) => {
		/* Deep Clone form element being changed. */
		const updatedDialerForm = {...this.state.dialerForm};
		const updatedFormElement = {...updatedDialerForm[inputID]};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedDialerForm[inputID] = updatedFormElement;

		/* check all form input elements to determine if any are false */
		let formIsValid = true;
		for (let inputID in updatedDialerForm) {
			formIsValid = (updatedDialerForm[inputID].valid || updatedDialerForm[inputID].valid === undefined) && formIsValid;
		}

		this.setState({
			dialerForm: updatedDialerForm,
			formIsValid: formIsValid
		});
	}

	render() {
		let callButton = <Button btnType="Success"
			disabled={this.cleansePhoneNumber(this.state.dialerForm.phoneNumber.value).length < 12}
			onClick={this.createCallHandler}>Call</Button>;

		const keypad = <div className={classes.keypad}>
			{this.state.dialerKeys.map(key => (
				<span key={key} onClick={() => this.updatePhoneNumber(key)}>{key}</span>
			))}</div>;

		/* If there is an active call update the button's functionality and text */
		if (this.props.activeCall) {
			callButton = <Button btnType="Danger" onClick={this.endCallHandler}>Hangup</Button>;
		}

		return (
			<section className={classes.Phone}>

				<Input
					// key={this.state.dialerForm.phoneNumber.elementConfig.id}
					className={classes.phoneNumber}
					elementType={this.state.dialerForm.phoneNumber.elementType}
					elementConfig={this.state.dialerForm.phoneNumber.elementConfig}
					invalid={!this.state.dialerForm.phoneNumber.valid}
					shouldValidate={this.state.dialerForm.phoneNumber.validation}
					touched={this.state.dialerForm.phoneNumber.touched}
					value={this.state.dialerForm.phoneNumber.value}
					changed={event => this.inputChangedHandler(event, this.state.dialerForm.phoneNumber.elementConfig.id)}
					keydown={event => this.keyDownHandler(event)} />

				{keypad}
				{callButton}
			</section>
		);
	}
}

export default Phone;