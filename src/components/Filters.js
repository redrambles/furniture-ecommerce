import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
	const {
		filters: { text, category, company, color, minPrice, price, maxPrice, shipping },
		updateFilters,
		clearFilters,
		allProducts,
	} = useFilterContext();

	const categories = getUniqueValues(allProducts, "category");

	const companies = getUniqueValues(allProducts, "company");
	const colors = getUniqueValues(allProducts, "colors");

	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className='form-control'>
						<input type='text' name='text' placeholder='Search' className='search-input' value={text} onChange={updateFilters} />
					</div>
					{/* End search input */}
					{/* Categories */}
					<div className='form-control'>
						<h5>category</h5>
						<div>
							{categories.map((cat, idx) => (
								<button
									id={idx}
									key={idx}
									onClick={updateFilters}
									name='category'
									type='button'
									value={cat}
									className={`${category === cat.toLowerCase() ? "active" : ""}`}
								>
									{cat}
								</button>
							))}
						</div>
						{/* Companies */}
						<div className='form-control'>
							<h5>company</h5>
							<select className='company' name='company' onChange={updateFilters} value={company}>
								{companies.map((company, idx) => (
									<option key={idx} id={idx} value={company}>
										{company}
									</option>
								))}
							</select>
						</div>
						{/* colors */}
						<div className='form-control'>
							<h5>colors</h5>
							<div className='colors'>
								{colors.map((clr, idx) => {
									if (clr === "all") {
										return (
											<button
												key={idx}
												name='color'
												type='button'
												onClick={updateFilters}
												value='all'
												className={`${color === "all" ? "all-btn active" : "all-btn"}`}
											>
												all
											</button>
										);
									}
									return (
										<button
											key={idx}
											name='color'
											className={`${color === clr ? "color-btn active" : "color-btn"}`}
											style={{ background: clr }}
											value={clr}
											onClick={updateFilters}
										>
											{color === clr ? <FaCheck /> : null}
										</button>
									);
								})}
							</div>
						</div>
						{/* price */}
						<div className='form-control'>
							<h5>price</h5>
							<p className='price'>{formatPrice(price)}</p>
							<input type='range' name='price' onChange={updateFilters} min={minPrice} max={maxPrice} value={price} />
						</div>
						{/* shiping */}
						<div className='form-control shipping'>
							<label htmlFor='shipping'> free shipping</label>
							<input type='checkbox' name='shipping' id='shipping' checked={shipping} onChange={updateFilters} />
						</div>
					</div>
				</form>
				<button type='button' className='clear-btn' onClick={clearFilters}>
					Clear Filters
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

export default Filters;
