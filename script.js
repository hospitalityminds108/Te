const progress = document.querySelector('.progress');
const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});

menu?.addEventListener('click', () => {
  nav.classList.toggle('open');
  nav.style.display = nav.classList.contains('open') ? 'flex' : '';
  if(nav.classList.contains('open')){
    nav.style.position='absolute';
    nav.style.top='70px';
    nav.style.left='0';
    nav.style.right='0';
    nav.style.padding='25px';
    nav.style.background='var(--paper)';
    nav.style.flexDirection='column';
    nav.style.gap='18px';
  }
});

document.querySelectorAll('.save').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
  });
});

const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let start = 0;
    const duration = 1200;
    const step = timestamp => {
      if (!el.startTime) el.startTime = timestamp;
      const progress = Math.min((timestamp - el.startTime) / duration, 1);
      el.textContent = Math.floor(progress * target) + (target === 96 ? '%' : '+');
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    observer.unobserve(el);
  });
},{threshold:.4});
counters.forEach(c => observer.observe(c));

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)';
      reveal.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.property,.place,.journal article,.project-main,.intro>div').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(25px)';
  el.style.transition='opacity .7s ease, transform .7s ease';
  reveal.observe(el);
});
