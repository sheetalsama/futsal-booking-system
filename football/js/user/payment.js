// =========================================
// Payment flow: demo logic for summary + confirmation
// Keeps UI responsive and transparent for users
// =========================================

(function () {
  function loadSummary() {
    const container = document.getElementById('paymentSummary');
    if (!container) return;
    // Demo data: replace with actual pendingBooking info
    const booking = JSON.parse(localStorage.getItem('pendingBooking') || '{}');
    const hasBooking = booking && booking.court;

    container.innerHTML = `
      <div><strong>Court:</strong> ${hasBooking ? booking.court : 'Futsal A'}</div>
      <div><strong>Date:</strong> ${hasBooking ? booking.date : '2026-01-08'}</div>
      <div><strong>Time:</strong> ${hasBooking ? booking.time : '18:00–19:00'}</div>
      <div><strong>Package:</strong> ${hasBooking ? booking.package : 'Team'}</div>
      <div><strong>Price:</strong> Rs. ${hasBooking ? booking.price : '1500'}</div>
      <div class="muted">Discounts and loyalty will be applied at confirmation.</div>
    `;
  }

  function simulatePayment() {
    const method = document.querySelector('input[name="gateway"]:checked')?.value || 'esewa';
    const paytype = document.querySelector('input[name="paytype"]:checked')?.value || 'advance';

    // Demo feedback: store a confirmation snapshot
    const confirmation = {
      id: 'CONF' + Math.floor(Math.random() * 100000),
      method, paytype, time: new Date().toISOString()
    };
    localStorage.setItem('lastConfirmation', JSON.stringify(confirmation));

    // Optional: add a notification
    if (window.Notifications) {
      window.Notifications.add('success', `Payment confirmed via ${method} (${paytype}).`);
    }

    // Redirect to confirmation page
    alert('Payment simulated successfully. Redirecting to confirmation.');
    location.href = 'confirmation.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadSummary();
    const btn = document.getElementById('simulatePayment');
    if (btn) btn.addEventListener('click', simulatePayment);
  });
})();




