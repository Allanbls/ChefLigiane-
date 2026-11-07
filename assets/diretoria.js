/* Diretoria da União Chefs Empreendedores: fileira de miniaturas no site + pop-up com scrollytelling bordado.
   EDITAR: cada chef é um item de D (mesma ordem das miniaturas no index.html).
   - n: nome (aparece grande na placa da foto e no texto) · r: cidade/cargo (aparece na placa)
   - t: frase de destaque (para marcar uma palavra use <span class="hl">palavra</span>)
   - b: parágrafos; cada parágrafo é um "passo" da rolagem
   - e: bordados que aparecem em cada passo (um grupo por parágrafo). Nomes disponíveis em ICON. */
(function () {
  "use strict";
  var D = [
    { n: "Ligia do Vale", r: "Fundadora & CEO", f: "ligia-do-vale", lead: true,       t: 'Fundadora e <span class="hl">CEO</span> da União Chefs Empreendedores',
      b: ["Chef confeiteira, professora e embaixadora oficial da Cobertop.",
          "Roda o Brasil com aulas e demonstrações em feiras e eventos, com técnica, alegria e muito chocolate.",
          "Ajuda chefs a virarem professores e a crescer na profissão. “Aqui, crescemos juntos.”"],
      e: [["rings", "chocolate"], ["mic"], ["gradcap", "heart"]] },
    { n: "Paula Santana", r: "Guarulhos, SP", f: "paula-santana", t: 'Gastrônoma e <span class="hl">confeiteira</span> artesanal infantil',
      b: ["Gastrônoma de Guarulhos, SP, especializada em confeitaria artesanal infantil.", "Apaixonada pela arte em pasta americana e sempre aprendendo.", "Dona da Paula’s Cakes Confeitaria, onde o amor pelo doce se torna único."],
      e: [["pin", "chefhat"], ["whisk", "cake"], ["heart"]] },
    { n: "Iuri Sena", r: "Guarujá, SP", f: "iuri-sena", t: 'Ninguém é <span class="hl">Campeão</span> Sozinho.',
      b: ["Professor, empreendedor e Cake Designer de Guarujá, SP. Campeão do Que Seja Doce (GNT).", "Também venceu Melhor Brigadeiro (Mauá-SP) e Melhor Sobremesa de Pitanga (Guarujá-SP).", "Criou a Bailarina Elétrica, equipamento que inovou o trabalho na confeitaria."],
      e: [["trophy"], ["brigadeiro", "star"], ["stand", "book"]] },
    { n: "Priscilla Junia", r: "Ribeirão das Neves e Esmeraldas, MG", f: "priscilla-junia", t: 'Liderar é transformar <span class="hl">paixão</span> em oportunidades',
      b: ["Diretora da União Chefs Empreendedores.", "Representa Ribeirão das Neves e Esmeraldas, em Minas Gerais.", "“Liderar é valorizar quem faz da gastronomia uma arte.”"],
      e: [["crown"], ["pin"], ["flame", "heart"]] },
    { n: "Joelma Venâncio", r: "Diretora · Todo o Brasil", f: "joelma-venancio", t: 'Quando Deus está à frente, o impossível vira <span class="hl">testemunho</span>',
      b: ["Especialista em chantininho, atendimento em camarins e produção de artistas em todo o Brasil.", "Movida por sonhos, propósito e fé. 🍒✨"],
      e: [["pipingbag", "star"], ["cherry", "heart"]] },
    { n: "Demontiez Alves", r: "Juazeiro do Norte, CE", f: "demontiez-alves", t: 'Mais que doces, <span class="hl">experiências</span> surpreendentes',
      b: ["Tecnólogo em Alimentos de Juazeiro do Norte, CE. Com a esposa, criou o Atelier Ideias Doces, doceria artesanal.", "Na União Chefs Empreendedores, mostra seu trabalho e cresce na profissão."],
      e: [["rings", "cupcake"], ["gift", "star"]] },
    { n: "Leandro Acevedo", r: "Argentino · Interior de São Paulo", f: "leandro-acevedo", t: 'Criatividade, dedicação e <span class="hl">amor</span> pelo que faço',
      b: ["Argentino, mora no interior de São Paulo. Confeiteiro profissional e empreendedor.", "Transforma ingredientes em experiências e emoções, sempre buscando inovar."],
      e: [["sun", "whisk"], ["book", "heart"]] },
    { n: "Angélica Oliveira", r: "Poconé, MT", f: "angelica-oliveira", t: 'Transformar ingredientes em <span class="hl">amor</span>',
      b: ["De Poconé, MT. Formada em Gastronomia e pós-graduada em Confeitaria e Panificação.", "Para ela, confeitar é criar memórias afetivas e levar felicidade às pessoas.", "Na União Chefs Empreendedores, troca experiências e cresce junto. 💕"],
      e: [["gradcap", "bread"], ["heart", "cake"], ["rings"]] },
    { n: "Ariana Silva", r: "Feira de Santana, BA", f: "ariana-silva", t: 'Talento, experiência e <span class="hl">dedicação</span>',
      b: ["Renomada chef de cozinha de Feira de Santana, na Bahia.", "Na diretoria, contribui com talento e dedicação para a associação crescer."],
      e: [["chefhat", "pot"], ["star", "rings"]] }
  ];
  var COR = ["#BC2350", "#FFB81C", "#FF9A3D", "#BC2350", "#19B5B0", "#2F9E4F", "#74ACDF", "#FF9A3D", "#0B7471"];
  var SCENE = ["#FFB81C", "#FFB81C", "#FF9A3D", "#BC2350", "#19B5B0", "#2F9E4F", "#74ACDF", "#FF9A3D", "#0B7471"];
  var THREAD = ["#BC2350", "#0B7471", "#3A1F1A", "#FF9A3D", "#2F9E4F", "#0A2244", "#19B5B0"];
  var IMG = "imagens/diretoria/";

  /* bordados: desenhos em linha (grade 64x64) */
  var ICON = {
    heart: "M32 52C14 40 8 31 8 22 8 14 14 9 21 9c5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 5 13 13 0 9-6 18-24 30z",
    star: "M32 8l6.5 16L56 25 42.5 36 47 53 32 43.5 17 53l4.5-17L8 25l17.5-1z",
    sparkle: "M32 6c2 18 8 24 26 26-18 2-24 8-26 26-2-18-8-24-26-26 18-2 24-8 26-26z",
    whisk: "M32 58V36M28 58h8M32 36C20 30 18 10 32 6c14 4 12 24 0 30M32 36c-6-8-6-24 0-30 6 6 6 22 0 30",
    cake: "M10 54h44M14 54V40h36v14M20 40V28h24v12M32 28V19M32 11c-3 3-3 6 0 8 3-2 3-5 0-8zM14 47c6 4 12-4 18 0s12-4 18 0",
    cupcake: "M16 34h32l-5 22H21zM25 34l2 22M32 34v22M39 34l-2 22M14 34c-4-12 8-20 14-16 2-10 14-10 16 0 8-2 12 10 6 16M32 10c1-4 4-6 7-6",
    trophy: "M20 10h24v14c0 10-6 16-12 16s-12-6-12-16zM20 15h-8c0 10 4 14 9 15M44 15h8c0 10-4 14-9 15M32 40v8M22 56h20v-6H22z",
    crown: "M10 46l4-28 10 14 8-20 8 20 10-14 4 28zM12 54h40",
    chefhat: "M18 40c-10-2-10-18 2-18 0-10 10-14 14-8 6-8 20-2 16 8 8 0 8 16-4 18zM18 40v14h28V40M18 48h28",
    cherry: "M13 50a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM33 46a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM22 41c2-15 8-25 18-31M42 37c-2-11-4-19-2-27M40 10c6-4 12-2 14 2-6 2-10 1-14-2z",
    pipingbag: "M10 16c6-6 14-6 20 0l22 34-6 6zM46 56l3 5M52 50l5 2M18 24l8 2M24 34l8 2",
    wheat: "M32 58V14M32 18c-6-2-8-8-6-12 4 2 6 6 6 12 0-6 2-10 6-12 2 4 0 10-6 12M32 30c-8-2-10-8-8-12 4 2 8 6 8 12 0-6 4-10 8-12 2 4 0 10-8 12M32 42c-8-2-10-8-8-12 4 2 8 6 8 12 0-6 4-10 8-12 2 4 0 10-8 12",
    bread: "M10 40c0-18 44-18 44 0v10H10zM22 30l4 8M32 28l3 9M42 30l2 8",
    gradcap: "M4 26l28-12 28 12-28 12zM16 32v14c8 8 24 8 32 0V32M60 26v16",
    pin: "M32 58C22 44 14 36 14 26 14 16 22 8 32 8s18 8 18 18c0 10-8 18-18 32zM25 26a7 7 0 1 0 14 0 7 7 0 1 0-14 0z",
    mic: "M24 18a8 8 0 0 1 16 0v14a8 8 0 0 1-16 0zM16 30c0 10 8 16 16 16s16-6 16-16M32 46v10M22 56h20",
    plane: "M56 40v-5L36 22V9a4 4 0 0 0-8 0v13L8 35v5l20-6v15l-5 4v4l9-2.5 9 2.5v-4l-5-4V34z",
    rings: "M8 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0zM30 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0z",
    gift: "M10 26h44v8H10zM14 34v22h36V34M32 26v30M32 26c-6-10-16-10-14-4 2 4 10 4 14 4 4 0 12 0 14-4 2-6-8-6-14 4",
    sun: "M20 32a12 12 0 1 0 24 0 12 12 0 1 0-24 0zM32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7",
    flame: "M32 58c-14 0-20-10-18-20 2-10 12-14 12-26 8 6 10 12 8 18 4-2 6-6 6-10 8 8 12 16 10 24-2 8-8 14-18 14zM32 58c-6 0-8-6-6-12 2-4 6-6 6-10 4 4 8 8 6 14-1 5-3 8-6 8",
    book: "M32 16c-8-6-18-6-26-2v38c8-4 18-4 26 2 8-6 18-6 26-2V14c-8-4-18-4-26 2zM32 16v38",
    stand: "M12 24h40M14 24c0 8 36 8 36 0M32 30v18M20 56h24l-4-8H24zM50 12c5 2 7 6 5 10M14 12c-5 2-7 6-5 10",
    pot: "M10 26h44M14 26v20c0 6 4 10 10 10h16c6 0 10-4 10-10V26M6 30h8M50 30h8M26 26v-6h12v6M25 15c0-4 4-4 4-8M35 15c0-4 4-4 4-8",
    spoon: "M32 60V30M32 30c-8 0-10-10-10-16 0-6 4-10 10-10s10 4 10 10c0 6-2 16-10 16z",
    chocolate: "M14 10h36v44H14zM14 24h36M14 39h36M32 10v44",
    brigadeiro: "M18 32a14 14 0 1 0 28 0 14 14 0 1 0-28 0zM14 46c6 6 30 6 36 0l-4 12H18zM26 26h2M34 24h2M38 32h2M28 36h2M24 31h1"
  };
  var uid = 0;
  /* patch bordado: feltro + borda em ponto cheio + desenho em ponto corrido que "costura" ao aparecer */
  function patch(name, thread, felt, cls, rot) {
    var d = ICON[name] || ICON.star, id = "drm" + (uid++);
    return '<svg class="drp-patch ' + (cls || "") + '" viewBox="-4 -4 72 72" style="--r:' + (rot || 0) + 'deg" aria-hidden="true">' +
      '<circle cx="32" cy="32" r="31" fill="' + felt + '"/>' +
      '<circle class="st" cx="32" cy="32" r="30" stroke="' + thread + '" stroke-width="4" stroke-dasharray="1.3 .8"/>' +
      '<circle class="st" cx="32" cy="32" r="25" stroke="' + thread + '" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="3 2.4"/>' +
      '<g transform="translate(14 14) scale(.5625)"><mask id="' + id + '"><path class="drw" d="' + d + '" pathLength="1" stroke-width="10"/></mask>' +
      '<path class="st" d="' + d + '" stroke="rgba(58,31,26,.22)" stroke-width="4" stroke-dasharray="6 3.4" transform="translate(.8 1.2)" mask="url(#' + id + ')"/>' +
      '<path class="st" d="' + d + '" stroke="' + thread + '" stroke-width="4" stroke-dasharray="6 3.4" mask="url(#' + id + ')"/></g></svg>';
  }
  /* ilustração de fundo: [esquerda %, topo %, tamanho, velocidade da paralaxe] */
  var BGPOS = [[-10, 4, 1, 1], [74, 26, .8, -.8], [-6, 56, .9, .7], [70, 80, .75, -1]];
  function bgArt(name, pos) {
    return '<svg class="drp-bgi" viewBox="0 0 64 64" style="left:' + pos[0] + "%;top:" + pos[1] + "%;--k:" + pos[2] + ";--sp:" + pos[3] + '"><path d="' + (ICON[name] || ICON.sparkle) + '"/></svg>';
  }
  /* lugares ao redor da foto (em % da caixa da foto) */
  var SLOT = [[-20, 26], [84, 10], [-18, 54], [86, 38], [84, 64]];
  var ROT = [-12, 9, 6, -8, 14, -5, -14, 10];

  /* logo da ficha de inscrição: some sem deixar buraco se a imagem faltar */
  [].forEach.call(document.querySelectorAll("img.fm-logo, img.am-logo"), function (im) {
    var hide = function () { im.style.display = "none"; };
    if (im.complete && !im.naturalWidth) hide(); else im.addEventListener("error", hide);
  });
  var pop = document.getElementById("drPop");
  if (!pop) return;
  var $ = function (s, r) { return (r || pop).querySelector(s); };
  var list = $("#drpList"), dots = $("#drpDots"), count = $("#drpCount"), bar = $("#drpBar");
  var hero = $("#drpHero"), end = $("#drpEnd"), motifs = $(".drp-motifs"), washes = [].slice.call(pop.querySelectorAll(".drp-wash"));
  var pad = function (n) { return String(n + 1).padStart(2, "0"); };
  var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
  var N = D.length;
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var desk = matchMedia("(min-width:900px)");

  /* logo: se a imagem não carregar, some sem deixar buraco */
  [].forEach.call(pop.querySelectorAll("img[data-logo]"), function (im) {
    var hide = function () { im.style.display = "none"; };
    if (im.complete && !im.naturalWidth) hide(); else im.addEventListener("error", hide);
  });

  /* ---- monta as cenas (só quando a fileira chega perto da tela, ou na primeira abertura) ---- */
  var scenes = [], figEls = [], stage = null, dotEls = [], heroBg = null, moEls = [], moPos = null, built = false;
  function buildScenes() {
  var html = "", figs = "";
  D.forEach(function (d, i) {
    var emb = "", k = 0;
    d.e.forEach(function (group, step) {
      group.forEach(function (name) {
        var s = SLOT[k % SLOT.length], alt = k % 2;
        /* .drp-ps balança com a rolagem; o patch dentro dele "costura" quando o parágrafo chega */
        emb += '<span class="drp-ps" style="left:' + s[0] + "%;top:" + s[1] + "%;--dx:" + (k % 2 ? 12 : -12) + "px;--rr:" + (k % 2 ? -10 : 10) + 'deg">' +
          patch(name, alt ? "#FFF8EC" : THREAD[(i + k) % THREAD.length], alt ? THREAD[(i + k) % THREAD.length] : "#FFFDF8", "", ROT[k % ROT.length])
            .replace('style="', 'data-step="' + step + '" style="') + "</span>";
        k++;
      });
    });
    /* ilustrações bordadas grandes no fundo da cena, ligadas ao que a chef conta */
    var bgIcons = [], flat = [].concat.apply([], d.e).concat(["whisk", "cake", "heart", "cupcake"]);
    flat.forEach(function (n) { if (bgIcons.indexOf(n) < 0 && bgIcons.length < 4) bgIcons.push(n); });
    var bg = bgIcons.map(function (n, b) { return bgArt(n, BGPOS[b]); }).join("");
    /* a foto vai para o "palco" único (só uma chef aparece por vez, sem cruzar com a outra) */
    figs += '<div class="drp-fig' + (d.lead ? " lead" : "") + '" data-i="' + i + '" style="--c:' + SCENE[i] + '"><div class="drp-pic"><div class="drp-giant" aria-hidden="true">' + esc(d.n.split(" ")[0]) + '</div><div class="drp-blob"></div>' +
      '<div class="drp-arch"><img src="' + IMG + d.f + '.jpg" width="800" height="1067" alt="Chef ' + esc(d.n) + '" loading="' + (i < 2 ? "eager" : "lazy") + '" decoding="async"></div>' +
      '<svg class="drp-frame" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true"><mask id="drf' + i + '"><path class="drw" pathLength="1" stroke-width="12" d="M-12 412V150a162 162 0 0 1 324 0v262z"/></mask><path class="th" d="M-12 412V150a162 162 0 0 1 324 0v262z" mask="url(#drf' + i + ')"/></svg>' +
      (d.lead ? '<div class="drp-crown">' + patch("crown", "#BC2350", "#FFB81C", "on") + "</div>" : "") +
      '<div class="drp-plate"><b>' + esc(d.n) + '</b><small>' + esc(d.r) + '</small></div>' +
      '<div class="drp-seal" aria-hidden="true"><svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="68" fill="' + (d.lead ? "#BC2350" : "#3A1F1A") + '"/><circle cx="70" cy="70" r="62" fill="none" stroke="#FFB81C" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="4 3"/><defs><path id="drpc' + i + '" d="M70 70m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0"/></defs><text font-family="Figtree,sans-serif" font-weight="800" font-size="11" fill="#FFB81C"><textPath href="#drpc' + i + '" textLength="312" lengthAdjust="spacing">UNIÃO CHEFS · DIRETORIA · UNIÃO CHEFS · DIRETORIA ·</textPath></text></svg><b>' + (d.lead ? "CEO" : pad(i)) + "</b></div>" +
      '<div class="drp-emb">' + emb + "</div></div></div>";
    html += '<section class="drp-scene' + (d.lead ? " lead" : "") + '" id="drp' + i + '" data-i="' + i + '" style="--c:' + SCENE[i] + '" aria-label="Chef ' + esc(d.n) + '">' +
      '<div class="drp-bg" aria-hidden="true">' + bg + "</div>" +
      '<div class="drp-txt"><div class="drp-head"><span class="drp-kick">' + (d.lead ? "Fundadora &amp; CEO" : "Chef") + '</span><h2 class="drp-nm">' + esc(d.n) + '</h2><p class="drp-quote">' + d.t + "</p></div>" +
      d.b.map(function (x, s) { return '<div class="drp-step" data-step="' + s + '"><p class="drp-b">' + esc(x) + "</p></div>"; }).join("") + "</div></section>";
  });
  list.innerHTML = '<div class="drp-stage" id="drpStage"><div class="drp-stage-in">' + figs + "</div></div>" + html;
  stage = list.firstChild; figEls = [].slice.call(stage.querySelectorAll(".drp-fig"));
  dots.innerHTML = D.map(function (d, i) { return '<button type="button" data-i="' + i + '" aria-label="Ir para Chef ' + esc(d.n) + '"></button>'; }).join("");
  scenes = [].slice.call(list.querySelectorAll(".drp-scene")); dotEls = [].slice.call(dots.children);
  heroBg = $(".drp-hero .drp-bg");
  if (heroBg) heroBg.innerHTML = ["cake", "whisk", "cupcake", "chocolate"].map(function (n, b) { return bgArt(n, [[-6, 6, 1, 1], [80, 10, .85, -.8], [74, 58, .9, .7], [-4, 62, .8, -1]][b]); }).join("");
  }

  /* ---- fundo interativo: bordados soltos no tecido ---- */
  var MO = ["whisk", "chefhat", "heart", "star", "cupcake", "wheat", "sparkle", "cherry", "rings", "pot", "cake", "sun", "bread", "spoon"];
  var seed = 7, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  function buildMotifs() {
  var moHTML = "";
  for (var m = 0; m < 16; m++) {
    var name = MO[m % MO.length], d = ICON[name] || ICON.sparkle;
    moHTML += '<i class="drp-mo" style="left:' + ((m % 4) * 25 + rnd() * 18).toFixed(1) + "%;top:" + (Math.floor(m / 4) * 25 + rnd() * 18).toFixed(1) + "%;--s:" + (34 + rnd() * 26).toFixed(0) + "px;--r:" + (rnd() * 60 - 30).toFixed(0) + "deg;--d:-" + (rnd() * 7).toFixed(1) + "s;--py:" + ((m % 2 ? -1 : 1) * (40 + rnd() * 70)).toFixed(0) + "px;--mc:" + THREAD[m % THREAD.length] + '"><svg viewBox="0 0 64 64"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="5 3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
  }
  motifs.innerHTML = moHTML;
  moEls = [].slice.call(motifs.children); moPos = null;
  }
  function measureMotifs() { moPos = moEls.map(function (e) { var r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); }
  function nearMotifs(x, y, rad) {
    if (!moPos) measureMotifs();
    moEls.forEach(function (e, i) { var dx = moPos[i][0] - x, dy = moPos[i][1] - y; e.classList.toggle("near", dx * dx + dy * dy < rad * rad); });
  }
  var pmT = 0;
  pop.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" || reduce) return;
    if (pmT) return; pmT = requestAnimationFrame(function () { pmT = 0; nearMotifs(e.clientX, e.clientY, 140); });
  }, { passive: true });
  /* toque em área vazia: pontinhos bordados saltam do dedo */
  pop.addEventListener("click", function (e) {
    if (reduce || e.target.closest("button,a,.drp-pic,.drp-txt")) return;
    var kit = motifs.parentNode;
    for (var k = 0; k < 7; k++) {
      var a = (k / 7) * Math.PI * 2 + rnd(), dist = 50 + rnd() * 40, b = document.createElement("i");
      b.className = "drp-burst";
      b.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;--bx:" + (Math.cos(a) * dist).toFixed(0) + "px;--by:" + (Math.sin(a) * dist).toFixed(0) + "px;--bc:" + THREAD[k % THREAD.length];
      b.innerHTML = '<svg viewBox="0 0 64 64" width="22" height="22"><path d="' + (k % 2 ? ICON.heart : ICON.sparkle) + '" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="6 4" stroke-linecap="round"/></svg>';
      kit.append(b);
      setTimeout(b.remove.bind(b), 850);
    }
    nearMotifs(e.clientX, e.clientY, 170);
    setTimeout(function () { moEls.forEach(function (el) { el.classList.remove("near"); }); }, 700);
  });
  addEventListener("resize", function () { moPos = null; });

  /* cor de fundo acompanha a chef atual (troca suave entre duas camadas) */
  var wi = 0, washColor = "";
  function wash(c) {
    if (c === washColor) return; washColor = c;
    wi = 1 - wi; washes[wi].style.setProperty("--w", c); washes[wi].classList.add("on"); washes[1 - wi].classList.remove("on");
  }

  /* ---- efeitos de texto (sem plugin: quebra em palavras/letras só para animar) ---- */
  var G = window.gsap && !reduce ? window.gsap : null;
  function splitWords(el, chars) {
    if (!el || el.dataset.split) return el ? el.querySelectorAll(chars ? ".ch" : ".w") : [];
    el.dataset.split = 1;
    if (chars) el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 1) { walk(n); return; }
        if (n.nodeType !== 3 || !n.nodeValue.trim()) return;
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span"); w.className = "w";
          if (chars) {
            w.setAttribute("aria-hidden", "true");
            Array.from(part).forEach(function (c) { var ch = document.createElement("span"); ch.className = "ch"; ch.textContent = c; w.appendChild(ch); });
          } else w.textContent = part;
          frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      });
    })(el);
    return el.querySelectorAll(chars ? ".ch" : ".w");
  }
  /* título de cada chef: letras sobem uma a uma, frase entra palavra por palavra */
  function playHead(scene) {
    if (scene.dataset.headDone) return; scene.dataset.headDone = 1;
    scene.classList.add("in");
    if (!G) return;
    var kick = scene.querySelector(".drp-kick"), nm = scene.querySelector(".drp-nm"), q = scene.querySelector(".drp-quote");
    var tl = G.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(kick, { autoAlpha: 0, letterSpacing: ".6em" }, { autoAlpha: 1, letterSpacing: ".2em", duration: .9 })
      .fromTo(splitWords(nm, true), { yPercent: 115, rotate: 14, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: .9, stagger: .035 }, .05)
      .fromTo(splitWords(q), { y: 22, autoAlpha: 0, rotate: 3 }, { y: 0, autoAlpha: 1, rotate: 0, duration: .7, stagger: .045 }, .35);
  }
  /* parágrafos: palavras aparecem em cascata quando entram na tela */
  function playStep(st) {
    if (st.dataset.txtDone) return; st.dataset.txtDone = 1;
    st.classList.add("seen");
    if (!G) return;
    G.fromTo(splitWords(st.querySelector(".drp-b")), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, ease: "power3.out", stagger: .018 });
  }

  /* ---- palco: uma chef por vez. Primeiro a atual sai, só depois a próxima entra ---- */
  var KB = [[1.18, 0, 0], [1.06, 0, 2], [1.14, -4, 6], [1.08, 3, -1], [1.16, 0, 8]];
  var curScene = -1, shown = -1, figTL = null;
  function setScene(i) {
    if (i === curScene) return;
    curScene = i;
    count.textContent = i > -1 ? pad(i) + " / " + pad(N - 1) : N + " chefs";
    dotEls.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    wash(i > -1 ? SCENE[i] : "#FFB81C");
    if (stage && i > -1) stage.style.setProperty("--c", SCENE[i]);
    /* carrega a foto atual e a próxima antes de precisar delas */
    [i, i + 1].forEach(function (k) { var im = figEls[k] && figEls[k].querySelector("img"); if (im) im.loading = "eager"; });
    showFig(i, false);
  }
  function partsOf(f) {
    return {
      arch: f.querySelector(".drp-arch"), img: f.querySelector(".drp-arch img"), blob: f.querySelector(".drp-blob"),
      plate: f.querySelector(".drp-plate"), seal: f.querySelector(".drp-seal"), giant: f.querySelector(".drp-giant"),
      crown: f.querySelector(".drp-crown"), ps: [].slice.call(f.querySelectorAll(".drp-ps")).filter(function (p) { return p.querySelector(".drp-patch.on"); })
    };
  }
  var CLIP_OPEN = "inset(0% 0% 0% 0% round 999px 999px 28px 28px)";
  function figOut(tl, f) {
    var p = partsOf(f);
    tl.to(p.ps.concat(p.crown ? [p.crown] : []), { y: 60, scale: .4, autoAlpha: 0, duration: .22, stagger: .03, ease: "power2.in" }, 0)
      .to([p.plate, p.seal], { y: 50, autoAlpha: 0, duration: .22, ease: "power2.in" }, 0)
      .to(p.arch, { clipPath: "inset(0% 0% 100% 0% round 999px 999px 28px 28px)", duration: .3, ease: "power3.in" }, .04)
      .to([p.blob, p.giant], { scale: .6, autoAlpha: 0, duration: .3, ease: "power2.in" }, .04)
      .set(f, { autoAlpha: 0 })
      .add(function () { f.classList.remove("on"); f.setAttribute("aria-hidden", "true"); });
  }
  function figIn(tl, f, at) {
    var p = partsOf(f);
    tl.add(function () { f.classList.add("on"); f.removeAttribute("aria-hidden"); }, at)
      .set(f, { autoAlpha: 1 }, at)
      .fromTo(p.blob, { scale: .4, rotate: -40, autoAlpha: 0 }, { scale: 1, rotate: 6, autoAlpha: 1, duration: 1, ease: "expo.out" }, at)
      .fromTo(p.giant, { xPercent: -10, yPercent: -50, scale: 1, autoAlpha: 0 }, { xPercent: -50, autoAlpha: 1, duration: 1.2, ease: "expo.out" }, at)
      .fromTo(p.arch, { clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }, { clipPath: CLIP_OPEN, duration: .8, ease: "power4.out" }, at + .05)
      .fromTo(p.img, { scale: 1.45 }, { scale: 1.18, xPercent: 0, yPercent: 0, duration: 1.3, ease: "expo.out" }, at + .05)
      /* selo, placa e bordados caem do alto e quicam */
      .fromTo(p.seal, { y: -220, rotate: -200, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: .9, ease: "bounce.out" }, at + .25)
      .fromTo(p.plate, { y: -260, rotate: 10, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: "bounce.out" }, at + .35)
      .fromTo(p.ps.concat(p.crown ? [p.crown] : []), { y: -240, rotate: -30, scale: 1, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: .9, ease: "bounce.out", stagger: .09 }, at + .45);
  }
  function showFig(i, instant) {
    if (!figEls.length || i === shown) return;
    var prev = shown; shown = i;
    if (!G) { figEls.forEach(function (f, k) { f.classList.toggle("on", k === i); f.style.visibility = k === i ? "visible" : "hidden"; f.style.opacity = k === i ? 1 : 0; }); return; }
    if (figTL) figTL.progress(1).kill();
    /* qualquer outra foto que ainda esteja na tela some na hora: nunca duas juntas */
    figEls.forEach(function (f, k) { if (k !== i && k !== prev) { G.set(f, { autoAlpha: 0 }); f.classList.remove("on"); } });
    figTL = G.timeline();
    var at = 0;
    if (prev > -1 && figEls[prev]) {
      if (instant) G.set(figEls[prev], { autoAlpha: 0 }); else { figOut(figTL, figEls[prev]); at = figTL.duration(); }
    }
    if (i > -1) figIn(figTL, figEls[i], at);
    if (instant) figTL.progress(1);
  }
  function activate(stepEl) {
    var s = stepEl.closest(".drp-scene"), i = +s.dataset.i, n = +stepEl.dataset.step, f = figEls[i];
    if (!f) return;
    [].forEach.call(s.querySelectorAll(".drp-step"), function (st) { if (+st.dataset.step <= n) st.classList.add("on"); });
    [].forEach.call(f.querySelectorAll(".drp-emb .drp-patch"), function (p) {
      if (+p.getAttribute("data-step") > n || p.classList.contains("on")) return;
      p.classList.add("on");
      /* bordado novo cai em cima da foto quando o parágrafo dele chega */
      if (G && shown === i) G.fromTo(p.parentNode, { y: -200, rotate: -25, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: .9, ease: "bounce.out" });
    });
    f.setAttribute("data-step", n);
    var kb = KB[(n + 1) % KB.length], img = f.querySelector(".drp-arch img");
    if (G) { if (shown === i && !(figTL && figTL.isActive())) G.to(img, { scale: kb[0], xPercent: kb[1], yPercent: kb[2], duration: 1.5, ease: "power3.out" }); }
    else img.style.transform = "scale(" + kb[0] + ") translate(" + kb[1] + "%," + kb[2] + "%)";
  }
  function complete(s) {
    var i = +s.dataset.i, f = figEls[i];
    if (s.dataset.done) return; s.dataset.done = 1;
    [].forEach.call(s.querySelectorAll(".drp-step"), function (el) { el.classList.add("on"); });
    if (f) [].forEach.call(f.querySelectorAll(".drp-emb .drp-patch"), function (el) { el.classList.add("on"); });
  }
  /* qual chef está na vez: a que tem o título passando pela linha de leitura */
  var rafS = 0;
  function pickScene() {
    rafS = 0;
    if (!pop.classList.contains("is-open") || !scenes.length) return;
    var vh = pop.clientHeight, top0 = pop.getBoundingClientRect().top;
    var stageH = desk.matches ? 0 : stage.offsetHeight;
    var line = desk.matches ? vh * .62 : (stage.offsetTop - pop.scrollTop + stageH + vh) / 2;
    var line0 = desk.matches ? vh * .62 : stageH + (vh - stageH) * .55;
    var act = -1;
    scenes.forEach(function (sc, k) { if (sc.getBoundingClientRect().top - top0 <= (k ? Math.max(line, line0) : vh * .78)) act = k; });
    var endTop = end.getBoundingClientRect().top - top0;
    if (endTop < vh * .55) act = -1;
    setScene(act);
  }
  pop.addEventListener("scroll", function () { if (!rafS) rafS = requestAnimationFrame(pickScene); }, { passive: true });
  addEventListener("resize", function () { if (!rafS) rafS = requestAnimationFrame(pickScene); });

  var stepIO = null, sceneIO, miscIO, txtIO;
  function buildStepIO() {
    if (stepIO) stepIO.disconnect();
    /* linha de leitura: meio da tela no computador; no celular, meio da área de texto abaixo da foto */
    stepIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) activate(e.target); });
    }, { root: pop, rootMargin: desk.matches ? "-48% 0px -48% 0px" : "-72% 0px -27% 0px" });
    [].forEach.call(pop.querySelectorAll(".drp-step"), function (st) { stepIO.observe(st); });
  }
  /* abertura e final do pop-up: letras entrando e botões caindo */
  function playHero() {
    if (!G || hero.dataset.fx) return; hero.dataset.fx = 1;
    var tl = G.timeline({ defaults: { ease: "expo.out" }, delay: .25 });
    tl.fromTo(hero.querySelector(".drp-logo"), { y: -160, rotate: -20, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: "bounce.out" })
      .fromTo(splitWords(hero.querySelector("h1"), true), { yPercent: 120, rotate: 18, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1, stagger: .04 }, .15)
      .fromTo(splitWords(hero.querySelector(".script")), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, stagger: .06 }, .7)
      .fromTo(hero.querySelector(".drp-hint"), { y: -60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, ease: "bounce.out" }, 1);
  }
  function playEnd() {
    if (!G || end.dataset.fx) return; end.dataset.fx = 1;
    var tl = G.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(splitWords(end.querySelector("h2"), true), { yPercent: 120, rotate: 16, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1, stagger: .03 })
      .fromTo(end.querySelectorAll(".btns .btn"), { y: -240, rotate: function (k) { return k ? 14 : -14; }, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 1.1, ease: "bounce.out", stagger: .15 }, .35);
  }
  function buildObservers() {
  if ("IntersectionObserver" in window) {
    buildStepIO();
    (desk.addEventListener ? desk.addEventListener("change", buildStepIO) : desk.addListener(buildStepIO));
    sceneIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) playHead(e.target.closest(".drp-scene")); });
    }, { root: pop, rootMargin: "0px 0px -12% 0px" });
    scenes.forEach(function (s) { sceneIO.observe(s.querySelector(".drp-head")); });
    txtIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { playStep(e.target); txtIO.unobserve(e.target); } });
    }, { root: pop, rootMargin: "0px 0px -10% 0px" });
    [].forEach.call(pop.querySelectorAll(".drp-step"), function (st) { txtIO.observe(st); });
    miscIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var t = e.target;
        if (t === hero) { t.classList.toggle("in", e.isIntersecting); if (e.isIntersecting) playHero(); return; }
        if (e.isIntersecting) { t.classList.add("in"); playEnd(); [].forEach.call(t.querySelectorAll(".drp-patch"), function (p, k) { setTimeout(function () { p.classList.add("on"); }, k * 160); }); }
      });
    }, { root: pop, threshold: 0.25 });
    [hero, end].forEach(function (el) { if (el) miscIO.observe(el); });
  } else {
    scenes.forEach(function (s) { complete(s); s.classList.add("in"); }); hero.classList.add("in"); end.classList.add("in");
  }
  }
  function build() {
    if (built) return; built = true;
    buildScenes(); buildMotifs(); buildObservers();
    if (G) {
      /* tudo do palco começa escondido; quem controla a entrada é o showFig */
      G.set(figEls, { autoAlpha: 0 });
      figEls.forEach(function (f) { f.setAttribute("aria-hidden", "true"); });
      /* o texto começa escondido para não "piscar" antes do efeito */
      pop.classList.add("fx");
    }
  }

  /* barra de progresso: CSS cuida dela onde há suporte; senão, um cálculo leve */
  if (!(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"))) {
    var tick = false;
    pop.addEventListener("scroll", function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { tick = false; var m = pop.scrollHeight - pop.clientHeight; bar.style.transform = "scaleX(" + (m > 0 ? pop.scrollTop / m : 0).toFixed(4) + ")"; });
    }, { passive: true });
  }

  function sceneTop(i) {
    var s = scenes[i], topH = pop.querySelector(".drp-top").offsetHeight;
    /* no celular o palco com a foto fica fixo em cima: o texto da chef começa logo abaixo dele */
    var off = desk.matches ? 0 : topH + (stage ? stage.offsetHeight : 0) - 4;
    return Math.max(0, Math.round(s.getBoundingClientRect().top - pop.getBoundingClientRect().top + pop.scrollTop - off));
  }

  /* ---- abrir / fechar ---- */
  var lastBtn = null, others = [], settleT = 0, viaHistory = false, afterClose = null;
  function setOrigin(el) {
    var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
    pop.style.setProperty("--ox", r ? (r.left + r.width / 2) + "px" : "50%");
    pop.style.setProperty("--oy", r && r.bottom > 0 && r.top < innerHeight ? (r.top + r.height / 2) + "px" : "50%");
  }
  function open(btn, i) {
    if (pop.classList.contains("is-open")) return;
    build();
    lastBtn = btn; setOrigin(btn);
    var root = document.documentElement;
    root.style.setProperty("--dr-sbw", (innerWidth - root.clientWidth) + "px");
    root.classList.add("dr-lock");
    others = [].filter.call(document.body.children, function (el) { return el !== pop && !/^(SCRIPT|DIALOG|svg)$/i.test(el.tagName) && !el.inert; });
    others.forEach(function (el) { el.inert = true; });
    pop.classList.add("is-open");
    if (i != null) {
      scenes.forEach(function (sc, k) { if (k < i) { complete(sc); playHead(sc); [].forEach.call(sc.querySelectorAll(".drp-step"), playStep); } });
      pop.scrollTop = sceneTop(i);
      shown = -1; curScene = -1;
      setScene(i);
      playHead(scenes[i]);
    } else { pop.scrollTop = 0; setScene(-1); hero.classList.add("in"); playHero(); }
    moPos = null;
    pop.focus({ preventScroll: true });
    settleT = setTimeout(function () { pop.classList.add("is-settled"); }, 950);
    try { history.pushState({ drp: 1 }, ""); viaHistory = true; } catch (e) { viaHistory = false; }
  }
  function close(fromPop) {
    if (!pop.classList.contains("is-open")) return;
    if (viaHistory && !fromPop) { viaHistory = false; history.back(); return; }
    viaHistory = false;
    clearTimeout(settleT);
    setOrigin(lastBtn);
    pop.classList.remove("is-settled");
    void pop.offsetWidth;
    pop.classList.remove("is-open");
    document.documentElement.classList.remove("dr-lock");
    others.forEach(function (el) { el.inert = false; }); others = [];
    if (lastBtn) lastBtn.focus({ preventScroll: true });
    if (afterClose) { var f = afterClose; afterClose = null; setTimeout(f, 60); }
  }
  addEventListener("popstate", function () { if (pop.classList.contains("is-open")) { viaHistory = false; close(true); } });

  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-dr-open]");
    if (t) { e.preventDefault(); var i = t.getAttribute("data-dr-open"); open(t, i === "" ? null : +i); }
  });
  pop.addEventListener("click", function (e) {
    var c = e.target.closest("[data-dr-close]");
    if (c) {
      if (c.hasAttribute("data-dr-goto")) {
        var id = c.getAttribute("data-dr-goto");
        afterClose = function () { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
      }
      close(); return;
    }
    var d = e.target.closest(".drp-dots button");
    if (d) pop.scrollTo({ top: sceneTop(+d.dataset.i), behavior: "smooth" });
  });
  document.addEventListener("keydown", function (e) {
    if (!pop.classList.contains("is-open")) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") {
      var f = [].filter.call(pop.querySelectorAll("button,a[href]"), function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === pop)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  /* ---- fileira de miniaturas: dedo (nativo), mouse (arrastar) e setas ----
     As setas e o arrasto usam uma animação própria e desligam o encaixe enquanto andam:
     "smooth" do navegador + encaixe obrigatório trava no iPhone e dá trancos no Android. */
  var track = document.getElementById("drTrack");
  if (track) {
    var prev = document.getElementById("drPrev"), next = document.getElementById("drNext"), anim = 0;
    var items = function () { return [].slice.call(track.children); };
    var maxX = function () { return track.scrollWidth - track.clientWidth; };
    var xOf = function (i) { var it = items(); return Math.max(0, Math.min(maxX(), it[i].offsetLeft - it[0].offsetLeft)); };
    var nearest = function (x) { var best = 0, bd = 1e9; items().forEach(function (_, i) { var d = Math.abs(xOf(i) - x); if (d < bd) { bd = d; best = i; } }); return best; };
    function stopAnim() { cancelAnimationFrame(anim); track.style.scrollSnapType = ""; }
    function animTo(x) {
      cancelAnimationFrame(anim);
      var from = track.scrollLeft, dist = x - from;
      if (reduce || Math.abs(dist) < 2) { track.scrollLeft = x; return; }
      var dur = Math.min(700, Math.max(320, Math.abs(dist) * 0.8)), t0 = performance.now();
      track.style.scrollSnapType = "none";
      (function step(now) {
        var t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
        track.scrollLeft = from + dist * e;
        if (t < 1) anim = requestAnimationFrame(step); else { track.scrollLeft = x; track.style.scrollSnapType = ""; }
      })(t0);
    }
    var upd = function () { if (prev) prev.disabled = track.scrollLeft <= 2; if (next) next.disabled = track.scrollLeft >= maxX() - 2; };
    if (prev) prev.addEventListener("click", function () { var x = track.scrollLeft, t = 0; items().forEach(function (_, i) { if (xOf(i) < x - 4) t = i; }); animTo(xOf(t)); });
    if (next) next.addEventListener("click", function () { var x = track.scrollLeft, n = items().length, t = n - 1; for (var i = 0; i < n; i++) if (xOf(i) > x + 4) { t = i; break; } animTo(xOf(t)); });
    /* cada chef "reage" ao arrasto: quem está na vez cresce, sorri para frente e ganha um bordado;
       quem está passando inclina, afunda e a foto desliza por dentro do arco */
    var cards = items();
    var POP = ["crown", "heart", "trophy", "star", "cherry", "cupcake", "sun", "cake", "chefhat"];
    cards.forEach(function (li, k) {
      var b = li.querySelector(".dr-card"); if (!b || b.querySelector(".dr-pop")) return;
      var sp = document.createElement("span"); sp.className = "dr-pop"; sp.setAttribute("aria-hidden", "true");
      sp.innerHTML = patch(POP[k % POP.length], k % 2 ? "#FFF8EC" : "#BC2350", k % 2 ? THREAD[k % THREAD.length] : "#FFFDF8", "on", 0);
      b.appendChild(sp);
    });
    var onK = -1;
    function react() {
      var x = track.scrollLeft, x0 = cards[0].offsetLeft, best = 0, bd = 1e9;
      cards.forEach(function (li, k) {
        var p = (li.offsetLeft - x0 - x) / Math.max(1, li.offsetWidth);
        p = Math.max(-2, Math.min(2, p));
        li.style.setProperty("--p", p.toFixed(3)); li.style.setProperty("--a", Math.abs(p).toFixed(3));
        if (Math.abs(p) < bd) { bd = Math.abs(p); best = k; }
      });
      if (best !== onK) { if (cards[onK]) cards[onK].classList.remove("is-on"); onK = best; cards[best].classList.add("is-on"); }
    }
    var ur = 0;
    track.addEventListener("scroll", function () { cancelAnimationFrame(ur); ur = requestAnimationFrame(function () { upd(); if (!reduce) react(); }); }, { passive: true });
    addEventListener("resize", function () { if (!reduce) react(); });
    if (!reduce) react();
    /* ao chegar na tela, as fotos caem uma a uma e quicam */
    if (window.gsap && !reduce && "IntersectionObserver" in window) {
      track.classList.add("dr-wait");
      var dropIO = new IntersectionObserver(function (es) {
        if (!es.some(function (e) { return e.isIntersecting; })) return;
        dropIO.disconnect(); track.classList.remove("dr-wait");
        window.gsap.fromTo(track.querySelectorAll(".dr-card"), { y: -140, rotate: function (k) { return k % 2 ? 8 : -8; }, autoAlpha: 0 },
          { y: 0, rotate: 0, autoAlpha: 1, duration: 1.05, ease: "bounce.out", stagger: .09, clearProps: "transform,opacity,visibility" });
      }, { rootMargin: "0px 0px -18% 0px" });
      dropIO.observe(track);
    }
    track.addEventListener("touchstart", stopAnim, { passive: true });
    track.addEventListener("wheel", stopAnim, { passive: true });
    addEventListener("resize", upd); upd();
    /* arrastar com o mouse (o toque já é nativo) */
    var down = false, moved = false, sx = 0, sl = 0, lx = 0, lt = 0, v = 0;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      stopAnim(); down = true; moved = false; sx = lx = e.clientX; sl = track.scrollLeft; lt = performance.now(); v = 0;
    });
    addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add("is-drag"); track.style.scrollSnapType = "none"; }
      if (!moved) return;
      var now = performance.now(); v = (e.clientX - lx) / Math.max(1, now - lt); lx = e.clientX; lt = now;
      track.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", function () {
      if (!down) return; down = false;
      if (!moved) return;
      track.classList.remove("is-drag");
      animTo(xOf(nearest(track.scrollLeft - v * 220)));  /* impulso do arrasto e para encaixado num card */
      setTimeout(function () { moved = false; }, 0);
    });
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  /* pré-monta quando a fileira se aproxima da tela, para o pop-up abrir sem engasgo; quem não chega lá não paga o custo */
  if (track && "IntersectionObserver" in window) {
    var pre = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { pre.disconnect(); (window.requestIdleCallback || setTimeout)(build); }
    }, { rootMargin: "600px 0px" });
    pre.observe(track);
  } else { setTimeout(build, 1500); }
})();
