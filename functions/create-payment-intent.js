// domain/.netlify/functions/create-payment-intent
// If we were using a file that isn't .env (i.e. '.env.local') - or that is
// located somewhere else, we would pass the path to 'config()'
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context, callback) {
	// console.log(event);
	// if we have a POST request
	if (event.body) {
		// These properties below are being sent in a POST request in StripeCheckout
		const { cart, shippingFee, totalAmount } = JSON.parse(event.body);
		console.log(cart, shippingFee, totalAmount);

		const calculateOrderAmount = () => {
			return shippingFee + totalAmount;
		};

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				// amount should always be value in cents - this is what Stripe needs
				amount: calculateOrderAmount(),
				currency: "usd",
			});
			return {
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (err) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: err.message }),
			};
		}
	}
	// GET request - if you are trying to access this directly in the browser
	// domain/.netlify/functions/create-payment-intent
	return {
		statusCode: 200,
		body: "yo mama - this is payment intent",
	};
};
