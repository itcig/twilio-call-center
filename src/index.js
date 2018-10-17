import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
