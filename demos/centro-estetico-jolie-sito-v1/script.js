/* Centro Estetico Jolie — JS condiviso fra index.html e trattamenti.html.
   Estratto verbatim dallo <script> inline di index.html: i blocchi usati da
   una pagina sola restano inline in quella pagina. */

/* motion-locali: scroll-reveal */
(function () {
  'use strict';
  function revealAll() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-in');
    });
  }
  function init() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }
    els.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--reveal-delay', parseInt(d, 10) + 'ms');
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/* menu delle sezioni: apre, chiude su voce / Esc / click fuori */
(function () {
  'use strict';
  function init() {
    var bottone = document.querySelector('.header-menu-toggle');
    var pannello = document.getElementById('menu-sezioni');
    if (!bottone || !pannello) return;
    function apri() {
      pannello.hidden = false;
      bottone.setAttribute('aria-expanded', 'true');
      var prima = pannello.querySelector('a');
      if (prima) prima.focus();
    }
    function chiudi(tornaAlBottone) {
      if (pannello.hidden) return;
      pannello.hidden = true;
      bottone.setAttribute('aria-expanded', 'false');
      if (tornaAlBottone) bottone.focus();
    }
    bottone.addEventListener('click', function () {
      if (pannello.hidden) apri();
      else chiudi(false);
    });
    pannello.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a[href^="#"]')) chiudi(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') chiudi(true);
    });
    /* pointerdown e non click: su Safari iOS il click su un elemento non
       interattivo non arriva sempre fino a document */
    document.addEventListener('pointerdown', function (e) {
      if (pannello.contains(e.target) || bottone.contains(e.target)) return;
      chiudi(false);
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/* motion-locali: ripple-press */
(function (global) {
  'use strict';
  function reduced() { return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function spawn(el, e) {
    var r = el.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2;
    var x = (e.clientX != null ? e.clientX : r.left + r.width / 2) - r.left;
    var y = (e.clientY != null ? e.clientY : r.top + r.height / 2) - r.top;
    var wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.width = wave.style.height = size + 'px';
    wave.style.left = (x - size / 2) + 'px';
    wave.style.top = (y - size / 2) + 'px';
    el.appendChild(wave);
    wave.addEventListener('animationend', function () { wave.remove(); });
  }
  function attach(el) {
    if (el.__rippleBound) return;
    el.__rippleBound = true;
    el.addEventListener('pointerdown', function (e) { if (!reduced()) spawn(el, e); });
  }
  function init() {
    var els = document.querySelectorAll('.ripple');
    for (var i = 0; i < els.length; i++) attach(els[i]);
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})(window);
