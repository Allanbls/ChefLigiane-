(function(){var sec=document.getElementById('servicos'),hd=sec&&sec.querySelector('.sec-head'),cs=[].slice.call(document.querySelectorAll('.pilha .pc'));if(!cs.length)return;
function setH(){if(hd)sec.style.setProperty('--hh',hd.offsetHeight+'px')}setH();addEventListener('resize',setH);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setH);
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;var q=0;
function f(){q=0;cs.forEach(function(c,i){var n=cs[i+1];if(!n){c.style.transform='';return}var r=n.getBoundingClientRect(),t=parseFloat(getComputedStyle(n).top)||0,d=Math.min(Math.max(1-(r.top-t)/(innerHeight*.6),0),1);c.style.transform='scale('+(1-d*.05)+')'})}
addEventListener('scroll',function(){if(!q){q=1;requestAnimationFrame(f)}},{passive:true});f()})();
