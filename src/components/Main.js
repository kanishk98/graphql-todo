import React from 'react';
import { Redirect } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import { todos } from '../graphql';
import { client } from '../index';
import firebase from 'firebase';
import Constants from '../Constants';
import '../styles/Main.css';
import { postAxios } from '../AxiosUtility';

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

	_onKeyPressed = ({key}) => {
		if (key == 'Enter' && !!this.state.text) {
			this.sendToDB();
		}
	}

	sendToDB = () => {
		// add API post logic here
		console.log('sending to db');
	};

	async componentDidMount() {
		const result = await postAxios(todos);
		console.log(result);
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
						<Button onClick={this._onSubmitTodo}>Add to-do</Button>
					</InputGroupAddon>
				</InputGroup>
				<br />
			</div>
		);
	}
}
