// =========================================
// Notifications: simple, centralized store
// Renders a readable list on notifications.html
// =========================================

(function () {
  const KEY = 'notifications';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function add(type, message) {
    const list = getAll();
    list.push({
      type, message,
      time: new Date().toLocaleString()
    });
    save(list);
  }

  function renderList(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const list = getAll().slice(-20).reverse(); // show latest first, keep it light
    el.innerHTML = '';
    list.forEach(n => {
      const li = document.createElement('li');
      // Icon choice by type adds instant meaning
      const icon = n.type === 'success' ? 'fa-check-circle' :
                   n.type === 'error' ? 'fa-triangle-exclamation' :
                   n.type === 'reward' ? 'fa-trophy' : 'fa-info-circle';
      li.innerHTML = `
        <span class="notif-icon"><i class="fa ${icon}" style="color:#FF6600"></i></span>
        <span class="notif-text"><strong>${n.type}:</strong> ${n.message}</span>
        <span class="notif-time" style="color:#888;">${n.time}</span>
      `;
      el.appendChild(li);
    });
  }

  window.Notifications = { add, renderList };
})();





