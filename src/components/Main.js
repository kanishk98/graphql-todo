import React from 'react';
import { Redirect } from 'react-router-dom';
import {
	InputGroup,
	InputGroupAddon,
	Input,
	Button,
	ListGroupItem,
	ListGroup
} from 'reactstrap';
import { Query } from 'react-apollo';
import { todos, insert_todo } from '../graphql';
import { client } from '../index';
import firebase from 'firebase';
import Constants from '../Constants';
import '../styles/Main.css';
import { postAxios, generateUUID } from '../AxiosUtility';
import { renderIf } from '../renderIf';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			text: null
		};
	}

	getIdToken = async () => {
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					resolve(firebase.auth().currentUser.getIdToken());
				} else {
					reject(Error('user logged out'));
				}
			});
		});
	};

	_onChangeText = ({ target }) => {
		this.setState({ text: target.value });
	};

	_onSubmitTodo = () => {
		if (!!this.state.text) {
			this.sendToDB();
		}
	};

	_onKeyPressed = ({ key }) => {
		if (key == 'Enter' && !!this.state.text) {
			this.sendToDB();
		}
	};

	sendToDB = async () => {
		const { text } = this.state;
		const date = String(new Date().getTime());
		const todoId = generateUUID();
		console.log(todoId);
		const userId = JSON.parse(
			window.localStorage.getItem(Constants.USER_OBJECT)
		).uid;
		const item = {
			todoId: todoId,
			text: text,
			date: date,
			userId: userId
		};
		const result = postAxios(insert_todo, item)
			.then(res => {
				console.log(res);
				let { list } = this.state;
				list.splice(0, 0, item);
				this.setState({ list: list });
			})
			.catch(err => {
				console.log(err);
				// TODO: Make error banner render at this time
			});
	};

	_toggleCompletion = (item, index) => {
		item.completed = true;
		let { list } = this.state;
		list.splice(index, 1, item);
		this.setState({ list: list });
	};

	async componentDidMount() {
		const result = await postAxios(todos);
		console.log(result);
		this.setState({ list: result.data.data.todos });
	}

	render() {
		if (window.localStorage.getItem(Constants.LOGGED_IN) != 'yes') {
			// redirect user to login page
			return <Redirect to="/login" />;
		}
		return (
			<div className="input">
				<InputGroup>
					<Input
						placeholder={'What are you up to?'}
						onChange={e => this._onChangeText(e)}
						onKeyDown={e => this._onKeyPressed(e)}
					/>
					<InputGroupAddon addonType="append">
						<Button onClick={this._onSubmitTodo} color="success">
							Add to-do
						</Button>
					</InputGroupAddon>
				</InputGroup>
				<br />
				<ListGroup>
					{this.state.list.map((item, index) => {
						if (item.completed) {
							return (
								<ListGroupItem key={item.todoId}>
									<div
										onClick={event =>
											this._toggleCompletion(item, index)
										}
									>
										<del>{item.text}</del>
									</div>
								</ListGroupItem>
							);
						} else {
							return (
								<ListGroupItem key={item.todoId}>
									<div
										onClick={event =>
											this._toggleCompletion(item, index)
										}
									>
										{item.text}
									</div>
								</ListGroupItem>
							);
						}
					})}
				</ListGroup>
			</div>
		);
	}
}
