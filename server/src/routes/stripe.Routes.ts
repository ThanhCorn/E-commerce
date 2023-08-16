import "dotenv/config";
import { Router, Request, Response } from "express";
import Stripe from "stripe";
import express from "express";
import OrderModel from "../models/order.Model";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

const router = Router();

router.post("/create-checkout-session", async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartSummary = req.body.cartItems.map((item: any) => ({
    productId: item.productId._id as string,
    quantity: item.quantity,
    color: item.color._id as string,
    price: item.price,
  }));

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(cartSummary),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const line_items = req.body.cartItems?.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.productId?.title,
          images: [item?.productId?.images[0]?.url], // Make sure to wrap the URL in an array
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer: customer.id,

      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "VN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.CLIENT_URL as string}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL as string}`,
    });

    res.send({
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Stripe webhook

const endpointSecret =
  "whsec_582c548296ae85e1c61cffc241beb5a67c26abfd207d34e22e20287726e72fd3";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Request) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any;
    let eventType;
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"] as string;
      let event: Stripe.Event = req.body;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          createOrder(customer, data);
        })
        .catch((err) => console.log(err.message));
    }
    res.statusCode = 200;
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrder = async (customer: any, data: any) => {
  const Items = JSON.parse(customer.metadata.cart);
  console.log(Items);

  const newOrder = new OrderModel({
    userId: customer.metadata.userId,
    paymentIntentId: data.payment_intent,
    orderItems: Items,
    totalPrice: data.amount_total / 100,
    shippingInfo: data.customer_details,
    paymentStatus: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log(savedOrder);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
};

export default router;
