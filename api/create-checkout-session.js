const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: item.priceInCents,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/success.html`,
        cancel_url: `${process.env.SERVER_URL}/cancel.html`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: 'Checkout session creation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
