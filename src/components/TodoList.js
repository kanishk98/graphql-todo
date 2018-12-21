import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default class TodoList extends React.Component {

	render() {
		if (!this.props.list) {
			return null;
		}
		const {list} = this.props;
		return (
			<ListGroup>
				list.map(item => {
					<ListGroupItem tag="button" action>item.text</ListGroupItem>
				});
			</ListGroup>
		);
	}
}