const functions = require('firebase-functions');
const emails = require('./emails');

exports.helloWorld = functions.https.onRequest((request, response) => {
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: emails.to,
		from: emails.from,
		subject: 'Hasura to-do',
		text: 'Notifications are painful'
	};
	sgMail.send(msg);
	response.send('Message sent');
});
