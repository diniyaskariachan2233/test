(function () {
  function init() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(() => e.target.classList.add('visible'), delay);
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
