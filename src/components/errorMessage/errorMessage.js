import React from 'react';
import img from './error.jpg';
import styled from 'styled-components';

const Img = styled.img.attrs(props => ({
	src: props.src,
	alt: props.alt
}))`
	width: 100%;
`;

const ErrorMessage = () => {
	return (
		<>
			<Img src={img} alt="error"></Img>
			<span>Something goes wrong</span>
		</>
	)
};

export default ErrorMessage;