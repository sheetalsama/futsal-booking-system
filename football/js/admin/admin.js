(function () {
  function loadBookings() {
    const list = document.getElementById('adminBookings');
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    list.innerHTML = '';
    if (!history.length) {
      list.innerHTML = '<li class="muted">No bookings yet.</li>';
      return;
    }
    history.forEach(h => {
      const li = document.createElement('li');
      li.innerHTML = `#${h.id} — ${h.dateISO} ${h.time} — ${h.futsal} — ${h.role} <span class="muted" style="float:right">${h.status}</span>`;
      list.appendChild(li);
    });
  }

  function loadFeedback() {
    const list = document.getElementById('adminFeedback');
    const fb = JSON.parse(localStorage.getItem('feedback') || '[]');
    list.innerHTML = '';
    if (!fb.length) {
      list.innerHTML = '<li class="muted">No feedback yet.</li>';
      return;
    }
    fb.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = `Futsal ${f.futsal} — ${f.rating} ⭐ — ${f.comment || ''}`;
      list.appendChild(li);
    });
  }

  function loadBlocked() {
    const wrap = document.getElementById('blockedSlots');
    const blocked = JSON.parse(localStorage.getItem('blockedSlots') || '[]');
    wrap.innerHTML = '';
    if (!blocked.length) {
      wrap.innerHTML = '<div class="muted">No blocked slots.</div>';
      return;
    }
    blocked.forEach(b => {
      const div = document.createElement('div');
      div.textContent = `${b.dateISO} ${b.time} — ${b.futsal}`;
      wrap.appendChild(div);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadBookings();
    loadFeedback();
    loadBlocked();

    document.getElementById('blockSlot').addEventListener('click', () => {
      const d = document.getElementById('blockDate').value;
      const t = document.getElementById('blockTime').value;
      const f = document.getElementById('blockFutsal').value;
      if (!d || !t || !f) return alert('Select date/time/futsal');
      window.Slots.block(d, t, f);
      loadBlocked();
      window.Notifications.add('Admin', `Blocked ${d} ${t} at Futsal ${f}.`);
      alert('Slot blocked.');
    });

    document.getElementById('saveDiscount').addEventListener('click', () => {
      const role = document.getElementById('admPackage').value;
      const pct = Number(document.getElementById('admDiscount').value);
      window.Packages.setDiscount(role, pct);
      window.Notifications.add('Admin', `Discount for ${role} set to ${pct}%.`);
      alert('Discount updated.');
    });
  });
})();

