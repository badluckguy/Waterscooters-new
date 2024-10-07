fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error during checkout.');
    }
  })
  .catch(error => console.error('Checkout error:', error));
  