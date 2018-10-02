//@TODO this will hold the actionbar, agent, and admin controls... I think

import React, { Component } from 'react';
import classes from './Dashboard.css';

class Dashboard extends Component {
	state = {
	};

	render() {
		return (
			<div className={classes.Dashboard}>
				<h1>This is the Dashboard!</h1>
			</div>
		);
	}
}

export default Dashboard;