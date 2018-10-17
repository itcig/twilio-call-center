const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const taskrouterRouter = require('./routes/taskrouter.router.js');

app.use('/taskrouter', taskrouterRouter);

const Twilio = require('twilio');
const client = new Twilio(process.env.REACT_APP_TWILIO_ACCOUNT_SID, process.env.REACT_APP_TWILIO_AUTH_TOKEN);


app.get('/twilio/activities', (req, res) => {

  client.taskrouter.workspaces(process.env.REACT_APP_TWILIO_WORKSPACE_SID).activities.list()
		.then(activities => {
			const payload =[]

			for (let item of activities) {
				const activity = {
					sid: item.sid,
					friendlyName: item.friendlyName,
				}

				payload.push(activity)
			}
			res.status(200).send(payload);
		}).catch(error => {
			res.status(500).send(error);
		});
});

app.listen(port, () =>
  console.log('Express server is running on localhost:3001')
);