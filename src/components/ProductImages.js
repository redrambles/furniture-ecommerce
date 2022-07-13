import React, { useState } from "react";
import styled from "styled-components";

// We are using a default of an empty array because at first, images will be undefined
// While we are fetching
const ProductImages = ({ images = [] }) => {
	// The first image in the array is the main one when we first load the page
	// Then when a thumbnail is clicked, it becomes the main image
	const [main, setMain] = useState(images[0]);
	console.log(main);
	return (
		<Wrapper>
			<img src={main?.url} alt='Main Product' className='main' />
			<div className='gallery'>
				{images.map((img, index) => (
					<img
						className={`${img.url === main.url ? "active" : ""}`}
						key={img.filename}
						src={img.url}
						alt={`product-${img.filename}`}
						onClick={(e) => setMain(images[index])}
					/>
				))}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.main {
		height: 600px;
	}
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		object-fit: cover;
	}
	.gallery {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 1rem;
		img {
			height: 100px;
			cursor: pointer;
		}
	}
	.active {
		box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
	}
	@media (max-width: 576px) {
		.main {
			height: 300px;
		}
		.gallery {
			img {
				height: 50px;
			}
		}
	}
	@media (min-width: 992px) {
		.main {
			height: 500px;
		}
		.gallery {
			img {
				height: 75px;
			}
		}
	}
`;

export default ProductImages;
