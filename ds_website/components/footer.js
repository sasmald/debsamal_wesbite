/* ============================================================
   FOOTER COMPONENT
   Injects the site footer into every page.
   Usage: <div data-include="footer"></div>
          <script src="../components/footer.js"></script>
   ============================================================ */

(function () {
  const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <span class="footer-brand">Debashish Sasmal</span>
      <span class="footer-sub">Product &amp; Venture Leadership · Pittsburgh</span>
      <ul class="footer-links">
        <li><a href="https://theproductsignal.com/" class="footer-link" target="_blank" rel="noopener">PODCAST</a></li>
        <li><a href="mailto:debashish.sasmal@gmail.com" class="footer-link">EMAIL</a></li>
        <li><a href="https://www.linkedin.com/in/dsasmal/" class="footer-link" target="_blank" rel="noopener">LINKEDIN</a></li>
        <li><a href="https://github.com/sasmald" class="footer-link" target="_blank" rel="noopener">GITHUB</a></li>
      </ul>
    </div>
  </footer>`;

  function inject() {
    const placeholder = document.querySelector('[data-include="footer"]');
    if (!placeholder) return;
    placeholder.outerHTML = FOOTER_HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
