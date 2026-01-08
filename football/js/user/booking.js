(function () {
  const futsalSelect = document.getElementById('futsalSelect');
  const packageSelect = document.getElementById('packageSelect');
  const calendarGridId = 'calendarGrid';
  const calendarTitleId = 'calendarTitle';
  const slotsContainerId = 'slotsList';
  const summaryId = 'bookingSummary';

  function updateCalendarLimit() {
    const role = packageSelect.value;
    // Both individual/package/camp: 3 months
    window.Calendar.setMaxMonths(3);
  }

  function renderSummary(date, time, futsal, role) {
    const pricing = window.Packages.priceFor(role, 1);
    const html = `
      <p><strong>Date:</strong> ${date.toDateString()}</p>
      <p><strong>Time:</strong> ${time || '—'}</p>
      <p><strong>Futsal:</strong> ${futsal}</p>
      <p><strong>Role:</strong> ${role}</p>
      <hr>
      <p><strong>Base rate:</strong> NPR ${pricing.baseRate}</p>
      <p><strong>Discount:</strong> ${pricing.discountPct}%</p>
      <p><strong>Total:</strong> NPR ${pricing.total}</p>
    `;
    document.getElementById(summaryId).innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.Calendar.renderCalendar(calendarGridId, calendarTitleId);
    updateCalendarLimit();

    document.getElementById('prevMonth').addEventListener('click', () => {
      window.Calendar.prev(calendarGridId, calendarTitleId);
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
      window.Calendar.next(calendarGridId, calendarTitleId);
    });

    document.addEventListener('calendar:selected', (e) => {
      const date = e.detail.date;
      const futsal = futsalSelect.value;
      window.Slots.render(slotsContainerId, date, futsal);
      renderSummary(date, null, futsal, packageSelect.value);
    });

    document.addEventListener('slot:selected', (e) => {
      const time = e.detail.time;
      const date = window.Calendar.state.selected;
      renderSummary(date, time, futsalSelect.value, packageSelect.value);
    });

    packageSelect.addEventListener('change', updateCalendarLimit);

    document.getElementById('proceedPayment').addEventListener('click', () => {
      const date = window.Calendar.state.selected;
      const timeEl = document.querySelector('.slot.selected');
      if (!date) return alert('Select a date.');
      if (!timeEl) return alert('Select a slot.');
      const booking = {
        dateISO: date.toISOString().split('T')[0],
        time: timeEl.textContent,
        futsal: futsalSelect.value,
        role: packageSelect.value
      };
      localStorage.setItem('pendingBooking', JSON.stringify(booking));
      location.href = 'payment.html';
    });
  });
})();



