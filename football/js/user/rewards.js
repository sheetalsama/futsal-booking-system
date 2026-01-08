(function () {
  function updateLoyaltyUI() {
    const count = Number(localStorage.getItem('loyaltyCount') || 0);
    const bar = document.getElementById('loyaltyBar');
    const text = document.getElementById('loyaltyText');
    if (bar) bar.style.width = `${Math.min(100, (count / 10) * 100)}%`;
    if (text) text.textContent = `${count}/10 bookings`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateLoyaltyUI();
    const redeem = document.getElementById('redeemFree');
    if (redeem) {
      redeem.addEventListener('click', () => {
        const count = Number(localStorage.getItem('loyaltyCount') || 0);
        if (count < 10) return alert('Need 10 bookings to redeem a free slot.');
        localStorage.setItem('loyaltyCount', String(count - 10));
        window.Notifications.add('Rewards', 'Free booking redeemed!');
        updateLoyaltyUI();
        alert('Free booking redeemed. Check booking page to apply.');
      });
    }
  });
})();

