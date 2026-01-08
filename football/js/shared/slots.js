window.Slots = (() => {
  const blocked = JSON.parse(localStorage.getItem('blockedSlots') || '[]'); // {dateISO, time, futsal}
  const baseSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                     '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                     '18:00', '19:00', '20:00', '21:00'];

  function isBlocked(dateISO, time, futsal) {
    return blocked.some(b => b.dateISO === dateISO && b.time === time && b.futsal === futsal);
  }

  function render(containerId, selectedDate, futsal) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.innerHTML = '';

    if (!selectedDate) {
      wrap.innerHTML = '<p class="muted">Select a date to see slots.</p>';
      return;
    }

    baseSlots.forEach(t => {
      const el = document.createElement('div');
      const dateISO = selectedDate.toISOString().split('T')[0];
      const unavailable = isBlocked(dateISO, t, futsal);
      el.className = 'slot' + (unavailable ? ' unavailable' : '');
      el.textContent = t;

      if (unavailable) {
        el.title = 'This slot is unavailable';
      } else {
        el.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('slot:selected', { detail: { time: t } }));
          [...wrap.children].forEach(c => c.classList.remove('selected'));
          el.classList.add('selected');
        });
      }
      wrap.appendChild(el);
    });
  }

  function block(dateISO, time, futsal) {
    blocked.push({ dateISO, time, futsal });
    localStorage.setItem('blockedSlots', JSON.stringify(blocked));
  }

  return { render, block };
})();

