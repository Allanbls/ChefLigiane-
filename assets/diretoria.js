/* Diretoria da União Chefs Empreendedores: pop-up em tela cheia com scroll diagonal.
   EDITAR: cada chef é um item de D (nome n, cargo/cidade r, foto f = imagens/diretoria/<f>.jpg e <f>-rosto.jpg,
   frase t, parágrafos b, bordados e). O estilo fica em assets/diretoria.css (tudo dentro de #drx).
   Abre ao clicar em qualquer [data-dr-open]; a tela só é montada no primeiro clique. */
(function () {
  "use strict";
  var IMG = "imagens/diretoria/", LOGO = "imagens/logo_uc.png";
  var VIEW = "<div class=\"drx-box\" id=\"drxBox\"><div class=\"stage\" id=\"stage\"><header class=\"top\"><img id=\"topLogo\" alt=\"União Chefs Empreendedores\" width=\"535\" height=\"155\"><span class=\"cnt\" id=\"cnt\">9 chefs</span><button class=\"x\" id=\"x\" type=\"button\" aria-label=\"Fechar a diretoria\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\"><path d=\"M5 5l14 14M19 5L5 19\"/></svg></button><i class=\"bar\"><u></u></i></header><div class=\"rib\" id=\"ribBox\" aria-hidden=\"true\"><span class=\"rib-in\" id=\"rib\"></span></div><div id=\"panels\"></div><div class=\"hint2\" aria-hidden=\"true\">Role para conhecer</div></div><div id=\"scroller\"></div></div>";
  var TL = "<div class=\"dx-tl a\" id=\"tl1\"></div><div class=\"dx-tl b\" id=\"tl2\"><svg class=\"tinf\" viewBox=\"0 0 200 100\" aria-hidden=\"true\"><path class=\"g1\" id=\"tp1\" pathLength=\"1\"/><path class=\"g2\" id=\"tp2\" pathLength=\"1\"/></svg></div>";
  var root = null, api = null, lastBtn = null, others = [], viaHistory = false, afterClose = null;
  function lock() {
    var h = document.documentElement;
    h.style.setProperty("--dr-sbw", (innerWidth - h.clientWidth) + "px");
    h.classList.add("dr-lock");
    others = [].filter.call(document.body.children, function (el) { return el !== root && !/^(SCRIPT|DIALOG|svg)$/i.test(el.tagName) && !el.inert; });
    others.forEach(function (el) { el.inert = true; });
  }
  function unlock() {
    document.documentElement.classList.remove("dr-lock");
    others.forEach(function (el) { el.inert = false; }); others = [];
    if (viaHistory) { viaHistory = false; try { history.back(); } catch (e) {} }
    if (lastBtn) lastBtn.focus({ preventScroll: true });
  }
  
  
    var ICON={
      heart:"M32 52C14 40 8 31 8 22 8 14 14 9 21 9c5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 5 13 13 0 9-6 18-24 30z",
      star:"M32 8l6.5 16L56 25 42.5 36 47 53 32 43.5 17 53l4.5-17L8 25l17.5-1z",
      sparkle:"M32 6c2 18 8 24 26 26-18 2-24 8-26 26-2-18-8-24-26-26 18-2 24-8 26-26z",
      whisk:"M32 58V36M28 58h8M32 36C20 30 18 10 32 6c14 4 12 24 0 30M32 36c-6-8-6-24 0-30 6 6 6 22 0 30",
      cake:"M10 54h44M14 54V40h36v14M20 40V28h24v12M32 28V19M32 11c-3 3-3 6 0 8 3-2 3-5 0-8zM14 47c6 4 12-4 18 0s12-4 18 0",
      cupcake:"M16 34h32l-5 22H21zM25 34l2 22M32 34v22M39 34l-2 22M14 34c-4-12 8-20 14-16 2-10 14-10 16 0 8-2 12 10 6 16M32 10c1-4 4-6 7-6",
      trophy:"M20 10h24v14c0 10-6 16-12 16s-12-6-12-16zM20 15h-8c0 10 4 14 9 15M44 15h8c0 10-4 14-9 15M32 40v8M22 56h20v-6H22z",
      crown:"M10 46l4-28 10 14 8-20 8 20 10-14 4 28zM12 54h40",
      chefhat:"M18 40c-10-2-10-18 2-18 0-10 10-14 14-8 6-8 20-2 16 8 8 0 8 16-4 18zM18 40v14h28V40M18 48h28",
      cherry:"M13 50a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM33 46a9 9 0 1 0 18 0 9 9 0 1 0-18 0zM22 41c2-15 8-25 18-31M42 37c-2-11-4-19-2-27M40 10c6-4 12-2 14 2-6 2-10 1-14-2z",
      pipingbag:"M10 16c6-6 14-6 20 0l22 34-6 6zM46 56l3 5M52 50l5 2M18 24l8 2M24 34l8 2",
      gradcap:"M4 26l28-12 28 12-28 12zM16 32v14c8 8 24 8 32 0V32M60 26v16",
      pin:"M32 58C22 44 14 36 14 26 14 16 22 8 32 8s18 8 18 18c0 10-8 18-18 32zM25 26a7 7 0 1 0 14 0 7 7 0 1 0-14 0z",
      mic:"M24 18a8 8 0 0 1 16 0v14a8 8 0 0 1-16 0zM16 30c0 10 8 16 16 16s16-6 16-16M32 46v10M22 56h20",
      rings:"M8 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0zM30 32a13 13 0 1 0 26 0 13 13 0 1 0-26 0z",
      gift:"M10 26h44v8H10zM14 34v22h36V34M32 26v30M32 26c-6-10-16-10-14-4 2 4 10 4 14 4 4 0 12 0 14-4 2-6-8-6-14 4",
      sun:"M20 32a12 12 0 1 0 24 0 12 12 0 1 0-24 0zM32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7",
      pot:"M10 26h44M14 26v20c0 6 4 10 10 10h16c6 0 10-4 10-10V26M6 30h8M50 30h8M26 26v-6h12v6M25 15c0-4 4-4 4-8M35 15c0-4 4-4 4-8",
      chocolate:"M14 10h36v44H14zM14 24h36M14 39h36M32 10v44",
      brigadeiro:"M18 32a14 14 0 1 0 28 0 14 14 0 1 0-28 0zM14 46c6 6 30 6 36 0l-4 12H18zM26 26h2M34 24h2M38 32h2M28 36h2M24 31h1"
    };
    var D=[
      {n:"Ligia do Vale",r:"Fundadora & CEO",f:"ligia-do-vale",lead:1,t:'Fundadora e <span class="dx-hl">CEO</span> da União Chefs Empreendedores',
       b:["Chef confeiteira, professora e embaixadora oficial da Cobertop.","Roda o Brasil com aulas e demonstrações em feiras e eventos, com técnica, alegria e muito chocolate.","Ajuda chefs a virarem professores e a crescer na profissão. “Aqui, crescemos juntos.”"],e:["chocolate","mic","crown"]},
      {n:"Paula Santana",r:"Guarulhos, SP",f:"paula-santana",t:'Gastrônoma e <span class="dx-hl">confeiteira</span> artesanal infantil',
       b:["Gastrônoma de Guarulhos, SP, especializada em confeitaria artesanal infantil.","Apaixonada pela arte em pasta americana e sempre aprendendo.","Dona da Paula’s Cakes Confeitaria, onde o amor pelo doce se torna único."],e:["pin","whisk","heart"]},
      {n:"Iuri Sena",r:"Guarujá, SP",f:"iuri-sena",t:'Ninguém é <span class="dx-hl">Campeão</span> Sozinho.',
       b:["Professor, empreendedor e Cake Designer de Guarujá, SP. Campeão do Que Seja Doce (GNT).","Também venceu Melhor Brigadeiro (Mauá-SP) e Melhor Sobremesa de Pitanga (Guarujá-SP).","Criou a Bailarina Elétrica, equipamento que inovou o trabalho na confeitaria."],e:["trophy","brigadeiro","star"]},
      {n:"Priscilla Junia",r:"Ribeirão das Neves e Esmeraldas, MG",f:"priscilla-junia",t:'Liderar é transformar <span class="dx-hl">paixão</span> em oportunidades',
       b:["Diretora da União Chefs Empreendedores.","Representa Ribeirão das Neves e Esmeraldas, em Minas Gerais.","“Liderar é valorizar quem faz da gastronomia uma arte.”"],e:["crown","pin","heart"]},
      {n:"Joelma Venâncio",r:"Diretora · Todo o Brasil",f:"joelma-venancio",t:'Quando Deus está à frente, o impossível vira <span class="dx-hl">testemunho</span>',
       b:["Especialista em chantininho, atendimento em camarins e produção de artistas em todo o Brasil.","Movida por sonhos, propósito e fé. 🍒✨"],e:["pipingbag","star","cherry"]},
      {n:"Demontiez Alves",r:"Juazeiro do Norte, CE",f:"demontiez-alves",t:'Mais que doces, <span class="dx-hl">experiências</span> surpreendentes',
       b:["Tecnólogo em Alimentos de Juazeiro do Norte, CE. Com a esposa, criou o Atelier Ideias Doces, doceria artesanal.","Na União Chefs Empreendedores, mostra seu trabalho e cresce na profissão."],e:["cupcake","rings","gift"]},
      {n:"Leandro Acevedo",r:"Argentino · Interior de São Paulo",f:"leandro-acevedo",t:'Criatividade, dedicação e <span class="dx-hl">amor</span> pelo que faço',
       b:["Argentino, mora no interior de São Paulo. Confeiteiro profissional e empreendedor.","Transforma ingredientes em experiências e emoções, sempre buscando inovar."],e:["whisk","sun","heart"]},
      {n:"Angélica Oliveira",r:"Poconé, MT",f:"angelica-oliveira",t:'Transformar ingredientes em <span class="dx-hl">amor</span>',
       b:["De Poconé, MT. Formada em Gastronomia e pós-graduada em Confeitaria e Panificação.","Para ela, confeitar é criar memórias afetivas e levar felicidade às pessoas.","Na União Chefs Empreendedores, troca experiências e cresce junto. 💕"],e:["gradcap","cake","heart"]},
      {n:"Ariana Silva",r:"Feira de Santana, BA",f:"ariana-silva",t:'Talento, experiência e <span class="dx-hl">dedicação</span>',
       b:["Renomada chef de cozinha de Feira de Santana, na Bahia.","Na diretoria, contribui com talento e dedicação para a associação crescer."],e:["chefhat","pot","star"]}
    ];
    /* cores da União: cada chef tem a sua (mesma lógica do site) */
    var COR=["#BC2350","#FFB81C","#FF9A3D","#BC2350","#19B5B0","#2F9E4F","#74ACDF","#FF9A3D","#0B7471"];
    var THREAD=["#BC2350","#0B7471","#3A1F1A","#FF9A3D","#2F9E4F","#0A2244","#19B5B0"];
    var INK=["#fff","#3A1F1A","#3A1F1A","#fff","#3A1F1A","#fff","#3A1F1A","#3A1F1A","#fff"];
    var ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX'];
    var CFG={dir:1,inX:.55,inY:.55,outX:.55,outY:.55,rot:0,sc:.06,fi:.95,fo:.95};
    function pad(n){return (n<10?'0':'')+n;}
    function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
    function dc(name,x,y,s,r,mx,my,col){
      return '<span class="dc" style="--x:'+x+'%;--y:'+y+'%;--s:'+s+'px;--r:'+r+'deg;--mx:'+mx+';--my:'+my+';color:'+col+'"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="'+ICON[name]+'"/></svg></span>';
    }
    var DCP=[[-26,6,46,-10,-5,-3],[92,-4,40,12,6,-6],[96,60,44,8,-9,5]];
  
    /* infinito (lemniscata) como caminho SVG */
    function lemn(cx,cy,a,k){
      var pts=[],N=160;
      for(var i=0;i<=N;i++){
        var t=Math.PI/2+i/N*Math.PI*2,s=Math.sin(t),c=Math.cos(t),d=1+s*s;
        pts.push((cx+a*c/d).toFixed(2)+' '+(cy+a*k*s*c/d).toFixed(2));
      }
      return 'M'+pts.join(' L');
    }
    var tp=lemn(100,50,86,1.5);
    
  
    /* ---- tela de entrada ---- */
  
  function init() {
document.getElementById('tp1').setAttribute('d',tp);document.getElementById('tp2').setAttribute('d',tp);
    document.getElementById('topLogo').src=LOGO;

  /* ---- painéis ---- */
  var P=[];
  D.forEach(function(d,i){
    var col=THREAD;
    var dcs=d.e.map(function(n,k){var p=DCP[k];return dc(n,p[0],p[1],p[2],p[3],p[4],p[5],col[(i+k)%col.length]);}).join('');
    var body='<div class="bodies">'+d.b.map(function(x,k){var ic=d.e[k%d.e.length];
      return '<p class="b'+(k?'':' cur')+'" style="--k:'+k+'"><i class="bi" style="color:'+THREAD[(i+k)%THREAD.length]+'"><svg viewBox="0 0 64 64" aria-hidden="true"><path pathLength="1" d="'+ICON[ic]+'"/></svg></i><span class="bt" data-fx="words" data-st="14" data-b="'+(700+k*260)+'">'+esc(x)+'</span></p>';}).join('')+'</div>';
    var parts=d.n.split(' '),n1=parts[0],n2=parts.slice(1).join(' ');
    P.push('<section class="panel chef'+(d.lead?' dx-lead':'')+'" style="--ac:'+COR[i]+';--on:'+INK[i]+'"><div class="dx-card"><div class="giant" aria-hidden="true">'+esc(n1)+'</div>'+
      '<div class="pic"><div class="shape"><img src="'+IMG+d.f+'.jpg'+'" alt="Chef '+esc(d.n)+'" draggable="false"></div>'+
      (d.lead?'':'<span class="badge">'+ROMAN[i]+'</span>')+(d.lead?'<svg class="crown" viewBox="0 0 120 84" aria-hidden="true"><path class="gold" d="M10 68L4 24l30 22L60 10l26 36 30-22-6 44z"/><path class="fac" d="M10 68L4 24l30 22L60 10v58z"/><path class="band" d="M10 68h100v10H10z"/><path class="out" pathLength="1" d="M10 78V68L4 24l30 22L60 10l26 36 30-22-6 44v10zM10 68h100"/><circle class="jw" style="--j:0" cx="4" cy="22" r="5"/><circle class="jw t" style="--j:1" cx="60" cy="8" r="5.5"/><circle class="jw" style="--j:2" cx="116" cy="22" r="5"/><circle class="jw t" style="--j:3" cx="35" cy="73" r="3"/><circle class="jw" style="--j:4" cx="60" cy="73" r="3"/><circle class="jw t" style="--j:5" cx="85" cy="73" r="3"/><path class="sp" style="--j:0" d="M100 4l2.6 6.4L109 13l-6.4 2.6L100 22l-2.6-6.4L91 13l6.4-2.6z"/><path class="sp" style="--j:1" d="M16 2l1.8 4.2L22 8l-4.2 1.8L16 14l-1.8-4.2L10 8l4.2-1.8z"/></svg>':'')+dcs+'</div>'+
      '<div class="txt"><span class="kick" data-fx="words" data-st="30" data-b="0">'+esc(d.r)+'</span><h2 class="nm" data-fx="chars" data-b="120"><span class="n1">'+esc(n1)+'</span> <span class="n2">'+esc(n2)+'</span></h2><p class="q" data-fx="words" data-st="40" data-b="480">'+d.t+'</p>'+body+'</div></div></section>');
  });
  var ef=D.map(function(d,i){return '<button class="ef" type="button" data-i="'+i+'" style="--i:'+i+'" aria-label="Ver Chef '+esc(d.n)+'"><img src="'+IMG+d.f+'-rosto.jpg" alt="" draggable="false" loading="lazy" decoding="async"></button>';}).join('');
  P.push('<section class="panel end"><div class="dx-card"><div class="giant" aria-hidden="true">Chefs</div>'+
    dc('heart',2,-6,44,-8,-5,-4,THREAD[0])+dc('sparkle',92,-2,40,10,6,-5,THREAD[1])+dc('star',0,84,40,8,-7,5,THREAD[3])+dc('crown',94,80,44,-8,8,6,THREAD[4])+
    '<div class="txt"><div class="efaces">'+ef+'</div><h2 data-fx="chars" data-b="100">Faça parte<br>da <em>União Chefs</em></h2><div class="endbtns"><a class="cta" href="#" id="cta">Quero fazer parte →</a><button class="back" type="button" id="back">Voltar ao site ↑</button></div></div></div></section>');
  P.unshift('<section class="panel intro"><div class="dx-card"><img class="i-logo" alt="União Chefs Empreendedores" src="'+LOGO+'"><span class="e-kick">Quem faz acontecer</span><h2 data-fx="chars" data-b="260">Conheça a <em>diretoria</em></h2><p class="dx-script">nove chefs, uma só união</p></div></section>');
  var host=document.getElementById('panels'); host.innerHTML=P.join('');

  /* divide textos em letras / palavras */
  function split(el,mode,st,b){
    var i=0;el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===1){if(n.tagName==='BR')return;walk(n);return;}
        if(n.nodeType!==3||!n.nodeValue.length)return;
        var frag=document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function(part){
          if(!part)return;
          if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return;}
          var w=document.createElement('span');w.setAttribute('aria-hidden','true');
          if(mode==='chars'){
            w.className='dx-w';
            Array.from(part).forEach(function(c){var ch=document.createElement('span');ch.className='dx-ch';ch.style.setProperty('--i',i++);ch.textContent=c;w.appendChild(ch);});
          }else{w.className='wd';w.style.setProperty('--i',i++);w.textContent=part;}
          frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag,n);
      });
    })(el);
    el.style.setProperty('--st',(st||28)+'ms');el.style.setProperty('--b',(b||0)+'ms');
  }
  [].forEach.call(document.querySelectorAll('[data-fx]'),function(el){split(el,el.dataset.fx,+el.dataset.st||(el.dataset.fx==='chars'?28:22),+el.dataset.b||0);});

  var panels=[].map.call(host.children,function(el){return {el:el,vis:0,on:null,past:null};});
  var M=panels.length;
  var stage=document.getElementById('stage'),scroller=document.getElementById('scroller'),box=document.getElementById('drxBox'),view=document.getElementById('drxView'),
      cnt=document.getElementById('cnt'),rib=document.getElementById('rib'),ribBox=document.getElementById('ribBox');
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,live=false,busy=false,cur=0,run=0,washIdx=-1;
  rib.textContent=new Array(24).join('Valorização ✦ Apoio ✦ Oportunidades ✦ União Chefs ✦ ');

  function layout(){scroller.style.height=Math.round(box.clientHeight*(M-1)*1.12)+'px';}
  function target(){var max=scroller.offsetHeight;if(max<=0)return 0;var y=Math.max(0,Math.min(max,box.scrollTop));return y/max*(M-1);}
  function dwell(raw){var f=Math.floor(raw),fr=raw-f,a=.2,b=.8,u=fr<a?0:fr>b?1:(fr-a)/(b-a);u=u*u*(3-2*u);return f+u;}
  function render(){
    var vw=stage.clientWidth,vh=stage.clientHeight,c=CFG;
    panels.forEach(function(p,k){
      var t=k-cur,a=Math.abs(t),el=p.el;
      if(a>3.4){if(p.vis){el.style.visibility='hidden';p.vis=0;}return;}
      if(!p.vis){el.style.visibility='visible';p.vis=1;}
      var inn=t>0,X=(inn?c.inX:c.outX)*vw*t*c.dir,Y=(inn?c.inY:c.outY)*vh*t,
          s=1-Math.min(a,2)*c.sc,o=1-Math.min(1,a*(inn?c.fi:c.fo));
      el.style.transform='translate3d('+X.toFixed(1)+'px,'+Y.toFixed(1)+'px,0) scale('+s.toFixed(3)+')';
      el.style.opacity=o.toFixed(3);
      el.style.zIndex=inn?(20-Math.round(a*3)):30;
      el.style.pointerEvents=a<.4?'auto':'none';
      el.style.setProperty('--t',t.toFixed(3));
      el.style.setProperty('--act',Math.max(0,1-a*1.25).toFixed(3));
      var on=live&&a<.38;if(on!==p.on){p.on=on;el.classList.toggle('dx-on',on);}
      var past=t<0;if(past!==p.past){p.past=past;el.classList.toggle('past',past);}
    });
    ribBox.style.opacity=Math.min(.95,Math.abs(cur-Math.round(cur))*2.8).toFixed(3);
    stage.style.setProperty('--p',(cur/(M-1)).toFixed(4));
    stage.style.setProperty('--rx',(-cur*240).toFixed(1)+'px');
    var idx=Math.round(cur);
    cnt.textContent=(idx===0||idx>=M-1)?'9 chefs':pad(idx)+' / 09';stage.classList.toggle('atstart',live&&cur<.25);
    var wi=(idx>=1&&idx<=D.length)?idx-1:-1;
    if(wi!==washIdx){washIdx=wi;stage.style.setProperty('--wash',wi<0?'#FFB81C':COR[wi]);}
  }
  function frame(){
    run=0;var e=dwell(target());
    cur+=(e-cur)*(reduce?1:.14);
    if(Math.abs(e-cur)<.0007)cur=e;
    render();
    if(cur!==e)run=requestAnimationFrame(frame);
  }
  function kick(){if(!run&&!stage.hidden)run=requestAnimationFrame(frame);}
  box.addEventListener('scroll',kick,{passive:true});
  addEventListener('resize',function(){if(!view.hidden){layout();kick();}});

  /* ---- transição de tela: anéis da paleta saindo do ponto do toque ---- */
  var tl1=document.getElementById('tl1'),tl2=document.getElementById('tl2');
  function wait(ms){return new Promise(function(r){setTimeout(r,ms);});}
  function Rr(x,y){return Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+24;}
  function circ(el,x,y,r0,r1,dur,delay){
    return el.animate([{clipPath:'circle('+r0+'px at '+x+'px '+y+'px)'},{clipPath:'circle('+r1+'px at '+x+'px '+y+'px)'}],
      {duration:reduce?1:dur,delay:reduce?0:(delay||0),easing:'cubic-bezier(.76,0,.24,1)',fill:'both'}).finished;
  }
  function showLayers(){tl1.style.display='block';tl2.style.display='grid';}
  function hideLayers(){[tl1,tl2].forEach(function(l){l.getAnimations().forEach(function(a){a.cancel();});l.style.display='none';});tl2.classList.remove('draw');}
  function toExperience(){
    view.hidden=false;
    live=false;cur=0;washIdx=-2;panels.forEach(function(p){p.vis=0;p.on=null;p.past=null;p.el.classList.remove('dx-on','past');p.el.style.visibility='hidden';});
    box.scrollTop=0;layout();render();
  }
  function toEntry(){view.hidden=true;live=false;unlock();}
  async function enter(x,y){
    if(busy)return;busy=true;
    var r=Rr(x,y);tl2.style.display='grid';tl2.classList.remove('fade');
    await circ(tl2,x,y,0,r,520,0);
    void tl2.offsetWidth;tl2.classList.add('draw');
    await wait(reduce?0:1700);
    toExperience();
    tl2.classList.add('fade');
    await wait(reduce?0:350);
    var cx=innerWidth/2,cy=innerHeight/2,r2=Rr(cx,cy);
    setTimeout(function(){live=true;kick();},reduce?0:250);
    await circ(tl2,cx,cy,r2,0,800,0);
    hideLayers();tl2.classList.remove('fade');busy=false;kick();
  }
  async function leave(x,y){
    if(busy)return;busy=true;
    var r=Rr(x,y);showLayers();
    await Promise.all([circ(tl1,x,y,0,r,700,0),circ(tl2,x,y,0,r,700,150)]);
    toEntry();
    var b=(lastBtn&&lastBtn.getBoundingClientRect())||{left:innerWidth/2,width:0,top:innerHeight/2,height:0,bottom:1},ok=b.bottom>0&&b.top<innerHeight,bx=ok?b.left+b.width/2:innerWidth/2,by=ok?b.top+b.height/2:innerHeight/2;
    await Promise.all([circ(tl2,bx,by,r,0,850,0),circ(tl1,bx,by,r,0,850,150)]);
    hideLayers();busy=false;
    if(afterClose){var f=afterClose;afterClose=null;setTimeout(f,60);}
  }
  function exitClick(e){var rc=e.currentTarget.getBoundingClientRect();leave(rc.left+rc.width/2,rc.top+rc.height/2);}
  document.getElementById('x').addEventListener('click',exitClick);
  document.getElementById('back').addEventListener('click',exitClick);
  document.getElementById('cta').addEventListener('click',function(e){e.preventDefault();afterClose=function(){var el=document.getElementById('associar');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});};exitClick(e);});

  host.addEventListener('click',function(e){var f=e.target.closest&&e.target.closest('.ef');if(f){var max=scroller.offsetHeight;box.scrollTo({top:(+f.dataset.i+1)/(M-1)*max,behavior:'smooth'});}});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){kick();});
  return {enter:enter,leave:leave,exit:function(){var r=document.getElementById('x').getBoundingClientRect();leave(r.left+r.width/2,r.top+r.height/2);},isBusy:function(){return busy;},force:function(){hideLayers();view.hidden=true;live=false;busy=false;unlock();}};

  }
  function mount() {
    root = document.createElement("div"); root.id = "drx";
    root.innerHTML = '<div id="drxView" hidden role="dialog" aria-modal="true" aria-label="Diretoria da União Chefs" tabindex="-1">' + VIEW + '</div>' + TL;
    document.body.appendChild(root);
    api = init();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-dr-open]");
    if (!t) return;
    e.preventDefault();
    if (!root) mount();
    if (api.isBusy()) return;
    lastBtn = t; lock();
    var r = t.getBoundingClientRect();
    try { history.pushState({ drp: 1 }, ""); viaHistory = true; } catch (err) { viaHistory = false; }
    api.enter(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2).then(function () { document.getElementById("drxView").focus({ preventScroll: true }); });
  });
  addEventListener("popstate", function () {
    if (root && !document.getElementById("drxView").hidden) { viaHistory = false; api.force(); }
  });
  document.addEventListener("keydown", function (e) {
    if (!root) return;
    var v = document.getElementById("drxView"); if (v.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); if (!api.isBusy()) api.exit(); }
    else if (e.key === "Tab") {
      var f = [].filter.call(v.querySelectorAll("button,a[href]"), function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === v)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
})();
