import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import classes from './App.css';

import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter'; //@TODO remove this for production

import Layout from './hoc/Layout/Layout';
import Auth from './components/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard';
import CallCenter from './components/CallCenter/CallCenter';

// import getTwilioActivities from './common/twilio/activities';
import { getTwilioWorkerAttributes } from './common/twilio/worker';

const mock = new MockAdapter(axios, {delayResponse: 2000});

//@TODO make a color pallet -- https://coolors.co/90309c-c0c999-fd96a9-f62dae-470063

/**
 * Outer Most container
 */
class App extends Component {
	state = {
		user: {
			isAuthenticated: false,
			isAdmin: false,

			//Everything twilio related, that is specific to this user
			twilio: {
				//@TODO if this can be retrieved from twilio, use that method to set this
				activity: 'Busy', //default activity on login
				attributes: {},
			},
		},

		// Non-user specific Twilio Data to be shared across multiple components
		twilio: {
		},
	};

	//@TODO this could be made into a barrel instead of doing all the imports here
	/* Call all Twilio GET methods */
	async getTwilioData(currentUser) {
		// If there isn't a user then don't retrieve twilio data
		if (currentUser) {
			//@TODO this should be moved to common/twilio/worker.js then await the response
			getTwilioWorkerAttributes(this.state.user.twilio.workerSID)
				.then(response => {
					//console.log(response);

					const user = {
						...currentUser,
						twilio: {
							...currentUser.twilio,
							attributes: response
						},
					};

					//console.log('get Twilio Attr updatedUser ->', user);
					this.setState({user});
				})
				.catch(error => {
					console.log('get twilio d error ->', error);
				});
		}
	}

	authenticationHandler = () => {
		mock.onGet('/cig-api-url/user-auth')
			.reply(200, {
				isAuthenticated: true,
				isAdmin: true,
				workerSID: 1138,
			});

		axios.get('/cig-api-url/user-auth')
			.then(response => {
				//console.log('CIG API Auth response ->', response.data);

				/* User is authenticated, update state to reflect and also fetch twilio data */
				if (response.data.isAuthenticated) {
					const user = {
						...this.state.user,
						isAuthenticated: response.data.isAuthenticated,
						isAdmin: response.data.isAdmin,
						twilio: {
							...this.state.user.twilio,
							workerSID: response.data.workerSID,
						},
					};

					//console.log('auth handler user ->', user);

					//@TODO this will be overwritten if, getTwilioData is successful
					//@TODO which is why getTwilioData being passed the user object
					this.setState({user});
					this.getTwilioData(user);
				} else {
					// Display API error message or handle this with a catch
				}
			})
			.catch(error => {
				console.log('auth handler error ->', error);
			});
	}

	/**
	 * Used in the ActionBar controller
	 * @TODO eventually MobX can handle this?
	 */
	activityChangeHandler = event => {
		//@TODO import function that makes twilio api call
		//@TODO await it's response
		const activity = event.target.value;
		//console.log(activity);

		const user = {
			...this.state.user,
			twilio: {
				...this.state.user.twilio,
				activity,
			},
		};

		//console.log(user);
		this.setState({user});
	}


	render() {

		return (
			<div className={classes.App}>
				<Layout user={this.state.user} activityChangeHandler={this.activityChangeHandler}>
					<Switch>
						{/* Login Route */}
						<Route path="/login" exact render={
							props => (
								<Auth {...props}
									isAuthenticated={this.state.user.isAuthenticated}
									authenticationHandler={() => this.authenticationHandler()} />)} />

						{/* Catch all for non-authenticated users redirect to /login */}
						{this.state.user.isAuthenticated ? null : <Redirect path="/" to="/login" />}

						{/* Dashboard Route */}
						<Route path="/dashboard" exact component={Dashboard} />

						{/* Call Center Route */}
						<Route path="/call-center" exact component={CallCenter} />

						{/* Logout Route //@TODO not sure this is needed  */}
						{/* <Route path="/logout" exact component={Logout} /> */}

						{/* Settings Route //@TODO not sure this is needed  */}
						{/* <Route path="/settings" exact component={Settings} /> */}

						{/* Catch All for auth'd users redirect to /dashboard */}
						<Redirect path="/" to="/dashboard" />
					</Switch>
				</Layout>

				{/* MobX Dev Tools */}
				{ process.env.NODE_ENV === 'development' ?  <DevTools /> : null }
			</div>
		);
	}
}

export default withRouter(App);