const express = require('express');
const emails = require('./emails');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	// obtain data inserted
	const insertedTodo = req.body.event.data.new;
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: emails.to,
		from: emails.from,
		subject: 'Kanishk\'s GraphQL To-Do app',
		text: 'You added a todo that says ' + insertedTodo.text + ' with an ID = ' + insertedTodo.todoId;
	};
	sgMail.send(msg)
	.then(resolve => {
		res.sendStatus(200);
	})
	.catch(error => {
		console.log(error);
		res.sendStatus(500);
	})
});

app.listen(5000, () => console.log('Emailing service listening on port 5000'));
