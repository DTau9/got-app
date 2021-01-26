import React, { Component } from 'react';
import gotServices from '../../services/gotServices';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {
	gotServices = new gotServices();
	render() {
		return (
			<ItemDetails
				selectedItemId={this.props.bookId}
				getData={this.gotServices.getBook}>
				<Field field='numberOfPages' label='Number of pages' />
				<Field field='publisher' label='Publisher' />
				<Field field='released' label='Released' />
			</ItemDetails>
		)
	}
}