import React from 'react';
import { Redirect } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { todos } from '../graphql';
import { client } from '../index';
import Constants from '../Constants';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			text: null
		};
	}

	_onChangeText = ({ target }) => {
		this.setState({ text: target.value });
	};

	_onSubmitTodo = () => {
		if (!!this.state.text) {
			this.sendToDB();
		}
	};

	sendToDB = () => {
		// add API post logic here
		console.log('sending to db');
	};

	componentDidMount() {
		client
			.query({
				query: todos, options: {
					context: {
						headers: {
							'Content-Type': 'application/json'
						}
					}
				}
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		if (window.localStorage.getItem(Constants.LOGGED_IN) != 'yes') {
			// redirect user to login page
			return <Redirect to="/login" />;
		}
		return (
			<>
				<InputGroup>
					<Input
						placeholder={'What are you up to?'}
						onChange={e => this._onChangeText(e)}
					/>
					<InputGroupAddon addonType="append">
						<Button onClick={this._onSubmitTodo}>Add to-do</Button>
					</InputGroupAddon>
				</InputGroup>
				<br />
			</>
		);
	}
}
