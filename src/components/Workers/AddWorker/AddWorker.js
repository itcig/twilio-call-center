import React, { Component } from 'react';
import classes from './AddWorker.scss';

import checkValidity from '../../../common/utility/validation/validation';

import Loader from '../../UI/Loader/Loader';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

/**
 * This component and it's route will only be available if
 */
class AddWorker extends Component {
	state = {
		formIsValid: false,
		loading: false,
		workerCreated: false,
		addWorkerForm: {

			// AKA contact_uri -- "client:username"
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

			// This will be checkboxes for each queue
			queues: {
				elementType: 'checkboxes',
				elementConfig: {
					type: 'checkbox',
					name: 'queue',
					options: [],
				},
				value: '',
				validation: {
				},
				valid: true,
				touched: false,
			},

			// This will be the sort order for tasks, higher numbers will get reservations first
			queueLevel: {
				elementType: 'select',
				elementConfig: {
					type: 'select',
					name: 'level',
					options: [
						{displayValue: 1, value: 1},
						{displayValue: 2, value: 2},
						{displayValue: 3, value: 3},
						{displayValue: 4, value: 4},
						{displayValue: 5, value: 5},
						{displayValue: 6, value: 6},
						{displayValue: 7, value: 7},
						{displayValue: 8, value: 8},
						{displayValue: 9, value: 9},
					],
				},
				value: '',
				validation: {
				},
				valid: true,
				touched: false,
			},

			// This will dictate if the worker can access administrative areas of the app (reports, adding workers etc.)
			admin: {
				elementType: 'checkboxes',
				elementConfig: {
					type: 'checkbox',
					name: 'admin',
					options: [],
				},
				value: 0,
				validation: {
				},
				valid: true,
				touched: false,
			},
		},
	};

	/*  */
	inputChangedHandler = (event, inputID) => {
		/* Deep Clone form element being changed. */
		const updatedAddWorkerForm = {...this.state.addWorkerForm};
		const updatedFormElement = {...updatedAddWorkerForm[inputID]};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedAddWorkerForm[inputID] = updatedFormElement;

		/* check all form input elements to determine if any are false */
		let formIsValid = true;
		for (let inputID in updatedAddWorkerForm) {
			formIsValid = (updatedAddWorkerForm[inputID].valid || updatedAddWorkerForm[inputID].valid === undefined) && formIsValid;
		}

		this.setState({
			addWorkerForm: updatedAddWorkerForm,
			formIsValid: formIsValid
		});
	}

	/* Create Twilio Worker */
	loginSubmitHandler = event => {
		event.preventDefault();

		this.setState({loading: true}); // form submitted update ui
		//@TODO hit twilio api
		//@TODO if successful, update something with state
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.addWorkerForm) {
			formElementsArray.push({
				id: key,
				config: this.state.addWorkerForm[key],
			});
		}

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
					<Button btnType="Success" disabled={!this.state.formIsValid}>Create Worker</Button>
				</div>
			</form>
		);

		if (this.state.loading) {
			form = <Loader />;
		}

		if (!process.env.REACT_APP_SYS_ADMIN) {
			form = <h3>ACCESS DENIED</h3>;
		}

		return (
			<article className={classes.AddWorker}>
				<h2>Add Worker</h2>
				{form}
			</article>
		);
	}
}

export default AddWorker;