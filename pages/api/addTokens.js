import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";
import stripeInit from "stripe";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { user } = await getSession(req, res);
  const { tier } = req.body;

  console.log("In addTokens handler");
  const lineItems = [
    {
      price: process.env.STRIPE_PRODUCT_PRICE_ID,
      quantity: 1,
    },
  ];

  const tiers = {
    0: [
      {
        price: process.env.STRIPE_PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ],
    1: [
      {
        price: process.env.STRIPE_PRODUCT_PRICE_ID_100,
        quantity: 1,
      },
    ],
  };

  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";
  const host = req.headers.host;

  // const checkoutSession = await stripe.checkout.sessions.create({
  //   line_items: lineItems,
  //   mode: "payment",
  //   success_url: `${protocol}${host}/success`,
  //   cancel_url: `${protocol}${host}/cancel`,
  //   payment_intent_data: {
  //     metadata: {
  //       sub: user.sub,
  //     },
  //   },
  //   metadata: {
  //     sub: user.sub,
  //   },
  // });
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: tiers[tier.id],
    mode: "payment",
    success_url: `${protocol}${host}/success`,
    cancel_url: `${protocol}${host}/cancel`,
  });

  console.log("user", user);
  const client = await clientPromise;
  const db = client.db("SassBlog");
  console.log("tier", tier);
  // console.log("tier quantityyyyyyyyyyyyyyyyyy", tier);

  // MongoDB upsert
  // If document exists, then update it, otherwise create one
  const userProfile = await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: tier.quantity,
      },
      $setOnInsert: {
        auth0Id: user.sub,
      },
    },
    {
      upsert: true,
    }
  );

  console.log("USER checkoutSession", checkoutSession);

  console.log("In addTokens checkout");

  res.status(200).json({ session: checkoutSession });
}
