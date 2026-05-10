// netlify/functions/stripe-webhook.js
// Receives Stripe's webhook after a successful payment.
// Verifies the signature, then submits the order to Printful.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  // Verify the webhook came from Stripe (not a spoofed request)
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Only act on successful checkouts
  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'Ignored' };
  }

  const session = stripeEvent.data.object;

  // Stripe only marks payment as paid when payment_status === 'paid'
  if (session.payment_status !== 'paid') {
    console.log('Payment not yet paid, ignoring.');
    return { statusCode: 200, body: 'Awaiting payment' };
  }

  // Parse cart from session metadata
  let cartItems;
  try {
    cartItems = JSON.parse(session.metadata.cart);
  } catch {
    console.error('Could not parse cart metadata');
    return { statusCode: 400, body: 'Bad cart metadata' };
  }

  // Extract shipping address from Stripe
  const addr = session.shipping_details?.address;
  const name = session.shipping_details?.name || session.customer_details?.name || 'Customer';
  const email = session.customer_details?.email || '';

  if (!addr) {
    console.error('No shipping address on session', session.id);
    return { statusCode: 400, body: 'No shipping address' };
  }

  // Submit to Printful
  try {
    await submitToPrintful({ cartItems, addr, name, email, stripeSessionId: session.id });
    return { statusCode: 200, body: 'Order submitted to Printful' };
  } catch (err) {
    console.error('Printful submission failed:', err.message);
    // Return 200 to Stripe so it doesn't retry — log and investigate manually
    // In production you may want to set up alerting here
    return { statusCode: 200, body: 'Printful error logged' };
  }
};

async function submitToPrintful({ cartItems, addr, name, email, stripeSessionId }) {
  // Build Printful order payload
  // Printful API docs: https://developers.printful.com/docs/#tag/Orders-API/operation/createOrder
  const printfulItems = cartItems.map(item => ({
    variant_id: item.variantId,  // Printful variant ID from products.json
    quantity: item.qty
  }));

  const payload = {
    external_id: stripeSessionId, // so you can find the order in Printful by Stripe session
    shipping: 'STANDARD',
    recipient: {
      name:      name,
      email:     email,
      address1:  addr.line1,
      address2:  addr.line2 || '',
      city:      addr.city,
      state_code: addr.state || '',
      country_code: addr.country,
      zip:       addr.postal_code
    },
    items: printfulItems
  };

  const res = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Printful API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  console.log('Printful order created:', data.result?.id);
  return data;
}
