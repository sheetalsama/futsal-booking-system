(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const rec = JSON.parse(localStorage.getItem('lastConfirmation') || '{}');
    const box = document.getElementById('receiptDetails');
    if (!rec.id) { box.textContent = 'No confirmation found.'; return; }
    box.innerHTML = `
      <p><strong>Booking ID:</strong> ${rec.id}</p>
      <p><strong>Date:</strong> ${rec.dateISO}</p>
      <p><strong>Time:</strong> ${rec.time}</p>
      <p><strong>Futsal:</strong> ${rec.futsal}</p>
      <p><strong>Status:</strong> ${rec.status}</p>
    `;

    // Simple QR placeholder update (could integrate a real QR library later)
    const qr = document.getElementById('entryQr');
    qr.title = `Entry QR for booking ${rec.id}`;
  });
})();

