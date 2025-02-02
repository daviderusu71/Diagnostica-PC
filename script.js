// Înlocuiește cu cheia ta publică Stripe
const stripe = Stripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Cheia publică Stripe

document.getElementById('payButton').addEventListener('click', function (event) {
    event.preventDefault(); // Oprește comportamentul implicit al butonului

    // Crează sesiunea de checkout
    fetch('/create-checkout-session', {
        method: 'POST',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (sessionId) {
        // Inițiază checkout-ul Stripe
        stripe.redirectToCheckout({ sessionId: sessionId })
            .then(function (result) {
                if (result.error) {
                    alert(result.error.message);
                }
            });
    })
    .catch(function (error) {
        console.error("Eroare la crearea sesiunii de plată:", error);
    });
});


// script.js

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', async () => {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
  });

  const session = await response.json();

  const result = await stripe.redirectToCheckout({ sessionId: session.id });

  if (result.error) {
    alert(result.error.message);
  }
});
