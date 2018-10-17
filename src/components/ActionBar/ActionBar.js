//@TODO this will be at the top of the page and will display the agent's status in the queue as well as actions like logout
import React, { Component } from 'react';
import classes from './ActionBar.scss';
import { withRouter, NavLink } from 'react-router-dom';
import axios from 'axios';

/**
 * This will contain the Nav, Agent Actions(logout etc.), Agent Status, and maybe a greeting (welcome [user.firstName] or something?)
 */
class ActionBar extends Component {
	state = {
		twilio: {
			activities: [], // List of activity objects with sid, and friendlyName keys
		},
	};

	/**
	 * Retrieve a list of activities (statuses) for users
	 */
	async getActivities() {
		try {
			let activities = await axios.get('/taskrouter/activities');
			activities = activities.data;
			const twilio = {
				...this.state.twilio,
				activities,
			};

			this.setState({twilio});
		} catch (error) {
			//@TODO some ui output?
			if (process.env.NODE_ENV === 'development') {
				console.error(error);
			}
		}
	}

	/**
	 * Get a list of Twilio Activities, but only if the list isn't already set
	 */
	componentDidMount() {
		if (!this.state.twilio.activities.length) {
			this.getActivities();
		}
	}

	render() {

		//@TODO if the status becomes it's own component then move this
		/* Build array of JSX Options for the status dropdown */
		const activityOptions = this.state.twilio.activities
			.map(activity => (
				<option key={activity.sid} value={activity.friendlyName.toLowerCase()} >
					{activity.friendlyName.charAt(0).toUpperCase() + activity.friendlyName.substr(1)}
				</option>
			));

		return (
			<header className={classes.ActionBar}>
				{/* //@TODO make this it's own component?  */}
				<div className={classes.activities}>
					<select value={this.props.user.twilio.activity.toLowerCase()} onChange={event => this.props.activityChangeHandler(event)}>
						{activityOptions}
					</select>
				</div>

				<nav>
					<ul>
						<li>
							<NavLink to="/dashboard" exact activeClassName={classes.active} className={classes.navLinks}>Stats</NavLink>
							{/* <a className={this.props.location.pathname === '/dashboard' ? classes.active : ''}>Stats</a> */}
						</li>
						<li>
							<NavLink to="/call-center" exact activeClassName={classes.active} className={classes.navLinks}>Call Center</NavLink>
							{/* <a>Call Center</a> */}
						</li>
					</ul>
				</nav>
				<div className={classes.dropdown}>
					<span className={classes.dropdownButton}>Agent Actions</span>
					<div className={classes.dropdownContent}>
						<NavLink to="/logout" exact>Logout</NavLink>
						<NavLink to="/settings">Settings</NavLink>
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(ActionBar);