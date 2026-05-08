(function () {
  const root = document.documentElement;
  const KEY  = 'theme';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  }

  function toggle() {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  // Restore on load
  const saved  = localStorage.getItem(KEY);
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', saved || system);

  // Wire button after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) { btn.setAttribute('data-theme-toggle', ''); btn.addEventListener('click', toggle); }
    apply(root.getAttribute('data-theme')); // sync icon
  });

  // Follow system if no manual choice
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
  });
})();
