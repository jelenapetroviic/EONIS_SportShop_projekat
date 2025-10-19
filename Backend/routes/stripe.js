import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js"

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);
let cart;
let name;
let email;
let userId;

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId
    },
  });

  userId=req.body.userId;
  email=req.body.email;
  name=req.body.name;
  cart=req.body.cart;
  


  const line_items = req.body.cart.products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.img],
          description: product.desc,
          metadata: {
            id: product._id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/orders?payment_success=true`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// web hook
//let endpointSecret;
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret = "whsec_fac97ee3988540c1b07cb0b02908a77976373ec380888d78378190b18297440e";

router.post(
  "/webhook",
  (req, res) => {
    console.log("=== WEBHOOK RECEIVED ===");
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
        console.log("Webhook verified successfully");
      } catch (err) {
        console.log("Webhook verification error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    console.log("Event Type:", eventType);

    // Handle the event
    if (eventType === "checkout.session.completed") {
      console.log("Processing checkout.session.completed event");
      console.log("Cart data:", cart);
      console.log("User data:", { name, userId, email });

      stripe.customers
        .retrieve(data.customer)
        .then(async(customer) => {
          console.log("Customer retrieved:", customer.id);

          const newOrder =  Order({
            name,
            userId,
            products:cart.products,
            total:cart.total,
            email
          });

          console.log("Creating order with data:", {
            name,
            userId,
            productsCount: cart?.products?.length,
            total: cart?.total,
            email
          });

          const savedOrder = await newOrder.save();
          console.log("Order saved successfully! Order ID:", savedOrder._id);
        })
        .catch((err) => {
          console.log("Error saving order:", err.message);
          console.log("Full error:", err);
        });
    } else {
      console.log("Event type not handled:", eventType);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

export default router;