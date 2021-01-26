import React, { Component } from 'react';
import styled from 'styled-components';
import gotServices from '../../services/gotServices';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

const RandomBlock = ({ className, children }) => (
	<div className={className}>
		{children}
	</div>
);

const StyledRandomBlock = styled(RandomBlock)`
	background-color: #fff;
	padding         : 25px 25px 15px 25px;
	margin-bottom   : 40px;
	h4 {
		margin-bottom: 20px;
		text-align   : center;
	}
	img {
		width: 100%;
	}
`;



const Term = styled.span`
	font-weight: bold;
`;

export default class RandomChar extends Component {
	gotServices = new gotServices();
	state = {
		char: {},
		loading: true,
		error: false
	}
	// новый синтаксис пропсов по-умолчанию
	static defaultProps = {
		interval: 3000
	}


	componentDidMount() {
		this.updateCharacter();
		this.timerId = setInterval(this.updateCharacter, this.props.interval);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateCharacter = () => {
		const id = Math.floor(Math.random() * 140 + 25); // 25-140

		this.gotServices.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {

		const { char, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} /> : null;

		return (
			<>
				{errorMessage}
				{spinner}
				{content}
			</>
		);
	}
}
// действующий синтаксис пропсов по-умолчанию
RandomChar.defaultProps = {
	interval: 3000
}

RandomChar.propTypes = {
	interval: PropTypes.number
}

const View = (props) => {
	const { name, gender, born, died, culture } = props.char;
	return (
		<StyledRandomBlock
			className='rounded'>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<Term>Gender</Term>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<Term>Born</Term>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<Term>Died</Term>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<Term>Culture</Term>
					<span>{culture}</span>
				</li>
			</ul>
		</StyledRandomBlock>
	)
};