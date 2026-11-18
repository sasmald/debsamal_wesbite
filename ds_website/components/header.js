(() => {
  const slot = document.querySelector('[data-include="header"]');
  if (!slot) return;
  slot.outerHTML = `<header class="site-header"><div class="nav-inner">
    <a href="index.html" class="nav-logo"><span class="nav-logo__name">Debashish Sasmal</span><span class="nav-logo__tagline">HEALTHCARE VENTURE BUILDING</span></a>
    <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <nav class="nav-menu" id="primary-nav" aria-label="Main navigation"><ul class="nav-links">
    <li><a href="index.html" data-page="index">Home</a></li><li><a href="work.html" data-page="work">Work</a></li><li><a href="ai.html" data-page="ai">Perspectives</a></li><li><a href="about.html" data-page="about">About</a></li><li><a href="contact.html" class="nav-cta" data-page="contact">Contact</a></li>
    </ul></nav></div></header>`;
  const current = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === current) link.setAttribute('aria-current', 'page');
  });
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? 'Close' : 'Menu';
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  matchMedia('(min-width: 781px)').addEventListener('change', () => setOpen(false));
})();
