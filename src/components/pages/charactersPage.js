import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotServices from '../../services/gotServices';
import RowBlock from '../rowBlock';

export default class CharactersPage extends Component {
	gotServices = new gotServices();

	state = {
		selectedCharId: 130,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedCharId: id
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotServices.getAllCharacters}
				renderItem={({ name, gender }) => `${name} - ${gender}`} />
		)

		const charDetails = (
			<ItemDetails
				selectedItemId={this.state.selectedCharId}
				getData={this.gotServices.getCharacter}>
				<Field field='gender' label='Gender' />
				<Field field='born' label='Born' />
				<Field field='died' label='Died' />
				<Field field='culture' label='Culture' />
			</ItemDetails>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)

	}
}