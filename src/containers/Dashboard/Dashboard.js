import React, { Component } from 'react';
import classes from './Dashboard.css';


/**
 * This could show reports, stats from yesterday, the week, and the month
 * Then the nav could redirect the user to the phone portion
 */
class Dashboard extends Component {
	state = {
	};

	render() {
		return (
			<section className={classes.Dashboard}>
				<h1>This is the Dashboard!</h1>
				<div>
					This could be stats report from yesterday
				</div>
			</section>
		);
	}
}

export default Dashboard;