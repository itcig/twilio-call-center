import React, { Component } from 'react';
import classes from './Phone.scss';

import Button from '../../UI/Button/Button';

class Phone extends Component {
	state = {
		phoneNumber: '',
		dialerKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
	};

	updatePhoneNumber = keyValue => {
		if (keyValue) {
			const phoneNumber = this.state.phoneNumber + keyValue;
			this.setState({phoneNumber});
		}
		/* No Number, so remove last number */
		else {
			// Maybe this shouldn't be here?
		}
	};

	createCallHandle = () => {
		//something
	}

	endCallHandler = () => {
		//something
	}

	phoneNumberChangeHandler = () => {
		//stuff
	}

	keyDownHandler = event => {
		if (document.activeElement.id === 'phoneNumber') {
			event.preventDefault();
			let phoneNumber = this.state.phoneNumber;

			// remove last character
			if (event.key === 'Backspace') {
				phoneNumber = phoneNumber.slice(0, -1);
			}

			// add to end of number
			if (this.state.dialerKeys.includes(event.key.toString())) {
				phoneNumber += event.key.toString();
			}

			this.setState({phoneNumber});
		}
	}

	clearPhoneNumber = event => {
		event.preventDefault();
		this.setState({phoneNumber: ''});
	}

	render() {
		let callButton = <Button
			btnType="Success"
			disabled={this.state.phoneNumber.length < 10}
			onClick={this.createCallHandler}>Call</Button>;

		const keypad = (
			<div className={classes.keypad}>
				{this.state.dialerKeys.map(key => (
					<span key={key} onClick={() => this.updatePhoneNumber(key)}>{key}</span>
				))}
			</div>
		);

		/* If there is an active call update the button's functionality and text */
		if (this.props.activeCall) {
			callButton = (
				<Button
					btnType="Danger"
					onClick={this.endCallHandler}>Hangup</Button>
			);
		}

		return (
			<section className={classes.Phone}>

				<input onChange={this.phoneNumberChangeHandler}
					id="phoneNumber"
					value={this.state.phoneNumber}
					type="search"
					onKeyDown={this.keyDownHandler}
					onsearch={event => this.clearPhoneNumber(event)} />
				{keypad}
				{callButton}
			</section>
		);
	}
}

export default Phone;