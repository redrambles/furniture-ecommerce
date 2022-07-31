const favoriteItems = [
	{ id: 1, name: "keyboard" },
	{
		id: 2,
		name: "computer",
	},
	{
		id: 3,
		name: "Stardew Valley",
	},
];

exports.handler = async function (event, context, callback) {
	return {
		statusCode: 200,
		body: JSON.stringify(favoriteItems),
	};
};
