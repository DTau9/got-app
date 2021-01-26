import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import { CharactersPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotServices from '../../services/gotServices';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import imgGot from './got.jpeg';
import imgThrone from './throne.jpg';

const SecondBackground = styled.div`
	background-image:  url(${imgGot});
	background-size: cover;
	height         : 1000px;
	position: absolute;
	width: 100%;
	z-index: -1;
`;
const MainBackground = styled.div`
	background-image:  url(${imgThrone});
	background-size: cover;
	height         : 1000px;
	width: 100%;
	position: absolute;
	z-index: -1;
`;

function ChildRouterContainer({ children }) {
	const location = useLocation();
	const isMain = location.pathname === '/';

	const content = isMain ? <MainBackground /> : <SecondBackground />;
	return <div>{content}{children}</div>
}

const Butttons = styled(Button)`
	margin-bottom: 40px;
	&:focus {
		box-shadow: none;
	}
	
`;

export default class App extends Component {
	gotServices = new gotServices();

	state = {
		showRanChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	toggleRanChar = () => {
		this.setState({ showRanChar: !this.state.showRanChar })
	}


	render() {

		const ranChar = this.state.showRanChar ? <RandomChar interval={3000} /> : null;

		if (this.state.error) {
			return <ErrorMessage />
		}

		return (
			<Router>
				<ChildRouterContainer>
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 7, offset: 0 }}>
								{ranChar}
							</Col>
						</Row>
						<Butttons
							color="primary"
							onClick={this.toggleRanChar}>Toggle random character</Butttons>
						<Route path='/' exact={true} component={() => <h1>WELCOME TO GOT DB!!!</h1>} />
						<Route path='/characters' component={CharactersPage} />
						<Route path='/houses' component={HousesPage} />
						<Route path='/books/' exact component={BooksPage} />
						<Route path='/books/:id' render={
							// аргументы из Route (match, location, history)
							({ match }) => {
								const { id } = match.params;
								return <BooksItem bookId={id} />
							}
						} />
					</Container >
				</ChildRouterContainer>
			</Router>
		);
	}
};




/* import React, { useState, useEffect } from 'react';

function App() {
	const [count, setCount] = useState(0);
	const [data, refreshData] = useState([{ name: 'Dima', sex: 'male' }])



	useEffect(() => {
		if (data) {
			console.log(data);
		}
	})

	return (
		<div>
			<p>Вы кликнули {count} раз</p>
			<button
				onClick={() => setCount(count + 1)}>
				Click
			</button>

			{data.map(item => {
				return (
					<div>Name: {item.name}, sex: {item.sex}</div>
				)
			})}
			<button
				onClick={() => refreshData(data => ([...data, { name: 'Julia', sex: 'female' }]))}>
				Добавить данные
			</button>
		</div>
	)
}

export default App; */