(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('#motion-toggle');
  let paused = false;
  try { paused = localStorage.getItem('motion-paused') === 'true'; } catch {}
  let observer;
  const active = new Set();
  const reduced = () => preference.matches || paused;
  function animateIn(element) {
    if (reduced() || !window.Motion) return;
    const animation = Motion.animate(element, { opacity: [0.15, 1], y: [16, 0] }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    active.add(animation);
    animation.then(() => active.delete(animation));
  }
  function applyPreference() {
    document.documentElement.dataset.reducedMotion = String(reduced());
    toggle.textContent = preference.matches ? 'Reduced motion enabled' : paused ? 'Enable animations' : 'Pause animations';
    toggle.setAttribute('aria-pressed', String(reduced()));
    toggle.disabled = preference.matches;
    if (reduced()) {
      active.forEach(animation => animation.complete());
      active.clear();
    }
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('motion-paused', String(paused)); } catch {}
    applyPreference();
  });
  preference.addEventListener('change', applyPreference);
  applyPreference();
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animateIn(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  animateIn(document.querySelector('.intro-copy'));
  const filters = document.querySelector('.project-filters');
  const cards = [...document.querySelectorAll('[data-category]')];
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) { count++; observer?.unobserve(card); animateIn(card); }
    });
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  });
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  cards.forEach(card => card.addEventListener('pointermove', event => {
    if (reduced() || !finePointer.matches) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  }));
  const progress = document.querySelector('.reading-progress');
  let queued = false;
  function updateProgress() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`;
    queued = false;
  }
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  if ('ResizeObserver' in window) new ResizeObserver(updateProgress).observe(document.body);
  updateProgress();
})();
