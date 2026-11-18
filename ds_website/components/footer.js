(() => {
  const slot = document.querySelector('[data-include="footer"]');
  if (!slot) return;
  slot.outerHTML = `<footer class="site-footer"><div class="footer-inner"><span class="footer-brand">Debashish Sasmal</span><span class="footer-sub">Healthcare Venture Builder | Product + Platform Executive · Pittsburgh, PA</span><ul class="footer-links"><li><a class="footer-link" href="https://theproductsignal.com/">PODCAST</a></li><li><a class="footer-link" href="mailto:debashish.sasmal@gmail.com">EMAIL</a></li><li><a class="footer-link" href="https://www.linkedin.com/in/dsasmal/">LINKEDIN</a></li><li><a class="footer-link" href="https://github.com/sasmald">GITHUB</a></li></ul></div></footer>`;
})();
