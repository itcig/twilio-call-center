import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import classes from './App.css';
import  axios from 'axios';

import  MockAdapter from 'axios-mock-adapter'; //@TODO remove this for production

import Layout from './hoc/Layout/Layout';
import Auth from './components/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard';

const mock = new MockAdapter(axios, {delayResponse: 2000});

class App extends Component {
	state = {
		user: {
			isAuthenticated: false,
			status: null,
		},
	};

	authenticationHandler = () => {
		console.log('Make API Call -> If Successfully Authenticated Update State');

		mock.onGet('/cig-api-url')
			.reply(200, {
				authenticated: true
			});

		axios.get('/cig-api-url')
			.then(response => {
				console.log(response);
				this.setState({user: {isAuthenticated: response.data.authenticated}});
			});

		// if (true) {
		// 	this.setState({user: {userAuthenticated: true}});
		// 	return true;
		// } else {
		// 	return false;
		// }
	}


	render() {
		// If the user is not authenticated route to the login view
		const baseRoute = this.state.user.isAuthenticated ? '/dashboard' : '/login';

		return (
			<div className={classes.App}>
				<Layout>
					<Switch>
						{/* Base route will redirect to /login or /dashboard based on user's authentication */}
						<Redirect path="/" exact  to={baseRoute} />

						{/* If the user is authenticated and trying to access /login redirect them to the /dashboard */}
						{this.state.user.isAuthenticated ? <Redirect path="/login" exact to="/dashboard" /> : null}

						{/* If the user is NOT authenticated and trys to access the /dashboard view redirect to /login */}
						{this.state.user.isAuthenticated ? null : <Redirect path="/dashboard" exact to="/login" />}

						{/* Login Route */}
						<Route path="/login" exact render={
							props => (
								<Auth {...props}
									isAuthenticated={this.state.user.userAuthenticated}
									authenticationHandler={() => this.authenticationHandler()} />)} />

						{/* Dashboard Route */}
						<Route path="/dashboard" exact component={Dashboard} />

						{/* Catch All */}
						<Redirect path="/" to={baseRoute} />
					</Switch>
				</Layout>

				<DevTools />
			</div>
		);
	}
}

export default withRouter(App);
