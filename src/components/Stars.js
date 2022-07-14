import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, reviews }) => {
	return (
		<Wrapper>
			<div className='stars'>
				{new Array(5).fill(0).map((_, index) => (
					<span>{stars >= index + 1 ? <BsStarFill /> : stars >= index + 1 - 0.5 ? <BsStarHalf /> : <BsStar />}</span>
				))}
			</div>
			<div className='reviews'>{reviews} customer reviews</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;
export default Stars;
