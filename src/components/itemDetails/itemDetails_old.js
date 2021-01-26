import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const DetailsItemContainer = ({ className, children }) => (
	<div className={className}>
		{children}
	</div>
);

const StyledDetailsItemContainer = styled(DetailsItemContainer)`
	background-color: #fff;
	padding         : 25px 25px 15px 25px;
	margin-bottom   : 40px;
	h4 {
		margin-bottom: 20px;
		text-align   : center;
	}
`;

const ErrorSelectChar = styled.span`
	color     : #fff;
	text-align: center;
	font-size : 26px;
`;

const Field = ({ detailsItem, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{detailsItem[field]}</span>
		</li>
	)
}

export {
	Field
}

export default class ItemDetails extends Component {

	state = {
		detailsItem: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.updateItemDetails();
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedItemId !== prevProps.selectedItemId) {
			this.updateItemDetails();
			this.setState({
				loading: true
			})
		}
	}

	onDetailsItemLoaded = (detailsItem) => {
		this.setState({
			detailsItem: detailsItem,
			loading: false
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
		console.log(this.state);
	}

	updateItemDetails() {
		const { selectedItemId, getData } = this.props;
		if (!selectedItemId) {
			return;
		}

		getData(selectedItemId)
			.then(this.onDetailsItemLoaded)
			.catch(this.onError);
	}

	render() {

		if (!this.state.detailsItem) {
			return <ErrorSelectChar>Please select a character</ErrorSelectChar>
		}

		const { detailsItem, loading, error } = this.state;
		const { name } = detailsItem;
		const ContentBlock = () => {
			return (
				<>
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						{
							React.Children.map(this.props.children, (child) => {
								return React.cloneElement(child, { detailsItem })
							})
						}
					</ul>
				</>
			)
		}

		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? <ContentBlock /> : null;

		return (
			<StyledDetailsItemContainer
				className='rounded'>
				{spinner}
				{errorMessage}
				{content}
			</StyledDetailsItemContainer>

		);
	}
}
