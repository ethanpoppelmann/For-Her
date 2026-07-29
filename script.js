// CONFIG and content
const CONFIG = {
  colors: {
    sky: '#8DCFF4',
    sun: '#F6C445',
    paper: '#FFF8F0',
    sage: '#7DA66C',
    kraft: '#E8D7BF'
  },
  images: [
    './0D4718F8-E876-494D-AD1C-3296E13E77A7.jpeg',
    './20756774-4036-4C4C-946F-56B2F821B111.jpeg',
    './55BB6ED3-1752-4982-B44E-CC899441F4B6.jpeg',
    './5EBC3313-A229-42DC-ACB6-5C60DB7160B6.jpeg',
    './90C7EAFC-7B23-4E5D-A270-155594B38FFD.jpeg',
    './A69E6CBE-E279-4FDA-BA80-72A4455A133A.jpeg'
  ],
  // the long list of little things
  chapter3: [
    "Your smile.","The way your laugh makes me smile too.","How excited you get over small things, like seeing a cute animal.","Your love for sunflowers.","How easy it is to talk to you.","The way you always make me feel at home.","Your kindness towards other people.","Your beautiful, sky-blue eyes.","How you make even ordinary days feel exciting.","The way you care so deeply.","Your sense of humour (hehe you're funny).","The way we can be completely silly together.","Your passionate and incredible kisses.","Your delicate touch.","How thoughtful you are.","The way you encourage me.","Your determination.","Your hugs.","The way you make me feel calm.","The way you can always make me laugh.","How cute you are (buuuuug)","You always brighten my day.","The memories we've already made.","How safe I feel being myself around you.","That I never have to pretend around you.","All the fun we have together.","Your beautiful heart.","The fact that you chose me.","Your creativity.","Your beauty. You are the most beautiful soul I have ever met, my love."
  ],
  letter: `My Dearest Sofia,\n\nI’m writing (typing, something like that) this with the sound of the train on the tracks echoing in my mind, and I’m right back there, heart beating against my ribs, sweating against the itchy seat. That journey to meet you for the first time was just a month ago. Every mile I passed felt like an eternity, and yet, it was the most beautiful and also most nerve-wracking trip of my life.\n\nBefore I knew it, I was at the station, and then, there you were. The whole world fell away. That first hug with you felt like I was finally home. Like I had finally arrived back where I truly belonged. In that single moment, the noise of everything else around us became the quietest and most perfect soundtrack of my life.\n\nBeing with you for the first time, it felt like discovering a whole new and exciting world (something for you I would imagine is like meeting a kitty and getting to pet it). It was the most natural, exhilarating, and calming thing I had ever experienced. You are this girl who feels more like home than any place I’ve ever lived.\n\nIn you, I have found my best friend, my greatest adventure, and my deepest peace. I am so endlessly, breathtakingly grateful for the person you are. Thank you for letting me get on that train to come and see you, it's been the best choice I've ever made, and I cannot thank you enough for telling me you like my glasses. \n\nMy heart belongs to you, completely and forever.\n\nWith all my love and every dream I have, Happy Girlfriend Day, my most precious girlfriend (and, soon, wife)\n\nYours always.\n`,
};

// YouTube player state
let ytPlayer = null;
let ytReady = false;
const YT_VIDEO_ID = 'bjjc59FgUpg';

function onYouTubeIframeAPIReady(){
  ytReady = true;
}

// App state
let chapter = 0; // 0..4 (5 chapters)
const TITLE = 'Happy International Girlfriend Day';
const introTitleEl = document.getElementById('typedTitle');
const sunflowerBtn = document.getElementById('sunflowerBtn');
const intro = document.getElementById('intro');
const scrapbook = document.getElementById('scrapbook');
const pageEl = document.getElementById('page');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const ending = document.getElementById('ending');
const bgAudio = document.getElementById('bgAudio');
const playMusicBtn = document.getElementById('playMusic');
const ytContainer = document.getElementById('yt-container');
const ytClose = document.getElementById('ytClose');

// typed title guard
let _typedStarted = false;
function typeTitle(text, el, speed=80){
  if(!el) return;
  el.textContent = '';
  let i=0;
  const id = setInterval(()=>{
    el.textContent += text[i++] || '';
    if(i>text.length) clearInterval(id);
  }, speed);
}

// petals canvas (start/stop)
const petalCanvas = document.getElementById('petal-canvas');
const pctx = petalCanvas ? petalCanvas.getContext('2d') : null;
function resize(){ if(petalCanvas){ petalCanvas.width = innerWidth; petalCanvas.height = innerHeight; } }
addEventListener('resize', resize); resize();
let petals = [];
let petalInterval = null;
function spawnPetal(){
  petals.push({x: Math.random()*innerWidth, y:-20+Math.random()*-200, vx:(Math.random()-0.5)*0.6, vy:0.7+Math.random()*0.9, r:6+Math.random()*12, rot:Math.random()*Math.PI*2});
}
function startPetals(){
  if(!pctx || petalInterval) return;
  for(let i=0;i<18;i++) spawnPetal();
  petalInterval = setInterval(tickPetals,24);
}
function stopPetals(){ if(petalInterval) clearInterval(petalInterval); petalInterval = null; }

