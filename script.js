// Mobile nav
const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<svg class="ic"><use href="#i-close"/></svg>'
    : '<svg class="ic"><use href="#i-menu"/></svg>';
});
document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<svg class="ic"><use href="#i-menu"/></svg>';
  });
});

// Header shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(36,27,20,.08)' : 'none';
});

// One orchestrated reveal per section (not per-card)
const revealTargets = document.querySelectorAll(
  '.about, .leadership, .fundamentals, .poem, .projects, .redevelopment, .mumbai, .insights, .contact, .leader-bio, .leader-philosophy, .leader-quote'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => io.observe(el));

// Chatbot placeholder (wire up Sell.do widget here)
document.querySelector('[data-chatbot]')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.selldoChatOpen) { window.selldoChatOpen(); return; }
  console.info('Sell.do chatbot: add the provided embed script and hook it up here.');
});
