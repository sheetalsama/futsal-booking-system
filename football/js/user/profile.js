(function () {
  function loadProfile() {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const profile = users.find(u => u.email === session.emailPhone || u.phone === session.emailPhone);
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const phoneEl = document.getElementById('profilePhone');

    if (profile) {
      if (nameEl) nameEl.textContent = profile.name;
      if (emailEl) emailEl.textContent = profile.email;
      if (phoneEl) phoneEl.textContent = profile.phone;
    } else {
      if (nameEl) nameEl.textContent = 'Guest';
      if (emailEl) emailEl.textContent = '—';
      if (phoneEl) phoneEl.textContent = '—';
    }

    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const list = document.getElementById('historyList');
    if (list) {
      list.innerHTML = '';
      if (!history.length) list.innerHTML = '<li class="muted">No bookings yet.</li>';
      history.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${h.dateISO}</strong> ${h.time} — ${h.futsal} <span class="muted" style="float:right">${h.status}</span>`;
        list.appendChild(li);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', loadProfile);
})();
