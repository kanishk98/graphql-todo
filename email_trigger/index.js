const express = require('express');
const emails = require('./emails');
const app = express();
const admin = require('firebase-admin');
const serviceAccountKey = require('./service_account_key.json');
const config = require('./config');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccountKey),
	databaseURL: config.databaseURL
});
admin
	.auth()
	.getUser('vWN6GcLLQAYiN2HOaV3HkULSNgx2')
	.then(userRecord => console.log(userRecord.toJSON()))
	.catch(err => console.log(err));

app.use(express.json());

app.post('/', (req, res) => {
	// obtain data inserted
	const insertedTodo = req.body.event.data.new;
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	admin
		.auth()
		.getUser(insertedTodo.userId)
		.then(userRecord => {
			const userEmail = userRecord.toJSON().email;
			const msg = {
				to: emails.to,
				from: emails.from,
				subject: "Kanishk's GraphQL To-Do app",
				text:
					'You added a todo that says ' +
					insertedTodo.text +
					' with an ID = ' +
					insertedTodo.todoId
			};
			sgMail
				.send(msg)
				.then(resolve => {
					res.sendStatus(200);
				})
				.catch(error => {
					console.log(error);
					res.sendStatus(500);
				});
		})
		.catch(error => console.log(error));
});

app.listen(3000, () => console.log('Emailing service listening on port 3000'));
