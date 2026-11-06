// Função serverless (Vercel): recebe a ficha do site e repassa ao Google Forms do cliente.
// Fica no servidor para o navegador falar só com o próprio site (CSP connect-src 'self').

const FORM_ID = '1FAIpQLSdfyX739x7UEjZ0RVe3qCy8Pl9KXnCUXPDyyyX_kwvqW2_-Ug';

// Números de cada campo do Google Forms (entry.NNNNNNNNN), lidos do próprio formulário.
// Se o cliente trocar/adicionar perguntas, estes números podem mudar.
const ENTRY = {
  nome: '1781500597',
  telefone: '297979220',
  instagram: '833403130',
  endereco: '367656459',
  bairro: '238443229',
  pais: '850197443',
  cidade: '1578013334',
  cep: '2094014561',
  nascimento: '4560003', // data: o código envia entry.X_year, entry.X_month e entry.X_day
  area: '547137726',
  carta: '2040870261',
  origem: '2022160394',
  aceite: '1700356356'
};

const LIMITE = { carta: 5000, default: 300 };

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }

  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || typeof d !== 'object') return res.status(400).json({ ok: false });
  if (d.site) return res.status(200).json({ ok: true }); // robô: finge sucesso

  if (Object.values(ENTRY).some(function (v) { return !v; })) {
    return res.status(503).json({ ok: false, error: 'entry IDs ainda não configurados' });
  }

  const obrigatorios = ['email', 'nome', 'telefone', 'instagram', 'endereco', 'bairro', 'pais', 'cidade', 'cep', 'nascimento', 'area', 'carta', 'origem', 'aceite'];
  for (const k of obrigatorios) if (!d[k] || !String(d[k]).trim()) return res.status(400).json({ ok: false, error: 'campo ' + k });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return res.status(400).json({ ok: false, error: 'email' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.nascimento)) return res.status(400).json({ ok: false, error: 'nascimento' });

  const cut = function (k) { return String(d[k] || '').slice(0, k === 'carta' ? LIMITE.carta : LIMITE.default); };
  const body = new URLSearchParams();
  body.set('emailAddress', cut('email'));
  ['nome', 'telefone', 'instagram', 'endereco', 'bairro', 'pais', 'cidade', 'cep', 'area', 'carta'].forEach(function (k) {
    body.set('entry.' + ENTRY[k], cut(k));
  });

  const p = d.nascimento.split('-');
  body.set('entry.' + ENTRY.nascimento + '_year', p[0]);
  body.set('entry.' + ENTRY.nascimento + '_month', String(parseInt(p[1], 10)));
  body.set('entry.' + ENTRY.nascimento + '_day', String(parseInt(p[2], 10)));

  if (d.origem === '__outro__') {
    body.set('entry.' + ENTRY.origem, '__other_option__');
    body.set('entry.' + ENTRY.origem + '.other_option_response', cut('origem_outro') || 'Outro');
  } else {
    body.set('entry.' + ENTRY.origem, cut('origem'));
  }
  body.set('entry.' + ENTRY.aceite, 'Sim');
  body.set('fvv', '1');
  body.set('pageHistory', '0');

  try {
    const r = await fetch('https://docs.google.com/forms/d/e/' + FORM_ID + '/formResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'manual'
    });
    // o Google responde 200 (ou 302) quando aceita; 4xx quando rejeita
    if (r.status >= 400) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false });
  }
};
