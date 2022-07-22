export const formatPrice = (number) => {
	const formatedNumber = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number / 100);
	return `${formatedNumber}`;
};

export const getUniqueValues = (data, type) => {
	const values = type === "colors" ? data.map((item) => item[type]).flat() : data.map((item) => item[type]);
	// console.log(["all", ...new Set(values)]);
	return ["all", ...new Set(values)];
};