function tickPetals(){
  if(!pctx) return;
  pctx.clearRect(0,0,petalCanvas.width, petalCanvas.height);
  if(Math.random()>0.94) spawnPetal();

  // bounding box of the main white book area so petals don't draw over it
  const book = document.querySelector('.book');
  const bookRect = book ? book.getBoundingClientRect() : null;

  for(let i=petals.length-1;i>=0;i--){
    const p=petals[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.002; p.rot+=0.02;

    // if inside the book area, skip drawing (still advance position)
    if(bookRect && p.x>=bookRect.left && p.x<=bookRect.right && p.y>=bookRect.top && p.y<=bookRect.bottom){
      // do nothing (pass-through)
    } else {
      pctx.save(); pctx.translate(p.x,p.y); pctx.rotate(p.rot);
      pctx.fillStyle = 'rgba(246,196,69,0.95)';
      pctx.beginPath(); pctx.ellipse(0,0,p.r,p.r*0.6,0,0,Math.PI*2); pctx.fill();
      pctx.restore();
    }

    // keep petals visible until well below viewport so they fall all the way
    if(p.y>innerHeight+300) petals.splice(i,1);
  }
}

// build a future-style sunflower head (no brown center) with optional stem
function buildFutureSunflower({width=120, height=120, includeStem=true, idPrefix='' } = {}){
  const petals = Array.from({length:12}).map((_,i)=>{
    const fill = i%2? '#F6C445' : '#F3B63A';
    return `<ellipse rx="8" ry="20" fill="${fill}" transform="rotate(${i*30}) translate(0,-34)"/>`;
  }).join('');
  const stem = includeStem ? `<rect x="59" y="60" width="4" height="60" fill="#3b8a44" rx="2"/>` : '';
  return `
    <svg id="${idPrefix}future-sunflower" class="future-sunflower" viewBox="0 0 120 120" width="${width}" height="${height}" aria-hidden="true">
      <g transform="translate(60,40)">
        ${petals}
      </g>
      ${stem}
    </svg>
  `;
}

function updateSunflowerDesign(){
  const target = document.getElementById('sunflower') || document.getElementById('sunflower-template');
  if(!target) return;
  target.innerHTML = buildFutureSunflower({width:100, height:100, includeStem:true, idPrefix:''});
}

// chapter rendering (kept similar, using the new sunflower head)
function renderChapter(idx){
  pageEl.classList.remove('turn','close');
  pageEl.innerHTML = '';
  const svgWrap = document.createElement('div'); svgWrap.innerHTML = document.getElementById('sunflower-template') ? document.getElementById('sunflower-template').innerHTML : '';
  pageEl.appendChild(svgWrap);

  const flower = document.getElementById('flower');
  if(flower) flower.style.transform = `translate(100px,${60 - idx*6}px) scale(${0.6 + idx*0.12})`;

  if(idx===0){
    const el = document.createElement('div'); el.className='chat';
    const m1 = document.createElement('div'); m1.className='bubble her'; m1.textContent = 'I really like your glasses!'; m1.style.opacity=0; el.appendChild(m1);
    const m2 = document.createElement('div'); m2.className='bubble you'; m2.textContent = "Every story starts somewhere. Ours started with a message. And I never imagined where that message would lead."; m2.style.opacity=0; el.appendChild(m2);
    pageEl.appendChild(el);
    setTimeout(()=>m1.style.opacity=1,400);
    setTimeout(()=>m2.style.opacity=1,1700);
  } else if(idx===1){
    const h=document.createElement('h2'); h.textContent='Finally Meeting'; pageEl.appendChild(h);
    const album = document.createElement('div'); album.className='album';
    const captionMap = ['The first night I held you in my arms','That day','Bus trip!','Smiles!','Good morning!','Sweet selfie'];
    CONFIG.images.slice(0,6).forEach((src,i)=>{
      const p=document.createElement('div'); p.className='photo';
      const img=document.createElement('img'); img.src=src; img.alt=`Photo ${i+1}`; p.appendChild(img);
      const tape=document.createElement('div'); tape.className='tape'; p.appendChild(tape);
      const cap=document.createElement('div'); cap.className='caption-hand'; cap.textContent = captionMap[i] || '';
      p.appendChild(cap);
      album.appendChild(p);
    });
    pageEl.appendChild(album);
  } else if(idx===2){
    const h=document.createElement('h2'); h.textContent='Little things I love about you'; pageEl.appendChild(h);
    const list=document.createElement('div'); list.className='list-scrap';
    CONFIG.chapter3.forEach((it,i)=>{ 
      const d=document.createElement('div'); d.className='list-item'; d.textContent='• '+it; d.style.opacity=0; d.style.transform='translateY(8px)'; list.appendChild(d);
      setTimeout(()=>{ d.style.transition='all 520ms cubic-bezier(.2,.9,.2,1)'; d.style.opacity=1; d.style.transform='translateY(0)'; }, 400 + i*180);
    });
    pageEl.appendChild(list);
  } else if(idx===3){
    const h=document.createElement('h2'); h.textContent='A Letter'; h.className='letter-heading'; pageEl.appendChild(h);
    const letEl=document.createElement('div'); letEl.className='letter paper'; pageEl.appendChild(letEl);
    const words = CONFIG.letter.split(/(\s+)/);
    letEl.textContent='';
    let wi=0;
    function typeNext(){
      if(wi>=words.length) return;
      letEl.textContent += words[wi++];
      const delay = words[wi-1].includes('\n')? 220 : 55 + Math.random()*90;
      setTimeout(typeNext, delay);
    }
    setTimeout(typeNext, 350);
  } else if(idx===4){
    const h=document.createElement('h2'); h.textContent='The Future'; pageEl.appendChild(h);
    const seq = ['We still have so many pages left to fill.','More adventures.','More laughs.','More memories.','More train journeys.','More sunflowers.','Thank you for being part of my story.'];
    const container=document.createElement('div'); container.style.marginTop='1rem'; container.style.fontFamily='Patrick Hand'; container.style.fontSize='1.1rem';
    seq.forEach((s,i)=>{ const d=document.createElement('div'); d.textContent=s; d.style.opacity=0; d.style.transform='translateY(8px)'; container.appendChild(d); setTimeout(()=>{ d.style.transition='all 520ms cubic-bezier(.2,.9,.2,1)'; d.style.opacity=1; d.style.transform='translateY(0)'; },800 + i*700); });
    pageEl.appendChild(container);

    const deco = document.createElement('div'); deco.className='future-deco';
    deco.innerHTML = `
      ${buildFutureSunflower({width:120, height:120, includeStem:false, idPrefix:'future-'})}
      <div class="ticket">Train ticket • 03/07/2026 • Carriage 3</div>
    `;
    pageEl.appendChild(deco);

    setTimeout(()=>{
      pageEl.classList.add('close');
      setTimeout(()=>{ scrapbook.hidden=true; ending.hidden=false; },1600);
    }, 800 + seq.length*700 + 600);
  }
}

function openScrapbook(){
  intro.hidden = true; scrapbook.hidden = false; renderChapter(chapter);
  setTimeout(updateSunflowerDesign, 40);
}

sunflowerBtn.addEventListener('click', ()=>{ openScrapbook(); });

nextBtn.addEventListener('click', ()=>{ if(chapter<4){ chapter++; renderChapter(chapter);} });
prevBtn.addEventListener('click', ()=>{ if(chapter>0){ chapter--; renderChapter(chapter);} else { scrapbook.hidden=true; intro.hidden=false; } });

// YouTube embed + controls (unchanged)
playMusicBtn.addEventListener('click', ()=>{
  if(bgAudio.src){ bgAudio.play().catch(()=>alert('Browser blocked autoplay; please interact with the page to start audio.')); return; }
  ytContainer.style.display='block'; ytContainer.setAttribute('aria-hidden','false');
  if(!ytPlayer && ytReady){
    ytPlayer = new YT.Player('yt-player', {
      height: '220', width: '380', videoId: YT_VIDEO_ID,
      playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0 },
      events: { 'onReady': (e)=>{ e.target.playVideo(); playMusicBtn.textContent='⏸ Pause music'; }, 'onStateChange': onPlayerStateChange }
    });
  } else if(ytPlayer){
    const state = ytPlayer.getPlayerState();
    if(state===YT.PlayerState.PLAYING) { ytPlayer.pauseVideo(); playMusicBtn.textContent='▶ Play music'; }
    else { ytPlayer.playVideo(); playMusicBtn.textContent='⏸ Pause music'; }
  }
});
ytClose.addEventListener('click', ()=>{ if(ytPlayer) ytPlayer.pauseVideo(); ytContainer.style.display='none'; ytContainer.setAttribute('aria-hidden','true'); playMusicBtn.textContent='▶ Play music'; });
function onPlayerStateChange(e){ if(e.data===YT.PlayerState.ENDED) playMusicBtn.textContent='▶ Play music'; if(e.data===YT.PlayerState.PLAYING) playMusicBtn.textContent='⏸ Pause music'; }

// Start typing + petals only when intro title becomes visible (so she sees the typing)
function startIntroWhenVisible(){
  if(!_typedStarted && introTitleEl){
    const obs = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !_typedStarted){
          _typedStarted = true;
          typeTitle(TITLE, introTitleEl, 70);
          startPetals();
          observer.disconnect();
        }
      });
    }, {threshold: 0.4});
    obs.observe(introTitleEl);
  }
}
startIntroWhenVisible();

// debug helpers
window.SITE = {renderChapter, CONFIG, updateSunflowerDesign, startPetals};
