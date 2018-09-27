import React, { Component } from 'react';
import classes from './App.css';
import DevTools from 'mobx-react-devtools';

class App extends Component {
	state = {

	}

	render() {
		return (
			<div className={classes.App}>

				<DevTools />
			</div>
		);
	}
}

export default App;
