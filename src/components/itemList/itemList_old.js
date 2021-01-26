import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import gotServices from '../../services/gotServices';


const StyledItem = styled.li.attrs(props => ({
	className: props.className
}))`
	cursor: pointer;
`;

const ItemList = (props) => {

	const items = props.data.map((item) => {
		const { id } = item;
		const label = props.renderItem(item);
		return (
			<StyledItem
				key={id}
				className="list-group-item"
				onClick={() => props.onItemSelected(id)}
			>
				{label}
			</StyledItem>
		)
	})

	return (
		<ul className="item-list list-group">
			{items}
		</ul>
	);

}

const withData = (View, getData) => {
	return class extends Component {
		state = {
			data: null,
			error: false
		}

		static defaultProps = {
			onItemSelected: () => { }
		}

		static propTypes = {
			onItemSelected: PropTypes.func
		}

		componentDidMount() {
			getData()
				.then((data) => {
					this.setState({
						data,
						error: false
					});
				})
				.catch(() => { this.onError() })
		}

		componentDidCatch() {
			this.setState({
				data: null,
				error: true
			});
		}

		onError() {
			this.setState({
				data: null,
				error: true
			})
		}

		render() {
			const { data, error } = this.state;

			if (error) {
				return <ErrorMessage />
			}

			if (!data) {
				return <Spinner />
			}

			return <View {...this.props} data={this.state.data} />
		}
	}
}

const { getAllCharacters } = new gotServices();

export default withData(ItemList, getAllCharacters);

