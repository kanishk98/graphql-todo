import gql from 'graphql-tag';

export const todos = gql`
	query {
		todos(order_by: [date_desc]) {
			id
			text
			date
			completed
		}
	}
`;

export const insert_todo = gql`
	mutation($text: String!, $date: String!, $userId: ID!) {
		insert_todos(objects: [{ text: $text, date: $date, userId: $userId }]) {
			affected_rows
		}
	}
`;
