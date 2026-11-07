/* Só define o consentimento padrão (tudo negado). NÃO carrega o Google Tag Manager:
   quem carrega é o assets/analytics.js, e somente depois que a pessoa toca em "Aceitar". */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
