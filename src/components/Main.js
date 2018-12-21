import React from 'react';
import { Redirect } from 'react-router-dom';
import TodoInput from './TodoInput';
import Constants from '../Constants';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		}
	}

	componentDidMount() {
		// TODO: API call for fetching items
	}

	render() {
		if (window.localStorage.getItem(Constants.LOGGED_IN) != 'yes') {
			// redirect user to login page
			return <Redirect to="/login" />;
		}
		return <TodoInput list={this.state.list} />;
	}
}
