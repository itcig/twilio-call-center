//import axios from 'axios';
//import https from 'https';

export const getSubscriberByPhoneNumber = phoneNumber => {

	//@TODO this may only be needed for local also needs to be updated for client side use
	// const instance = axios.create({
	// 	httpsAgent: new https.Agent({
	// 		rejectUnauthorized: false
	// 	})
	// });

	//@TODO remove this later
	//phoneNumber = phoneNumber || 7033177159;// <-- Brad's Number hehe

	//@TODO 404s on local, but works in the browser
	//console.log(`${process.env.REACT_APP_API_URL}/id/person/find?phone=${phoneNumber}&apiuser=${process.env.REACT_APP_APIUSER}&apimd5pass=${process.env.REACT_APP_APIMD5PASS}`);
	//const testURL = `${process.env.REACT_APP_API_URL}/id/person/find?phone=${phoneNumber}&apiuser=${process.env.REACT_APP_APIUSER}&apimd5pass=${process.env.REACT_APP_APIMD5PASS}`;
	// axios.get(testURL)
	// 	.then(response => console.log('response', response))
	// 	.catch(error => console.log('error', error));


	// instance.get(`${process.env.REACT_APP_API_URL}/id/person/find?phone=${phoneNumber}&apiuser=${process.env.REACT_APP_APIUSER}&apimd5pass=${process.env.REACT_APP_APIMD5PASS}`)
	// 	.then(response => {
	// 		console.log('Get Subscriber Success', response.data);
	// 		return response.data;
	// 	})
	// 	.catch(error => {
	// 		console.log('Error: ' + error.message);
	// 		return error.message;
	// 	});

	//@TODO remove this later
	const subscriber = {
		changedate: '2018-05-07 10:17:26',
		companyname: 'Odwalla',
		companyid: '1947316',
		personid: '2055200',
		honorific: '',
		initials: '',
		forename: 'Brad',
		surname: 'Ashe',
		jobtitle: 'Captain',
		departmentlabel: '',
		addressid: '2047463',
		addressline1: '2854 James Ave S',
		addressline2: '',
		addressline3: '',
		addressline4: '55408-1822',
		town: 'Minneapolis',
		region: 'MN',
		postalcode: '55408-1822',
		countrycode: '0',
		countryname: 'UNITED STATES',
		email: 'bash@capinfogroup.com',
		telephone_number: '703-905-4547',
		fax_number: '7033177159',
		fullname: 'Brad Ashe',
		donotrent: '0',
		donotpromote: '0',
		gender: 'M',
		donotadvance: '0',
		donotemail: '0',
		emailsource: 'UNK',
		pguid: 'C25D766864044E418D900C2A029010F1',
		isactive: '1',
		truepersonid: '2055200',
		addressline: '2854 James Ave S',
		geographicid: '11',
		addressstatuscode: '',
		isorphan: '0',
		privacycode: ''
	};

	const subscriberTwo = {
		changedate: '2018-05-07 10:17:26',
		companyname: 'Do You See What Happen\'s Larry?',
		companyid: '1138',
		personid: '10001110101',
		honorific: '',
		initials: 'JSG',
		forename: 'John',
		surname: 'Goodman',
		jobtitle: 'Bowler',
		departmentlabel: '',
		addressid: '2047463',
		addressline1: '742 Evergreen Terrace',
		addressline2: '#1',
		addressline3: 'address line 3!',
		addressline4: '01101',
		town: 'Springfield',
		region: 'MA',
		postalcode: '01101',
		countrycode: '0',
		countryname: 'UNITED STATES',
		email: 'heres_johnny@capinfogroup.com',
		telephone_number: '206-867-5309',
		fax_number: '2068675309',
		fullname: 'John Goodman',
		donotrent: '0',
		donotpromote: '0',
		gender: 'M',
		donotadvance: '0',
		donotemail: '0',
		emailsource: 'UNK',
		pguid: 'C25D766864044E418D900C2A029010F1',
		isactive: '1',
		truepersonid: '2055200',
		addressline: '742 Evergreen Terrace',
		geographicid: '11',
		addressstatuscode: '',
		isorphan: '0',
		privacycode: ''
	};

	//return subscriber;
	return subscriberTwo;
};

export default getSubscriberByPhoneNumber;