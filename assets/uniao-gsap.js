/* Bloco "o que nos move": rostos da diretoria (efeitos inspirados no React Bits: BounceCards + Magnet,
   recriados com GSAP porque o site é HTML puro) e três palavras que passam na horizontal.
   Sem GSAP ou com "reduzir movimento", fica tudo parado e legível. */
(function () {
  'use strict';
  var G = window.gsap, ST = window.ScrollTrigger;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var box = document.querySelector('.uf');
  if (!box || !G || !ST || reduce) { if (box) box.classList.add('uf-static'); return; }
  G.registerPlugin(ST);

  var faces = G.utils.toArray('.uf-faces img');
  var wrap = document.querySelector('.uf-faces');
  var quote = document.querySelector('.uf-quote');

  // frase entra palavra por palavra
  if (quote && !quote.dataset.sp) {
    quote.dataset.sp = '1';
    var txt = quote.textContent.trim().split(/\s+/);
    quote.setAttribute('aria-label', quote.textContent.trim());
    quote.innerHTML = txt.map(function (w) { return '<span class="uf-w" aria-hidden="true"><span>' + w + '</span></span>'; }).join(' ');
    G.set('.uf-w > span', { yPercent: 110 });
    ST.create({ trigger: quote, start: 'top 85%', once: true, onEnter: function () {
      G.to('.uf-w > span', { yPercent: 0, duration: .9, ease: 'expo.out', stagger: .06 });
    } });
  }

  // ---- BounceCards: entrada com mola, do centro para fora ----
  G.set(faces, { scale: 0, autoAlpha: 0 });
  ST.create({ trigger: wrap, start: 'top 82%', once: true, onEnter: function () {
    G.to(faces, { autoAlpha: 1, duration: .25, stagger: { each: .06, from: 'center' } });
    G.to(faces, { scale: 1, duration: 1.4, ease: 'elastic.out(1,0.55)', stagger: { each: .06, from: 'center' }, onComplete: ready });
  } });

  function ready() {
    // anda em velocidades diferentes com a rolagem (colunas alternadas)
    faces.forEach(function (img, i) {
      var amp = i % 3 === 1 ? -14 : 14;
      G.fromTo(img, { yPercent: -amp / 2 }, { yPercent: amp / 2, ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: .6 } });
    });

    // toque (celular): a foto tocada cresce e empurra as vizinhas, como o hover do BounceCards
    var back = null;
    function push(i) {
      clearTimeout(back);
      var c = center(faces[i]);
      faces.forEach(function (f, j) {
        if (j === i) { G.to(f, { scale: 1.14, duration: .7, ease: 'elastic.out(1,0.5)', overwrite: 'auto' }); return; }
        var o = center(f), dx = o.x - c.x, dy = o.y - c.y, d = Math.hypot(dx, dy) || 1;
        var k = Math.max(0, 1 - d / 260) * 26;
        G.to(f, { x: dx / d * k, y: dy / d * k, scale: .94, duration: .7, ease: 'elastic.out(1,0.55)', overwrite: 'auto' });
      });
    }
    function settle() {
      back = setTimeout(function () {
        G.to(faces, { x: 0, y: 0, scale: 1, duration: .9, ease: 'elastic.out(1,0.6)', overwrite: 'auto' });
      }, 650);
    }

    // toque: chuva de doces e utensílios de cozinha sai da foto (no lugar de anéis)
    var NS = 'http://www.w3.org/2000/svg';
    var ICONS = [
      '<path d="M7 14v5h10v-5M6.5 14a4 4 0 0 1-.6-7.7A4.5 4.5 0 0 1 12 3.5a4.5 4.5 0 0 1 6.1 2.8 4 4 0 0 1-.6 7.7"/>',
      '<rect x="9" y="3" width="6" height="8" rx="1.5"/><path d="M12 11v10M11 5v3M13 5v3"/>',
      '<path d="M6 12h12l-1.6 8H7.6z"/><path d="M5.5 12a3.5 3.5 0 0 1 2.5-4.2A4 4 0 0 1 16 7.8 3.5 3.5 0 0 1 18.5 12M12 4.5V3"/>',
      '<path d="M12 21v-5M12 16c-4 0-5-5-5-8 0-2 1.3-3 5-3s5 1 5 3c0 3-1 8-5 8zM12 5v11M9 6.5c-.4 3.5 1 7.5 3 9.5M15 6.5c.4 3.5-1 7.5-3 9.5"/>',
      '<rect x="6" y="9" width="12" height="6" rx="2"/><path d="M3 12h3M18 12h3"/>',
      '<circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r="1"/><circle cx="14.5" cy="9" r="1"/><circle cx="14" cy="14.5" r="1"/><circle cx="9.5" cy="15" r=".8"/>',
      '<circle cx="8" cy="16" r="3.5"/><circle cx="16" cy="17" r="3.5"/><path d="M8 12.5C9 8 12 5 15 4c0 4-.5 8-.5 9.5M15 4c1.5.3 3 1 4 2"/>',
      '<path d="M5 10a7 3.5 0 0 1 14 0zM5 14a7 3.5 0 0 0 14 0zM6 12h12"/>',
      '<circle cx="12" cy="12" r="4"/><path d="M8 12L3.5 9v6zM16 12l4.5-3v6z"/>'
    ];
    function burst(img) {
      var wr = wrap.getBoundingClientRect(), r = img.getBoundingClientRect();
      var cx = r.left - wr.left + r.width / 2, cy = r.top - wr.top + r.height / 2, n = 8;
      var order = G.utils.shuffle(ICONS.slice());
      for (var k = 0; k < n; k++) {
        var s = document.createElementNS(NS, 'svg');
        s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
        s.setAttribute('class', 'uf-ic c' + (k % 3));
        s.innerHTML = order[k % order.length];
        wrap.appendChild(s);
        var a = (k / n) * Math.PI * 2 + Math.random() * .6, d = r.width * .62 + 40 + Math.random() * 50;
        G.fromTo(s, { x: cx, y: cy, scale: .2, rotation: 0, autoAlpha: 1 },
          { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, scale: 1.05, rotation: (Math.random() - .5) * 120, duration: .9, ease: 'back.out(1.6)' });
        G.to(s, { autoAlpha: 0, duration: .45, delay: .75, onComplete: (function (el) { return function () { el.remove(); }; })(s) });
      }
    }
    faces.forEach(function (f, i) {
      f.addEventListener('pointerdown', function () { burst(f); });
      f.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch' || e.pointerType === 'pen') { push(i); settle(); } });
    });

    // mouse (computador): efeito Magnet — as fotos próximas "puxam" em direção ao cursor
    var movers = faces.map(function (f) {
      return { x: G.quickTo(f, 'x', { duration: .9, ease: 'elastic.out(1,0.5)' }), y: G.quickTo(f, 'y', { duration: .9, ease: 'elastic.out(1,0.5)' }) };
    });
    var pad = 90, ticking = false, px = 0, py = 0, on = false;
    function frame() {
      ticking = false;
      faces.forEach(function (f, i) {
        var r = f.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = px - cx, dy = py - cy, out = Math.max(0, Math.hypot(dx, dy) - r.width / 2);
        var near = on && out < pad;
        movers[i].x(near ? Math.max(-16, Math.min(16, dx * .3)) : 0);
        movers[i].y(near ? Math.max(-16, Math.min(16, dy * .3)) : 0);
      });
    }
    wrap.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY; on = true;
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    });
    wrap.addEventListener('pointerleave', function () { on = false; frame(); });
  }
  function center(el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }

  // palavras: duas faixas em sentidos opostos; aceleram quando o dedo rola a página
  var tracks = G.utils.toArray('.uf-track');
  var tweens = tracks.map(function (t, i) {
    if (i % 2) G.set(t, { xPercent: -50 });
    return G.to(t, { xPercent: i % 2 ? 0 : -50, duration: 34 - i * 4, ease: 'none', repeat: -1 });
  });
  ST.create({ trigger: '.uf-words', start: 'top bottom', end: 'bottom top',
    onToggle: function (s) { tweens.forEach(function (tw) { s.isActive ? tw.resume() : tw.pause(); }); },
    onUpdate: function (s) {
      var v = Math.min(Math.abs(s.getVelocity()) / 350, 5);
      tweens.forEach(function (tw) { G.to(tw, { timeScale: 1 + v, duration: .25, overwrite: true }); });
      G.to(tweens, { timeScale: 1, duration: 1.1, delay: .2, overwrite: 'auto' });
    } });
})();
