document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailPhone = document.getElementById('emailPhone').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const isEmail = emailPhone.includes('@');
  const isPhone = /^\d{10}$/.test(emailPhone);

  if (!isEmail && !isPhone) return alert('Enter a valid email or 10-digit phone.');
  if (!password) return alert('Enter password.');
  if (!role) return alert('Select a role.');

  localStorage.setItem('session', JSON.stringify({ emailPhone, role }));
  window.Notifications.add('Login', `Logged in as ${role}`);
  if (role === 'admin') location.href = 'admin.html';
  else location.href = 'index.html';
});
