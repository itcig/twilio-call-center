import React, { Component } from 'react';
import classes from './CallCenter.scss';

import { getTwilioWorkerReservations } from '../../common/twilio/worker';
import { getSubscriberByPhoneNumber } from '../../common/cig/api';

import { copyToClipboard } from '../../common/utility/clipboard';

import Phone from './Phone/Phone';
import Button from '../UI/Button/Button';

console.log(classes);

class CallCenter extends Component {
	state = {
		activeCall: false,

		// This can hold state data for the dialer (the number, etc.)
		phone: {
			number: null,
		},

		// Twilio specific data
		twilio: {
			// array of reservation objects
			reservations: [
				{
					dateCreated: 'Thu Oct 11 2018 11:31:08 GMT-0500',
					dateUpdated: 'Thu Oct 11 2018 11:31:08 GMT-0500',
					reservationStatus: 'pending',
					sid: 'WRf5b6b138696b9adfbcc64e97a3c2aedc',
					task: {
						workspaceSid: 'WSb4d440353f0586bc52f4a6830c8bb882',
						sid: 'WT50925618deecc13c798d7cdbf16817f6',
						assignmentStatus: 'reserved',
						dateCreated: 'Thu Oct 11 2018 11:31:08 GMT-0500',
						dateUpdated: 'Thu Oct 11 2018 11:31:08 GMT-0500',
						age: 0,
						attributes: {
							channel: 'phone',
							group: 'id',
							queue: 'id_general',
							team: 'support',
							title: 'Inbound Call',
							type: 'inbound_call',
							name: 'Bill Murray', //@TODO get caller ID or show phone number?
						},
						taskChannelSid: 'TC13366833bf59b35e02faa71fc58d37b9',
						taskChannelUniqueName: 'voice',
						taskQueueFriendlyName: 'ID General',
						taskQueueSid: 'WQae49b1a41cf473daae547d789f9779d6',
						timeout: 86400,
					},
					taskSid: 'WT50925618deecc13c798d7cdbf16817f6',
					workerName: 'hrancourt',
					workerSid: 'WK055f1f9835452480015da341c8c056ed',
					workspaceSid: 'WSb4d440353f0586bc52f4a6830c8bb882',
				},
				{
					dateCreated: 'Thu Oct 11 2018 16:20:08 GMT-0500',
					dateUpdated: 'Thu Oct 11 2018 17:03:08 GMT-0500',
					reservationStatus: 'pending',
					sid: 'WRf5b6b138696b9adfbcc64e97a3c2a138',
					task: {
						workspaceSid: 'WSb4d440353f0586bc52f4a6830c8bb882',
						sid: 'WT50925618deecc13c798d7cdbf1681138',
						assignmentStatus: 'reserved',
						dateCreated: 'Thu Oct 11 2018 16:20:08 GMT-0500',
						dateUpdated: 'Thu Oct 11 2018 17:03:08 GMT-0500',
						age: 0,
						attributes: {
							channel: 'phone',
							group: 'id',
							queue: 'id_weso',
							team: 'support',
							title: 'Inbound Call',
							type: 'inbound_call',
							name: 'Jeff Goldblum', //@TODO get caller ID or show phone number?
						},
						taskChannelSid: 'TC13366833bf59b35e02faa71fc58d37b9',
						taskChannelUniqueName: 'voice',
						taskQueueFriendlyName: 'ID WESO',
						taskQueueSid: 'WQae49b1a41cf473daae547d789f9779d6',
						timeout: 86400,
					},
					taskSid: 'WT50925618deecc13c798d7cdbf16817f6',
					workerName: 'hrancourt',
					workerSid: 'WK055f1f9835452480015da341c8c056ed',
					workspaceSid: 'WSb4d440353f0586bc52f4a6830c8bb882',
				},
			],
		},
		subscriber: null, // response from cig api to lookup subscriber by their phone number
	};

	acceptReservationHandler = async reservationSid => {
		//@TODO capture phone number from reservation data
		const callerPhoneNumber = null;

		// make call out to cig api and use the caller's phone number to retrieve subscriber data
		const subscriber = await getSubscriberByPhoneNumber(callerPhoneNumber);
		console.log(subscriber);

		const updatedState = {
			activeCall: true,
			subscriber,
		};

		this.setState(updatedState);
	}

	/**
	 * @TODO add description
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
		//@TODO this would update using sockets
		//const reservations = await getTwilioWorkerReservations(this.props.user.twilio.sid);
		// const twilio = {
		// 	...this.state.twilio,
		// 	reservations,
		// };

		// this.setState({twilio});
	}

	render() {
		let agentActions = null;
		if (this.state.activeCall) {
			agentActions = (
				<div className={classes.subscriber}>
					<h4>Subscriber Data</h4>
					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<td>{this.state.subscriber.fullname}</td>
							</tr>
							<tr className={classes.address}>
								<th>Address</th>
								<td>
									<span>{this.state.subscriber.addressline1}</span>
									<span>{this.state.subscriber.addressline2}</span>
									<span>{this.state.subscriber.addressline3}</span>
									{/* City, State, Zip */}
									<span>{this.state.subscriber.town}, {this.state.subscriber.region} {this.state.subscriber.addressline4}</span>
								</td>
							</tr>
							<tr>
								<th>Phone</th>
								<td>{this.state.subscriber.telephone_number}</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>{this.state.subscriber.email}</td>
							</tr>
							<tr>
								<th>Fax</th>
								<td>{this.state.subscriber.fax_number}</td>
							</tr>
							<tr>
								{/* //@TODO add feedback to show copy was successful */}
								<th>PersonID</th>
								<td>
									<a onClick={() => copyToClipboard(this.state.subscriber.truepersonid)}
										title="Click to copy PersonID">
										{this.state.subscriber.truepersonid}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			const reservationListElements = this.state.twilio.reservations.map(reservation => {
				return (
					<li key={reservation.sid}>
						<div className={classes.reservation}>
							<span>{reservation.task.attributes.title} from {reservation.task.attributes.name}</span>
							<Button
								key={reservation.sid}
								btnType='Success'
								className={classes.acceptReservationButton}
								clicked={() => this.acceptReservationHandler(reservation.sid)}>Accept
							</Button>
						</div>
					</li>
				);
			});

			agentActions = (
				<div className={classes.reservations}>
					<h4>Reservations</h4>
					<ul>
						{reservationListElements}

					</ul>
				</div>
			);
		}

		return (
			<article className={classes.CallCenter}>

				{/* //@TODO this likely should be it's own component */}
				<section className={classes.agentActions}>
					{agentActions}
					{/* //@TODO add section for call notes, etc. */}
				</section>

				<Phone activeCall={this.state.activeCall}/>

			</article>
		);
	}
}

export default CallCenter;

