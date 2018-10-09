import React, { Component } from 'react';
import classes from './CallCenter.css';

import { getTwilioWorkerReservations } from '../../common/twilio/worker';

class CallCenter extends Component {
	state = {
		activeCall: false,

		// This can hold state data for the dialer (the number, etc.)
		phone: {
			number: null,
		},

		// Twilio specific data
		twilio: {
			reservations: [], // array of reservation objects
		},


		subscriber: null, // response from cig api to lookup subscriber by their phone number
	};

	//@TODO Create Phone Component (separate later?)
	//@TODO Create Agent Action Component (separate later?)

	//@TODO create acceptReservationHandler
	acceptReservationHandler = event => {
		//@TODO make call out to CIG API to get subscriber info and update state
	}

	//@TODO create outboundCallHandler


	/**
	 * docs
	 */
	dialerInputChangeHandler = event => {
		// do something
	}

	/**
	 * is this needed?
	 */
	callNotesInputChangeHandler = event => {
		// do stuff
	}

	async componentDidUpdate() {
		//@TODO add some conditional check to avoid infinite updates
		const reservations = await getTwilioWorkerReservations(this.props.user.twilio.sid);
		const twilio = {
			...this.state.twilio,
			reservations,
		};

		this.setState({twilio});
	}

	render() {
		let agentActions = null;
		if (this.state.activeCall) {
			agentActions = (
				<div>
					<ul>
						<li></li>
					</ul>
				</div>
			);
		} else {
			const reservationListElements = this.state.twilio.reservations.map(reservation => {
				return (
					<li key={reservation.sid}>
						{reservation.name}
					</li>
				);
			});

			agentActions = (
				<div>
					<ul>
						{reservationListElements}
					</ul>
				</div>
			);
		}

		return (
			<article className={classes.CallCenter}>

				<section className={classes.agentActions}>
					{agentActions}
				</section>

				{/* //@TODO this likely should be it's own component */}
				<section className={classes.phone}>

				</section>

			</article>
		);
	}
}

export default CallCenter;