(function () {
  const key = 'feedback';
  function avg(arr) { return arr.length ? (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1) : '—'; }

  function renderStars(containerId) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.addEventListener('click', (e) => {
      const rate = Number(e.target.dataset.rate);
      if (!rate) return;
      [...wrap.children].forEach((i, idx) => {
        i.classList.toggle('active', idx < rate);
        i.classList.remove('fa-regular'); i.classList.add('fa-solid');
        if (idx >= rate) { i.classList.add('fa-regular'); i.classList.remove('fa-solid'); i.classList.remove('active'); }
      });
      wrap.dataset.value = rate;
    });
  }

  function updateAverages() {
    const fb = JSON.parse(localStorage.getItem(key) || '[]');
    const a = fb.filter(x => x.futsal === 'A').map(x => x.rating);
    const b = fb.filter(x => x.futsal === 'B').map(x => x.rating);
    document.getElementById('avgA').textContent = avg(a);
    document.getElementById('avgB').textContent = avg(b);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStars('starRating');
    updateAverages();

    document.getElementById('feedbackForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const futsal = document.getElementById('fbFutsal').value;
      const rating = Number(document.getElementById('starRating').dataset.value || 0);
      const comment = document.getElementById('fbComment').value.trim();
      if (!rating) return alert('Please select a rating.');

      const fb = JSON.parse(localStorage.getItem(key) || '[]');
      fb.unshift({ id: Date.now(), futsal, rating, comment });
      localStorage.setItem(key, JSON.stringify(fb));
      window.Notifications.add('Feedback', `Thanks for rating Futsal ${futsal}.`);
      updateAverages();
      e.target.reset();
      [...document.getElementById('starRating').children].forEach(i => {
        i.classList.remove('active', 'fa-solid'); i.classList.add('fa-regular');
      });
      alert('Feedback submitted!');
    });
  });
})();
