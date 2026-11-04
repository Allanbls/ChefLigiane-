# Site Chef Ligia do Vale (v13)

Site estático. Não precisa de `npm install`.

## Estrutura
- `index.html`, `assets/app.js` (todo o JavaScript do site), `assets/boot.js`
- `vendor/` GSAP 3.12.5 hospedado aqui (antes vinha de CDN) · `fonts/` fontes hospedadas aqui (antes vinham do Google)
- `imagens/` traz só as imagens novas (Caravana e 4 cards). **Copie para dentro dela as imagens que você já tinha.**
- `api/log.js` recebe erros do site e relatórios de segurança (Vercel) · `vercel.json` e `_headers` cabeçalhos de segurança
- `alternativas/.htaccess` para hospedagem Apache (copie para a raiz como `.htaccess`)

## Publicar
- **Vercel:** suba a pasta inteira (mantenha `api/` e `vercel.json` na raiz). HTTPS é automático.
- **Netlify / Cloudflare Pages:** o `_headers` já funciona. A pasta `api/` não roda nelas; o site funciona, só o monitoramento fica desligado.
- **Apache:** use o `.htaccess` de `alternativas/`.
- Opcional na Vercel: crie a variável `LOG_SALT` (qualquer texto longo) para o hash de IP do log.

## Atualizar a agenda toda semana
Abra `assets/app.js`: o bloco `AGENDA` está no começo da seção "agenda". Edite datas, cidade, UF e arte. Dados inválidos são ignorados e avisados no console.

## Segurança: o que foi aplicado
| Item | O que foi feito |
|---|---|
| HTTPS | HSTS de 2 anos, `upgrade-insecure-requests`, nenhuma chamada `http://`; `.htaccess` redireciona no Apache |
| Rate limit | `/api/log`: 20 requisições/min por IP, depois 429. É por instância; para limite global use uma regra de Rate Limiting no Vercel Firewall |
| Validação de inputs | O site não tem mais formulário (o assistente da carta saiu). Restam a agenda (datas AAAA-MM-DD, início ≤ fim, tamanhos máximos, arte só da lista) e a API (POST, mesma origem, tipo de conteúdo, máx. 4 KB, JSON, só campos permitidos) |
| Sanitização | Textos da agenda passam por escape de HTML; demais textos usam `textContent`; CSP bloqueia script injetado; links externos com `noopener noreferrer` |
| Controle de acesso | Site público, sem login. Anti-clickjacking (`frame-ancestors 'none'`), `Cross-Origin-*` same-origin, câmera/microfone/localização desligados, API só POST. Ative 2FA no GitHub e na Vercel |
| Expiração de sessão | Não há login nem cookies. O único armazenamento é `sessionStorage` (some ao fechar a aba) |
| Criptografia | TLS + HSTS. Nada sensível é guardado; o IP no log vira um hash curto com sal |
| Dependências | Zero scripts, fontes ou estilos de terceiros em tempo de execução. GSAP e fontes fixados e conferíveis: `sha256sum -c vendor/SHA256SUMS` (licenças em `fonts/LICENSES.txt`) |
| Monitoramento | Erros de JavaScript e violações de CSP vão para `/api/log` e aparecem em Vercel > Logs (busque `[monitor]`). Para alerta por e-mail, use um Log Drain ou um monitor de uptime |

## Limites
- `style-src 'unsafe-inline'` continua porque o HTML usa estilos inline.
- Se a hospedagem não bloquear `package.json` e `vercel.json`, eles ficam visíveis; não contêm segredos.
