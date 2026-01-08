(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('cancelBooking');
    btn.addEventListener('click', () => {
      const rec = JSON.parse(localStorage.getItem('lastConfirmation') || '{}');
      if (!rec.id) return alert('No booking found.');
      rec.status = 'cancelled';
      localStorage.setItem('lastConfirmation', JSON.stringify(rec));

      // Refund logic (mock): decrement loyalty
      const loyalty = Math.max(0, Number(localStorage.getItem('loyaltyCount') || 0) - 1);
      localStorage.setItem('loyaltyCount', String(loyalty));
      window.Notifications.add('Cancellation', `Booking ${rec.id} cancelled. Refund processed.`);

      alert('Your booking has been cancelled.');
      location.href = 'index.html';
    });
  });
})();


