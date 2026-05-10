// netlify/functions/create-checkout.js
// Creates a Stripe Checkout session from cart items and returns the redirect URL.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Your GitHub Pages shop URL — used for success/cancel redirects
const SHOP_URL = 'https://calstfrancis.github.io/shop.html';

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let items;
  try {
    ({ items } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!items || items.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Cart is empty' }) };
  }

  // Build Stripe line items from cart
  // price_data lets us pass prices dynamically without pre-creating products in Stripe
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.productName,
        description: `${item.colour} · Size ${item.size}`,
        // Optional: add a metadata field so the webhook can match to Printful variant
        metadata: {
          printful_variant_id: String(item.variantId),
          colour: item.colour,
          size: item.size
        }
      },
      unit_amount: Math.round(item.price * 100), // Stripe expects cents
    },
    quantity: item.qty
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Collect shipping address — Stripe passes this to the webhook
      shipping_address_collection: {
        allowed_countries: [
          'CA', 'US', 'GB', 'AU', 'NZ', 'DE', 'FR', 'NL', 'SE', 'NO', 'DK', 'FI',
          'IE', 'BE', 'AT', 'CH', 'IT', 'ES', 'PT'
        ]
      },
      // Store the full cart in session metadata so the webhook can submit to Printful
      metadata: {
        cart: JSON.stringify(items.map(i => ({
          variantId: i.variantId,
          qty: i.qty,
          productName: i.productName,
          colour: i.colour,
          size: i.size
        })))
      },
      success_url: `${SHOP_URL}?order=success`,
      cancel_url:  `${SHOP_URL}?order=cancelled`
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://calstfrancis.github.io',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' })
    };
  }
};
