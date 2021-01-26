import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotServices from '../../services/gotServices';
import { withRouter } from 'react-router-dom';

class booksPage extends Component {
	gotServices = new gotServices();

	state = {
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}

		return (
			<ItemList
				onItemSelected={(itemId) => {
					this.props.history.push(itemId)
				}}
				getData={this.gotServices.getAllBooks}
				renderItem={(item) => item.name} />
		)
	}
}
export default withRouter(booksPage);