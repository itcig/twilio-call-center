const express = require('express');
const router = express.Router();
const Twilio = require('twilio');
const AccessToken = Twilio.jwt.AccessToken;
const TaskRouterCapability = Twilio.jwt.taskrouter.TaskRouterCapability
const client = new Twilio(process.env.REACT_APP_TWILIO_ACCOUNT_SID, process.env.REACT_APP_TWILIO_AUTH_TOKEN);

//@TODO this shouldn't need to be accessed in React anymore so the preface can be removed from .env and updated here.
const workspaces = client.taskrouter.workspaces(process.env.REACT_APP_TWILIO_WORKSPACE_SID);

/* TTL for all tokens */
const lifetime = 3600 // @TODO should the ttl be increased?

/**
 * Create Workspace Policy
 * https://www.twilio.com/docs/taskrouter/js-sdk/workspace
 * @param {*} options
 */
const buildWorkspacePolicy = options => {
	options = options || {}
	const resources = options.resources || [];
	const urlComponents = ['https://taskrouter.twilio.com', 'v1', 'Workspaces', process.env.REACT_APP_TWILIO_WORKSPACE_SID];

	return new TaskRouterCapability.Policy({
		url: urlComponents.concat(resources).join('/'),
		method: options.method || 'GET',
		allow: true
	});
};

/**
 * Create a Worker token good for 1 hour
 * https://www.twilio.com/docs/taskrouter/js-sdk/worker
 * @param {string|int} workerSid
 */
const createWorkerTaskrouterCapabilityToken = workerSid => {
	const workerCapability = new TaskRouterCapability({
		accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
		authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
		workspaceSid: process.env.REACT_APP_TWILIO_WORKSPACE_SID,
		channelId: workerSid,
		ttl: lifetime,
	});

	const eventBridgePolicies = Twilio.jwt.taskrouter.util.defaultEventBridgePolicies(process.env.REACT_APP_TWILIO_ACCOUNT_SID, workerSid)

	const workspacePolicies = [
		buildWorkspacePolicy(), // Workspace fetch Policy
		buildWorkspacePolicy({resources: ['**']}), // Workspace sub-resources fetch Policy
		buildWorkspacePolicy({resources: ['**'], method: 'POST'}), // Workspace resources update Policy
	];

	eventBridgePolicies.concat(workspacePolicies).forEach(policy => workerCapability.addPolicy(policy));

	return workerCapability;
};

/**
 * Create the token required for workers to make calls
 * https://www.twilio.com/docs/iam/access-tokens
 * https://www.twilio.com/docs/voice/client/capability-tokens
 * @param {*} configuration
 * @param {*} worker
 * @param {*} endpoint
 */
const createWorkerTokens = (applicationSid, worker, endpoint) => {
	const workerCapability = createWorkerTaskrouterCapabilityToken(worker.sid); // create a token for Twilio TaskRouter
	const ClientCapability = Twilio.jwt.ClientCapability; // create a token for Twilio Client
	const clientName = worker.friendlyName.toLowerCase();

	const phoneCapability = new ClientCapability({
		accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
		authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
		ttl: lifetime
	});

	phoneCapability.addScope(new ClientCapability.IncomingClientScope(clientName));
	//@TODO test removing the keys of the object argument
	phoneCapability.addScope(new ClientCapability.OutgoingClientScope({
			applicationSid: applicationSid,
			clientName: clientName,
		}));

	const accessToken = new AccessToken(
		process.env.REACT_APP_TWILIO_ACCOUNT_SID,
		process.env.REACT_APP_TWILIO_API_KEY_SID,
		process.env.REACT_APP_TWILIO_API_KEY_SECRET,
		{ttl: lifetime},
	);
	accessToken.identity = worker.friendlyName;

	return {worker: workerCapability.toJwt(), phone: phoneCapability.toJwt()};
}

/**		~~ /agents/login ~~
 * Retrieve Worker data using the worker friendlyName, create tokens and set session data
 */
router.post('/login', async (req, res) => {
	try {
		const friendlyName = req.body.worker.friendlyName;
		const filter = {friendlyName};
		const workers = await workspaces.workers.list(filter);

		for (let worker of workers) {
			if (worker.friendlyName === friendlyName) {
				const tokens = await createWorkerTokens(
						process.env.REACT_APP_TWILIO_APP_SID,
						worker,
						req.body.endpoint
					);

				req.session.tokens = tokens;
				req.session.worker = {
					sid: worker.sid,
					friendlyName: worker.friendlyName,
					attributes: worker.attributes
				};

				// res.status(200).send(JSON.stringify({d: "new d"}));
				res.status(200).end();
				return;
			}
		}

		res.status(404).end();
	} catch (error) {
		res.status(500).send(res.convertErrorToJSON(error));
	}
});

/**		~~ /agents/logout ~~
 *
 */
router.post('/logout', async (req, res) => {
	try {

	} catch (error) {
		res.status(500).send(error);
	}
});

/**		~~ /agents/session ~~
 *
 * If there is session data send it
 */
router.get('/session', async (req, res) => {
	if (!req.session.worker) {
		res.status(403).end()
	} else {
		res.status(200).json({
			tokens: req.session.tokens,
			worker: req.session.worker,
			configuration: {
				twilio: req.configuration.twilio
			}
		})
	}
});

module.exports = router;