"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({ //ACCESS STRAPI API
  async create(ctx) { //allows us to modify API endpoint to customize our endpoint along with Strapi already provides
    const { products, userName, email } = ctx.request.body; //Checkout: the parameters we created in the POST request
    try {
      // retrieve item information
      const lineItems = await Promise.all( //Promise.all allows us to do multiple async calls
        products.map(async (product) => { //cycling through Products
          const item = await strapi 
            .service("api::item.item") //how we grab our items stored in Strapi backend
            .findOne(product.id);

          return { //we grabbed an item (object), now return an object with this format 
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session, DOCUMENTATION ON STRIPE/DOCS/PREBUILT CHECKOUT
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems, //represents what we returned in the async function
      });

      // create the item in the backend
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));
