import React, { Component } from 'react';
import classes from './Layout.scss';
import Aux from '../Aux/Aux';

import ActionBar from '../../components/ActionBar/ActionBar';

/**
 * The Layout Component will contain the entire application for now
 * If additional layouts need to be added in the future this will help separate components
 */
class Layout extends Component {
	render() {

		/* Dynamically hide/show ActionBar if there's an auth'd user */
		let header = null;
		if (this.props.user.isAuthenticated) {
			header = <ActionBar user={this.props.user} activityChangeHandler={this.props.activityChangeHandler} />;
		}

		return (
			<Aux>
				{header}

				<main className={classes.Content}>
					{this.props.children}
				</main>

			</Aux>
		);
	}
}

export default Layout;