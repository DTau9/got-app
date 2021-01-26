import React, { useState, useEffect } from 'react';
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

/* const ErrorSelectChar = styled.span`
	color     : #fff;
	text-align: center;
	font-size : 26px;
`; */

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

export default function ItemDetails({ selectedItemId, getData, children }) {

	const [detailsItem, setDetailsItem] = useState([]);
	const [spinner, setSpinnner] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!selectedItemId) {
			return;
		}

		getData(selectedItemId)
			.then((data) => {
				setDetailsItem(data);
				setSpinnner(false);
			},
				(error) => {
					setError(true);
					setSpinnner(false);
				})

		return () => {
			setError(false)
			setSpinnner(true);
		}

	}, [selectedItemId])

	const { name } = detailsItem;
	const ContentBlock = () => {
		return (
			<>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(children, (child) => {
							return React.cloneElement(child, { detailsItem })
						})
					}
				</ul>
			</>
		)
	}

	/* if (detailsItem.length === 0) {
		return <ErrorSelectChar>Please select a character</ErrorSelectChar>
	} */

	const showError = error ? <ErrorMessage /> : null;
	const showSpinner = spinner ? <Spinner /> : null;
	const content = !(error || spinner) ? <ContentBlock /> : null;

	return (
		<StyledDetailsItemContainer
			className='rounded'>
			{content}
			{showSpinner}
			{showError}
		</StyledDetailsItemContainer>
	);
}