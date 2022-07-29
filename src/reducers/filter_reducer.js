import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS: {
			// We are copying the items in an array with the spread operator
			// So that filtered and allproducts can be working with independent items (instead of the same array of items in memory)
			let maxPrice = action.payload.map((p) => p.price);
			maxPrice = Math.max(...maxPrice);
			return {
				...state,
				allProducts: [...action.payload],
				filteredProducts: [...action.payload],
				filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
			};
		}
		case SET_GRIDVIEW: {
			return { ...state, gridView: true };
		}
		case SET_LISTVIEW: {
			return { ...state, gridView: false };
		}
		case UPDATE_SORT: {
			return { ...state, sort: action.payload };
		}
		case SORT_PRODUCTS: {
			const { sort, filteredProducts } = state;
			let tempProducts = [...filteredProducts];
			if (sort === "price-lowest") {
				tempProducts = tempProducts.sort((a, b) => a.price - b.price);
			}
			if (sort === "price-highest") {
				tempProducts = tempProducts.sort((a, b) => b.price - a.price);
			}
			if (sort === "name-a") {
				tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
			}
			if (sort === "name-z") {
				tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
			}
			return { ...state, filteredProducts: tempProducts };
		}
		case UPDATE_FILTERS: {
			const { name, value } = action.payload;
			return { ...state, filters: { ...state.filters, [name]: value } };
		}
		case FILTER_PRODUCTS: {
			const { allProducts } = state;
			// Before we filter anything, start with a fresh copy of all our products
			const { text, category, company, color, price, shipping } = state.filters;

			let tempProducts = [...allProducts];
			// Filter this monster
			if (text) {
				tempProducts = tempProducts.filter((product) => {
					return product.name.toLowerCase().startsWith(text.toLowerCase());
				});
			}
			if (category !== "all") {
				tempProducts = tempProducts.filter((product) => product.category === category);
			}
			if (company !== "all") {
				tempProducts = tempProducts.filter((product) => product.company === company);
			}
			if (shipping) {
				tempProducts = tempProducts.filter((product) => product.shipping);
			}
			if (color !== "all") {
				tempProducts = tempProducts.filter((product) => product.colors.includes(color));
			}
			if (price !== state.filters.maxPrice) {
				tempProducts = tempProducts.filter((product) => product.price <= price);
			}

			return { ...state, filteredProducts: tempProducts };
		}
		case CLEAR_FILTERS: {
			// we don't want to overwrite all the default filters - so we are spreading
			// them first in order to keep the min and maxPrice values, and we are
			// setting the price value to the maxPrice as well.
			return {
				...state,
				filters: {
					...state.filters,
					text: "",
					company: "all",
					category: "all",
					color: "all",
					price: state.filters.maxPrice,
					shipping: false,
				},
			};
		}
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
