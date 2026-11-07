/* Pop-up da ficha de inscrição (União Chefs). Arquivo externo por causa do CSP (script-src 'self'). */
(function () {
  'use strict';
  var dlg = document.getElementById('formPop');
  var form = document.getElementById('formInscricao');
  if (!dlg || !form || typeof dlg.showModal !== 'function') return; // sem suporte: o link abre o Google Forms em nova aba

  var root = document.documentElement;
  var btnSend = document.getElementById('fmSend');
  var msg = document.getElementById('fmMsg');
  var done = document.getElementById('fmDone');
  var outro = document.getElementById('f-outro');
  var lastTrigger = null;
  var FALLBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdfyX739x7UEjZ0RVe3qCy8Pl9KXnCUXPDyyyX_kwvqW2_-Ug/viewform';
  // Números das perguntas do Google Forms (entry.NNN). Se o cliente trocar as perguntas, eles mudam.
  var ENTRY = {
    nome: '1781500597', telefone: '297979220', instagram: '833403130', endereco: '367656459',
    bairro: '238443229', pais: '850197443', cidade: '1578013334', cep: '2094014561',
    nascimento: '4560003', area: '547137726', carta: '2040870261', origem: '2022160394', aceite: '1700356356'
  };
  var MAX_URL = 7000; // limite seguro de tamanho do link
  function linkPreenchido(d) {
    var p = new URLSearchParams();
    p.set('usp', 'pp_url');
    p.set('emailAddress', d.email || '');
    ['nome', 'telefone', 'instagram', 'endereco', 'bairro', 'pais', 'cidade', 'cep', 'area'].forEach(function (k) {
      p.set('entry.' + ENTRY[k], d[k] || '');
    });
    p.set('entry.' + ENTRY.nascimento, d.nascimento || ''); // AAAA-MM-DD
    if (d.origem === '__outro__') {
      p.set('entry.' + ENTRY.origem, '__other_option__');
      p.set('entry.' + ENTRY.origem + '.other_option_response', d.origem_outro || 'Outro');
    } else if (d.origem) {
      p.set('entry.' + ENTRY.origem, d.origem);
    }
    if (d.aceite === 'Sim') p.set('entry.' + ENTRY.aceite, 'Sim');
    var carta = '[Autoriza uso de imagem e voz: ' + (d.imagem === 'Sim' ? 'Sim' : 'Não') + ']\n\n' + (d.carta || '');
    var base = FALLBACK_URL + '?' + p.toString() + '&entry.' + ENTRY.carta + '=';
    var enc = encodeURIComponent(carta);
    while (base.length + enc.length > MAX_URL && carta.length > 50) { // carta muito longa: corta e avisa
      carta = carta.slice(0, Math.floor(carta.length * 0.9));
      enc = encodeURIComponent(carta + '… (continue aqui)');
    }
    return base + enc;
  }
  // Tela final: explica que falta tocar em "Enviar" no Google Forms
  (function () {
    var h = done.querySelector('h3'), t = done.querySelector('p'), sc = done.querySelector('.script');
    if (sc) sc.textContent = 'quase lá!';
    if (h) h.textContent = 'Falta só um toque';
    if (t) t.innerHTML = 'Abrimos a ficha oficial já preenchida em outra aba. Confira os dados e toque em <strong>Enviar</strong> no fim da página para concluir a inscrição. Se a aba não abriu, <a id="fmAbrirGoogle" href="#" target="_blank" rel="noopener noreferrer">toque aqui</a>.';
    if (btnSend && btnSend.firstChild) btnSend.firstChild.nodeValue = 'Continuar para enviar';
  })();
  var IDADE_MINIMA = 18; // igual ao api/inscricao.js
  var nasc = document.getElementById('f-nasc');
  var MSG_IDADE = 'A inscrição é só para maiores de ' + IDADE_MINIMA + ' anos.';
  function hojeMenos(anos) {
    var h = new Date(), d = new Date(h.getFullYear() - anos, h.getMonth(), h.getDate());
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  if (nasc) {
    nasc.max = hojeMenos(IDADE_MINIMA);
    nasc.min = '1900-01-01';
    nasc.addEventListener('input', function () { nasc.setCustomValidity(''); });
  }

  function open(trigger) {
    lastTrigger = trigger || null;
    msg.textContent = '';
    dlg.classList.remove('is-done');
    dlg.showModal();
    root.classList.add('fm-lock');
    var box = dlg.querySelector('.pop-box');
    if (box) box.scrollTop = 0;
  }
  function close() { if (dlg.open) dlg.close(); }

  dlg.addEventListener('close', function () {
    root.classList.remove('fm-lock');
    if (dlg.classList.contains('is-done')) { form.reset(); outro.hidden = true; }
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  document.getElementById('formClose').addEventListener('click', close);
  document.getElementById('fmDoneClose').addEventListener('click', close);

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-open-form]') : null;
    if (!t) return;
    e.preventDefault();
    open(t);
  });

  // "Outro": mostra o campo de texto
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'origem') return;
    var isOutro = e.target.value === '__outro__';
    outro.hidden = !isOutro;
    outro.required = isOutro;
    if (isOutro) outro.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';
    if (nasc && nasc.value && nasc.value > nasc.max) nasc.setCustomValidity(MSG_IDADE);
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
    if (data.site) return; // isca anti-robô preenchida

    // O Google Forms passou a exigir reCAPTCHA, então a ficha não pode mais ser enviada pelo servidor.
    // A pessoa preenche aqui e o Google Forms abre já preenchido: ela só confere e toca em "Enviar".
    var url = linkPreenchido(data);
    var link = document.getElementById('fmAbrirGoogle'); if (link) link.href = url;
    var aba = window.open(url, '_blank');
    if (aba) { try { aba.opener = null; } catch (er) {} }
    dlg.classList.add('is-done');
    done.focus();
    if (!aba) { var a = document.getElementById('fmAbrirGoogle'); if (a) a.focus(); }
    document.dispatchEvent(new CustomEvent('ld:evento', { detail: { nome: 'enviar_inscricao' } })); // conversão no GA, sem dados pessoais
  });
})();
