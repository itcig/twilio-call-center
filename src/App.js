import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import Auth from './components/Auth/Auth';

//@TODO should logic for routing if the user is auth'd be here
//@TODO or should the Auth component redirect?
// if handled by Auth component then the state here doesn't matter
//* could default to /login and let it redirect if user is auth'd

class App extends Component {
	state = {
		userAuthenticated: false,
	};

	render() {
		return (
			<div className={classes.App}>
				<Layout>
					<Switch>
						<Route path="/login" component={Auth} />
						<Redirect path="/" exact to="/login" />
					</Switch>
				</Layout>

				<DevTools />
			</div>
		);
	}
}

export default App;
