window.Calendar = (() => {
  const state = { current: new Date(), selected: null, maxMonths: 3 };

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  function renderCalendar(gridId, titleId) {
    const grid = document.getElementById(gridId);
    const title = document.getElementById(titleId);
    if (!grid || !title) return;

    grid.innerHTML = '';
    const s = startOfMonth(state.current);
    const e = endOfMonth(state.current);
    title.textContent = `${state.current.toLocaleString('default', { month: 'long' })} ${state.current.getFullYear()}`;

    const firstWeekday = s.getDay(); // 0=Sun..6=Sat
    for (let i = 0; i < firstWeekday; i++) {
      const pad = document.createElement('div');
      pad.className = 'calendar-day disabled';
      pad.textContent = '';
      grid.appendChild(pad);
    }

    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + state.maxMonths, today.getDate());

    for (let day = 1; day <= e.getDate(); day++) {
      const d = new Date(state.current.getFullYear(), state.current.getMonth(), day);
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      cell.textContent = String(day);

      const isPast = d.setHours(0,0,0,0) < today.setHours(0,0,0,0);
      const beyondMax = d > maxDate;

      if (isPast || beyondMax) {
        cell.classList.add('disabled');
      } else {
        cell.addEventListener('click', () => {
          state.selected = d;
          [...grid.children].forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          document.dispatchEvent(new CustomEvent('calendar:selected', { detail: { date: d } }));
        });
      }

      grid.appendChild(cell);
    }
  }

  function next(gridId, titleId) {
    state.current = new Date(state.current.getFullYear(), state.current.getMonth() + 1, 1);
    renderCalendar(gridId, titleId);
  }
  function prev(gridId, titleId) {
    state.current = new Date(state.current.getFullYear(), state.current.getMonth() - 1, 1);
    renderCalendar(gridId, titleId);
  }

  function setMaxMonths(m) { state.maxMonths = m; }

  return { renderCalendar, next, prev, setMaxMonths, state };
})();


