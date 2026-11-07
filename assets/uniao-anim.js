/* Animações da União: títulos que entram palavra por palavra ao rolar e linha do tempo dos 6 motivos.
   Carrega antes do app.js. Sem GSAP ou com "reduzir movimento", tudo aparece parado e legível. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var G = window.gsap, ST = window.ScrollTrigger;
  if (G && ST) { try { G.registerPlugin(ST); } catch (e) {} }

  // ---------- títulos: quebra em palavras ----------
  function split(el) {
    var partes = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (t) {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          var w = document.createElement('span'); w.className = 'w';
          var i = document.createElement('span'); i.textContent = t;
          w.appendChild(i); frag.appendChild(w); partes.push(i);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        partes.push(n); // ex.: a frase manuscrita entra inteira, depois das palavras
      }
    });
    return partes;
  }
  var titulos = document.querySelectorAll('[data-split]');
  Array.prototype.forEach.call(titulos, function (el) {
    el.classList.remove('reveal');
    if (!G || !ST || reduce) return;
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var partes = split(el);
    Array.prototype.forEach.call(el.children, function (c) { c.setAttribute('aria-hidden', 'true'); });
    var palavras = partes.filter(function (p) { return p.parentNode && p.parentNode.className === 'w'; });
    var extras = partes.filter(function (p) { return palavras.indexOf(p) < 0; });
    var tl = G.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.from(palavras, { yPercent: 115, rotate: 5, duration: .85, ease: 'expo.out', stagger: .045 });
    if (extras.length) tl.from(extras, { y: 18, opacity: 0, rotate: -4, duration: .7, ease: 'back.out(1.8)' }, '-=.45');
  });

  // ---------- linha do tempo dos 6 motivos ----------
  var lista = document.getElementById('tlMotivos');
  if (lista && !reduce) {
    var itens = lista.querySelectorAll('.tl-item');
    lista.classList.add('js-tl');
    if (G && ST) {
      lista.style.setProperty('--p', 0);
      ST.create({ trigger: lista, start: 'top 72%', end: 'bottom 60%', scrub: true,
        onUpdate: function (self) { lista.style.setProperty('--p', self.progress.toFixed(3)); } });
      Array.prototype.forEach.call(itens, function (it) {
        ST.create({ trigger: it, start: 'top 72%', onEnter: function () { it.classList.add('on'); }, onLeaveBack: function () { it.classList.remove('on'); } });
      });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); }); }, { rootMargin: '0px 0px -28% 0px' });
      Array.prototype.forEach.call(itens, function (it) { io.observe(it); });
    } else {
      lista.classList.remove('js-tl');
    }
  }
})();
