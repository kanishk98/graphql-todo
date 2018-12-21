export const todos = `
	query {
		todos {
			todoId
			userId
			text
			date
			completed
		}
	}`;

export const insert_todo = `
	mutation($todoId: String!, $text: String!, $date: String!, $userId: String!) {
		insert_todos(objects: [{ todoId: $todoId, text: $text, date: $date, userId: $userId }]) {
			affected_rows
		}
	}
`;

export const insert_user = `
	mutation($userId: String!, $email: String!, $name: String, $profilePic: String) {
		insert_users(objects: [{ userId: $userId, email: $email, name: $name, profilePic: $profilePic }]) {
			affected_rows
		}
	}
`
