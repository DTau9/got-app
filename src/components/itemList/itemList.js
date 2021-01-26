import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const StyledItem = styled.li.attrs(props => ({
	className: props.className
}))`
	cursor: pointer;
`;

const StyledList = styled.ul.attrs(props => ({ className: props.className }))`
	background-color: #fff;
`;

export default function ItemList({ getData, onItemSelected, renderItem }) {

	const [itemList, updateList] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		getData()
			.then((data) => {
				updateList(data)
			},
				(error) => {
					setError(true);
				})

		return () => {
			setError(false);
		}
	}, [])

	function renderItems(arr) {
		return arr.map(item => {
			const { id } = item;

			const label = renderItem(item);

			return (
				<StyledItem
					key={id}
					className='list-group-item'
					onClick={() => onItemSelected(id)}>
					{label}
				</StyledItem>
			)
		})
	}

	if (itemList.length === 0 && !error) {
		return <Spinner />
	}

	const content = !error ? renderItems(itemList) : <ErrorMessage />;

	return (
		<StyledList className="item-list list-group">
			{content}
		</StyledList>
	)
}