const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

// Încarcă variabilele din fișierul .env
dotenv.config();

app.use(cors());
app.use(express.static('public'));  // Servește fișierele statice
app.use(express.json());  // Permite parsing-ul JSON

// Endpoint pentru crearea sesiunii de checkout Stripe
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Diagnosticare PC',
            },
            unit_amount: 5000, // 50.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.json({ id: session.id });  // Trimite ID-ul sesiunii ca răspuns
  } catch (error) {
    console.error('Eroare Stripe:', error);
    res.status(500).send('A apărut o eroare pe server');
  }
});

// Pornește serverul
app.listen(3000, () => {
  console.log('Serverul rulează pe http://localhost:3000');
});
