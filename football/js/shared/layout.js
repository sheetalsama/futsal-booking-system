// =========================================
// Layout injection: single source of truth
// Keeps header/footer consistent across pages
// Sets active nav based on current path
// =========================================

(function () {
  function headerHTML() {
    return `
      <div class="header-wrap">
        <div class="brand">
          <span class="logo"></span>
          <span>Devi's Sports Centre</span>
        </div>
        <nav class="nav">
          <a href="index.html" data-path="index.html">Home</a>
          <a href="booking.html" data-path="booking.html">Booking</a>
          <a href="payment.html" data-path="payment.html">Payment</a>
          <a href="profile.html" data-path="profile.html">Profile</a>
          <a href="notifications.html" data-path="notifications.html">Notifications</a>
          <a href="login.html" data-path="login.html">Login</a>
        </nav>
        <div class="actions">
          <a href="signup.html" class="btn btn-primary">Sign Up</a>
        </div>
      </div>
    `;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <div class="footer-wrap">
        <div class="footer-brand">Devi's Sports Centre</div>
        <div class="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </div>
        <div class="footer-note">© ${year} Devi's Sports Centre. All rights reserved.</div>
      </div>
    `;
  }

  function setActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.nav a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-path') === path);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) {
      header.classList.add('site-header');
      header.innerHTML = headerHTML();
    }
    if (footer) {
      footer.classList.add('site-footer');
      footer.innerHTML = footerHTML();
    }
    setActiveNav();
  });
})();





