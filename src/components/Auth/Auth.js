import React, { Component } from 'react';
import classes from './Auth.css';

import checkValidity from '../../common/utility/validation/validation';

import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

class Auth extends Component {
	state = {
		formIsValid: false,
		loading: false,
		loginForm: {
			username: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Email',
					name: 'email',
				},
				value: '',
				validation: {
					required: true,
					minLength: 3,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
					name: 'password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 3,
				},
				valid: false,
				touched: false,
			},
		},
	};

	loginSubmitHandler = event => {
		event.preventDefault();
		this.setState({ loading: true }); // form submitted update ui
	}

	//@TODO add error messages for which validation fails
	inputChangedHandler = (event, inputID) => {
		/* Deep Clone form element being changed. */
		const updatedLoginForm = {...this.state.loginForm};
		const updatedFormElement = {...updatedLoginForm[inputID]};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedLoginForm[inputID] = updatedFormElement;

		/* check all form input elements to determine if any are false */
		let formIsValid = true;
		for (let inputID in updatedLoginForm) {
			formIsValid = (updatedLoginForm[inputID].valid || updatedLoginForm[inputID].valid === undefined) && formIsValid;
		}

		this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.loginForm) {
			formElementsArray.push({
				id: key,
				config: this.state.loginForm[key],
			});
		}

		let formHeaderMessage = 'Login to Continue';
		let form = (
			<form onSubmit={this.loginSubmitHandler}>
				<fieldset>
					{formElementsArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							value={formElement.config.value}
							changed={event => this.inputChangedHandler(event, formElement.id)} />
					)) }
				</fieldset>
				<div>
					<Button btnType="Success" disabled={!this.state.formIsValid}>Login</Button>
				</div>
			</form>
		);

		if (this.state.loading) {
			formHeaderMessage = 'Verifying Credentials';
			form = <Loader />;
		}

		return (
			<article className={classes.Auth}>
				<h3>{formHeaderMessage}</h3>
				{form}
			</article>
		);
	}
}

export default Auth;