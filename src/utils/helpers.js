export const formatPrice = (number) => {
	const formatedNumber = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number / 100);
	return `${formatedNumber}`;
};

export const getUniqueValues = () => {};
