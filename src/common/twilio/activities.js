// import  axios from 'axios';
// import  MockAdapter from 'axios-mock-adapter'; //@TODO remove this for production
// const mock = new MockAdapter(axios, {delayResponse: 2000}); //@TODO remove this for production


export const getTwilioActivities = taskRouterSID => {

	//@TODO remove this later
	const activities = ['ready', 'busy', 'lunch', 'meeting'];

	// mock.onGet(`/cig-api-url/twilio/taskrouter/:${taskRouterSID}/activities`)
	// 	.reply(200, {
	// 		activities: activities,
	// 	});

	// axios.get(`/cig-api-url/twilio/taskrouter/:${taskRouterSID}/activities`)
	// 	.then(response => {
	// 		console.log('Twilo Activities ->', response.data.activities);
	// 		return response.data.activities;
	// 	});

	return activities;
};

export default getTwilioActivities;