import Stripe from 'stripe';
require("dotenv").config();
console.log("\n\n\n\n\n\n\n\n Stripe key", process.env.STRIPE_API_KEY)
const stripe = new Stripe(process.env.STRIPE_API_KEY,
  {
    apiVersion: '2022-08-01',
  });

export default stripe;