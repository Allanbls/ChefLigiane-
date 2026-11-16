/* Menu hambúrguer da capa. Arquivo externo por causa do CSP (script-src 'self'). */
(function () {
  'use strict';
  var b = document.querySelector('.nav-burger'), m = document.getElementById('menuPanel'), root = document.documentElement;
  if (!b || !m) return;
  function set(open) {
    m.classList.toggle('on', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    root.classList.toggle('menu-open', open);
  }
  b.addEventListener('click', function () { set(!m.classList.contains('on')); });
  m.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && m.classList.contains('on')) { set(false); b.focus(); }
  });

  // motivos em pratos: toque gira o prato e mostra o motivo embaixo
  var pr = document.querySelector('.pratos');
  if (pr) {
    var bs = [].slice.call(pr.querySelectorAll('button')), h = pr.querySelector('h4'), p = pr.querySelector('p');
    var pick = function (i) {
      bs.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      h.textContent = bs[i].dataset.t; p.textContent = bs[i].dataset.d;
    };
    bs.forEach(function (b, i) { b.addEventListener('click', function () { pick(i); }); });
    pick(0);
  }
})();
