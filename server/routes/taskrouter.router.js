const express = require('express');
const router = express.Router();
const Twilio = require('twilio');
const client = new Twilio(process.env.REACT_APP_TWILIO_ACCOUNT_SID, process.env.REACT_APP_TWILIO_AUTH_TOKEN);

//@TODO this shouldn't need to be accessed in React anymore so the preface can be removed from .env and updated here.
const workspaces = client.taskrouter.workspaces(process.env.REACT_APP_TWILIO_WORKSPACE_SID);

/* full route /taskrouter/activities */
router.get('/activities', async (req, res) => {
	try {
		const activities = await workspaces.activities.list();
		const payload = [];
		for (let item of activities) {
			const activity = {
				sid: item.sid,
				friendlyName: item.friendlyName,
			}

			payload.push(activity)
		}
		res.status(200).send(payload);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;