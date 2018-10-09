// import  axios from 'axios';
// import  MockAdapter from 'axios-mock-adapter'; //@TODO remove this for production
//const mock = new MockAdapter(axios, {delayResponse: 2000}); //@TODO remove this for production

/**
 * Get Worker Attributes (free from JSON field in twilio console)
 */
export const getTwilioWorkerAttributes = async workerSID => {

	//@TODO remove this test data
	const worker = {
		name: 'Jeff Goldblum',
		contact_uri: 'client:jgoldblum',
		queues: ['id_orders', 'id_general'],
		languages: ['english', 'spanish'],
		id_orders_level: 1,
		id_general_level: 5,
		id_weso_level: 0,
		bmd_general_level: 0,
		bmd_orders_level: 0
	};

	// mock.onGet(`/cig-api-url/twilio/worker/:${workerSID}`)
	// 	.reply(200, worker);

	// axios.get(`/cig-api-url/twilio/worker/:${workerSID}`)
	// 	.then(response => {
	// 		console.log('Twilio Worker Attributes ->', response.data);
	// 		return response.data;
	// 	})
	// 	.catch(error => {
	// 		console.log('get attri error ->', error);
	// 	});

	return worker;
};

/**
 * Get a Worker's stats
 */
export const getTwilioWorkerStats = workerSID => {
	// do stuff
};

/**
 * Add a new Worker
 */
export const createTwilioWorker = () => {
	// do stuff
};

/**
 * Update an existing Worker
 */
export const updateTwilioWorker = workerSID => {
	// do stuff
};

/**
 * Delete a Worker
 */
export const deleteTwilioWorker = workerSID => {
	// do stuff
};


/* **** Multiple Workers **** */

/**
 * Get all Workers for a given queue
 */
export const getTwilioWorkers = () => {
	// do stuff
};

/**
 * Get all Worker's stats
 */
export const getTwilioWorkersStats = () => {
	// do stuff
};

export default getTwilioWorkerAttributes;