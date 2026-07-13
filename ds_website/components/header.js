/* ============================================================
   HEADER COMPONENT
   Injects the sticky nav into every page.
   Usage: <div data-include="header"></div>
          <script src="../components/header.js"></script>
   ============================================================ */

(function () {
  const HEADER_HTML = `
  <header class="site-header">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <span class="nav-logo__name">Debashish Sasmal</span>
        <span class="nav-logo__tagline">PRODUCT · VENTURES · AI</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-menu">
        <ul class="nav-links">
          <li><a href="work.html"    class="nav-link" data-page="work">WORK</a></li>
          <li><a href="ai.html"      class="nav-link" data-page="ai">AI</a></li>
          <li><a href="about.html"   class="nav-link" data-page="about">ABOUT</a></li>
          <li><a href="contact.html" class="nav-cta"  data-page="contact">CONTACT</a></li>
        </ul>
      </nav>
    </div>
  </header>`;

  function inject() {
    const placeholder = document.querySelector('[data-include="header"]');
    if (!placeholder) return;
    placeholder.outerHTML = HEADER_HTML;
    markActivePage();
    wireMobileToggle();
  }

  function wireMobileToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function markActivePage() {
    const filename = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-link[data-page], .nav-cta[data-page]').forEach(function (link) {
      if (link.dataset.page === filename) {
        link.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
