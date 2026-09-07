/* ══════════════════════════════════════════════════════
   Portfolio - Pham Thai Dac Ngoc
   main.js — runs after Bootstrap 5 + HTMX are loaded
══════════════════════════════════════════════════════ */

/* ── Scroll fade-in ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ── Spreadsheet tab active state ── */
function setActiveTab(el) {
  document.querySelectorAll('#sheetTabs .nav-link').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  // prevent href="javascript:void(0)" from any unwanted default
  event.preventDefault();
}

/* ── Contact toast ── */
function showContactToast() {
  const toastEl = document.getElementById('contactToast');
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
}

/* ── Re-observe fade-in elements injected by HTMX ── */
document.body.addEventListener('htmx:afterSwap', () => {
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => fadeObserver.observe(el));
});

/* ── Active navbar link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--pink)' : '';
  });
}, { passive: true });
