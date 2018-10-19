// Followed this guide -- https://www.twilio.com/blog/react-app-with-node-js-server-proxy
// https://github.com/philnash/react-express-starter/tree/twilio

const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const pino = require('express-pino-logger')();
const app = express();
const port = process.env.PORT || 3001;

app.use(sessions({
	resave: true,
	saveUninitialized: false,
	secret: 'keyboard cat',
	name: 'twilio_call_center_session',
	cookie: {maxAge: 3600000},
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

/* Reformat Errors */
//@TODO this is from the original repo, not sure if it's needed
app.use((req, res, next) => {
	const replaceErrors = (key, value) => {
		if (value instanceof Error) {
			const error = {};
			Object.getOwnPropertyNames(value).forEach(key => {
				error[key] = value[key];
			});
			return error;
		}
		return value;
	};

	res.convertErrorToJSON = error => {
		console.log(error);
		return JSON.stringify(error, replaceErrors);
	};
	next();
});

// /* Set Request props */
// app.use((req, res, next) => {

// })

/* Routes */
const taskrouterRouter = require('./routes/taskrouter.router.js');
app.use('/taskrouter', taskrouterRouter);

const agentsRouter = require('./routes/agents.router.js');
app.use('/agents', agentsRouter);

app.listen(port, () =>
  console.log('Express server is running on localhost:3001')
);