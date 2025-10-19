import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js"

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Received checkout request:", {
      userId: req.body.userId,
      email: req.body.email,
      name: req.body.name,
      productsCount: req.body.cart?.products?.length,
      total: req.body.cart?.total
    });

    // Create order with status 0 (completed) since webhooks might not work in local dev
    // In production, you should use status: -1 and update via webhook
    const pendingOrder = new Order({
      name: req.body.name,
      userId: req.body.userId,
      products: req.body.cart.products,
      total: req.body.cart.total,
      email: req.body.email,
      status: 0 // 0 means completed (for dev without webhooks)
    });

    const savedPendingOrder = await pendingOrder.save();
    console.log("Order created:", savedPendingOrder._id);

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        orderId: savedPendingOrder._id.toString(),
        name: req.body.name,
        email: req.body.email
      },
    });

    console.log("Stripe customer created:", customer.id);

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

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/orders?payment_success=true`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      client_reference_id: savedPendingOrder._id.toString()
    });

    console.log("Stripe checkout session created:", session.id);
    res.send({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    console.error("Error details:", error.message);
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

      stripe.customers
        .retrieve(data.customer)
        .then(async(customer) => {
          console.log("Customer retrieved:", customer.id);
          console.log("Customer metadata:", customer.metadata);

          const { orderId } = customer.metadata;

          if (orderId) {
            console.log("Updating pending order to completed:", orderId);

            // Update the pending order status to 0 (completed/paid)
            const updatedOrder = await Order.findByIdAndUpdate(
              orderId,
              { status: 0 },
              { new: true }
            );

            if (updatedOrder) {
              console.log("Order updated successfully! Order ID:", updatedOrder._id);
              console.log("Order status changed from -1 (pending) to 0 (completed)");
            } else {
              console.log("Order not found with ID:", orderId);
            }
          } else {
            console.log("No orderId found in customer metadata");
          }
        })
        .catch((err) => {
          console.log("Error updating order:", err.message);
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