import React from 'react';
import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';

export default class TodoInput extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			text: null,
		}
	}

	_onChangeText = ({target}) => {
		this.setState({text: target.value});
	}

	_onSubmitTodo = () => {
		if (!!this.state.text) {
			this.sendToDB();
		}
	}

	sendToDB = () => {
		// add API post logic here
	}

	render() {
		return (
			<div>
				<InputGroup>
					<Input placeholder={"What are you up to?"} onChange={e=>this._onChangeText(e)} />
					<InputGroupAddon addonType="append"><Button onClick={this._onSubmitTodo}>Add to-do</Button></InputGroupAddon>
				</InputGroup>
				<br />
			</div>
		);
	}
}