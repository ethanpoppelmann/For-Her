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
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo4.jpg',
    'assets/photo5.jpg', // placeholders for images you will add
    'assets/photo6.jpg'
  ],
  chapter3: [
    "Your smile.","The way your laugh makes me smile too.","How excited you get over small things, like seeing a cute animal.","Your love for sunflowers.","How easy it is to talk to you.","The way you always make me feel at home.","Your kindness towards other people.","Your beautiful, sky-blue eyes.","How you make even ordinary days feel exciting.","The way you care so deeply.","Your sense of humour (hehe you're funny).","The way we can be completely silly together.","Your passionate and incredible kisses.","Your delicate touch.","How thoughtful you are.","The way you encourage me.","Your determination.","Your hugs.","The way you make me feel calm.","The way you can always make me laugh.","How cute you are (buuuuug)","You always brighten my day.","The memories we've already made.","How safe I feel being myself around you.","That I never have to pretend around you.","All the fun we have together.","Your beautiful heart.","The fact that you chose me.","Your creativity.","Your beauty. You are the most beautiful soul I have ever met, my love."
  ],
  letter: `My Dearest Sofia,\n\nI’m writing (typing, something like that) this with the sound of a distant train on the tracks echoing in my mind, and I’m right back there, heart hammering against my ribs, sweating against the itchy seat. That journey to meet you for the first time. Every mile of track felt like an eternity, and yet, it was the most beautiful and yet most nerve-wracking trip of my life.\n\nBefore I knew it, I was at the station, and then, there you were. The whole world fell away. That first hug wasn't just an embrace, it felt like I was finally home. In that single moment, the noise of the station became the quietest, most perfect soundtrack of my life.\n\nBeing with you for the first time, it felt like discovering a whole new exciting world (something for you I would imagine is like meeting a kitty and getting to pet it). It was the most natural, exhilarating, and calming thing I had ever experienced. You were this girl who felt more like home than any place I’d ever lived.\n\nIn you, I have found my best friend, my greatest adventure, and my deepest peace. I am so endlessly, breathtakingly grateful for the person you are. Thank you for getting on that train with me that day, it's been the best choice I've ever made, and I cannot thank you enough for telling me you like my glasses. \n\nMy heart belongs to you, completely and forever.\n\nWith all my love and every dream I have, Happy Girlfriend Day, my most precious girlfriend (and, soon, wife)\n\nYours always. ⭐`
};

// YouTube player state
let ytPlayer = null;
let ytReady = false;
const YT_VIDEO_ID = 'bjjc59FgUpg';

function onYouTubeIframeAPIReady(){
  // will be created when the user opens the player to avoid autoplay restrictions
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

// simple typed title
function typeTitle(text, el, speed=80){
  el.textContent = '';
  let i=0;
  const id = setInterval(()=>{
    el.textContent += text[i++] || '';
    if(i>text.length) clearInterval(id);
  }, speed);
}

// petals animation on canvas
const petalCanvas = document.getElementById('petal-canvas');
const pctx = petalCanvas.getContext('2d');
function resize(){ petalCanvas.width = innerWidth; petalCanvas.height = innerHeight; }
addEventListener('resize', resize); resize();
let petals = [];
function spawnPetal(){
  petals.push({x: Math.random()*innerWidth, y:-20+Math.random()*-200, vx:(Math.random()-0.5)*0.6, vy:0.6+Math.random()*0.8, r:6+Math.random()*12, rot:Math.random()*Math.PI*2});
}
for(let i=0;i<20;i++) spawnPetal();
function tickPetals(){
  pctx.clearRect(0,0,petalCanvas.width, petalCanvas.height);
  if(Math.random()>0.94) spawnPetal();
  for(let i=petals.length-1;i>=0;i--){
    const p=petals[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.002; p.rot+=0.02;
    pctx.save(); pctx.translate(p.x,p.y); pctx.rotate(p.rot);
    pctx.fillStyle = 'rgba(246,196,69,0.95)';
    pctx.beginPath(); pctx.ellipse(0,0,p.r,p.r*0.6,0,0,Math.PI*2); pctx.fill();
    pctx.restore();
    if(p.y>innerHeight+60) petals.splice(i,1);
  }
}
setInterval(tickPetals,16);

// sunflower petals generator (SVG)
function drawSunPetals(stage){
  const petalsG = document.getElementById('petals');
  if(!petalsG) return;
  petalsG.innerHTML = '';
  const count = 12 + stage*6; // more petals as stage increases
  for(let i=0;i<count;i++){
    const a = (Math.PI*2/count)*i;
    const x = Math.cos(a)*40; const y = Math.sin(a)*40;
    const pet = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
    pet.setAttribute('cx', x); pet.setAttribute('cy', y); pet.setAttribute('rx', 16 + stage*2); pet.setAttribute('ry', 26 + stage*3);
    pet.setAttribute('fill', 'url(#lp)');
    pet.setAttribute('transform', `rotate(${(a*180/Math.PI)} ${x} ${y})`);
    pet.style.fill = ['#F6C445','#F3B63A','#f4d46b'][stage%3];
    petalsG.appendChild(pet);
  }
}

// create simple LP fill (fallback)
(function createDefs(){
  const svg = document.getElementById('sunflower');
  if(!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns,'defs');
  const g = document.createElementNS(ns,'linearGradient'); g.id='lp'; g.setAttribute('x1','0'); g.setAttribute('x2','1');
  const s1=document.createElementNS(ns,'stop'); s1.setAttribute('offset','0'); s1.setAttribute('stop-color','#F6C445');
  const s2=document.createElementNS(ns,'stop'); s2.setAttribute('offset','1'); s2.setAttribute('stop-color','#f2a800');
  g.appendChild(s1); g.appendChild(s2); defs.appendChild(g); svg.appendChild(defs);
})();

// chapter rendering
function renderChapter(idx){
  pageEl.classList.remove('turn');
  pageEl.innerHTML = '';
  drawSunPetals(Math.min(4,idx));
  // seedling scale based on idx
  const flower = document.getElementById('flower');
  if(flower) flower.style.transform = `translate(100px,${60 - idx*6}px) scale(${0.6 + idx*0.12})`;

  if(idx===0){ // chapter 1: chat bubble
    const el = document.createElement('div'); el.className='chat';
    const m1 = document.createElement('div'); m1.className='bubble her'; m1.textContent = 'I really like your glasses!'; m1.style.opacity=0; el.appendChild(m1);
    const m2 = document.createElement('div'); m2.className='bubble you'; m2.textContent = "Every story starts somewhere. Ours started with a message. And I never imagined where that message would lead."; m2.style.opacity=0; el.appendChild(m2);
    pageEl.appendChild(el);
    // reveal messages one by one
    setTimeout(()=>m1.style.opacity=1,400);
    setTimeout(()=>m2.style.opacity=1,1700);
  } else if(idx===1){ // chapter 2: album
    const h=document.createElement('h2'); h.textContent='Finally Meeting'; pageEl.appendChild(h);
    const album = document.createElement('div'); album.className='album';
    CONFIG.images.slice(0,6).forEach((src,i)=>{
      const p=document.createElement('div'); p.className='photo';
      const img=document.createElement('img'); img.src=src; img.alt=`Photo ${i+1}`; p.appendChild(img);
      const tape=document.createElement('div'); tape.className='tape'; p.appendChild(tape);
      const cap=document.createElement('div'); cap.className='caption-hand'; cap.textContent = ['First meet','That day','Cuddles','Late night','Train trip','Sweet selfie'][i] || '';
      p.appendChild(cap);
      album.appendChild(p);
    });
    pageEl.appendChild(album);
  } else if(idx===2){ // chapter 3: list of little things
    const h=document.createElement('h2'); h.textContent='Little things I love about you'; pageEl.appendChild(h);
    const list=document.createElement('div'); list.className='list-scrap';
    CONFIG.chapter3.forEach(it=>{ const d=document.createElement('div'); d.textContent='• '+it; list.appendChild(d); });
    pageEl.appendChild(list);
  } else if(idx===3){ // chapter 4: letter
    const h=document.createElement('h2'); h.textContent='A Letter'; pageEl.appendChild(h);
    const letEl=document.createElement('div'); letEl.className='letter'; letEl.textContent=CONFIG.letter; pageEl.appendChild(letEl);
  } else if(idx===4){ // chapter 5: future
    const h=document.createElement('h2'); h.textContent='The Future'; pageEl.appendChild(h);
    const seq = ['We still have so many pages left to fill.','More adventures.','More laughs.','More memories.','More train journeys.','More sunflowers.','Thank you for being part of my story.'];
    const container=document.createElement('div'); container.style.marginTop='1rem'; container.style.fontFamily='Patrick Hand'; container.style.fontSize='1.1rem';
    seq.forEach((s,i)=>{ const d=document.createElement('div'); d.textContent=s; d.style.opacity=0; container.appendChild(d); setTimeout(()=>d.style.opacity=1,800 + i*900); });
    pageEl.appendChild(container);

    // after last message, bloom and close
    setTimeout(()=>{ // bloom animation
      drawSunPetals(5);
      // close scrapbook
      pageEl.classList.add('turn');
      setTimeout(()=>{ scrapbook.hidden=true; ending.hidden=false; },1600);
    }, 800 + seq.length*900 + 800);
  }
}

function openScrapbook(){
  intro.hidden = true; scrapbook.hidden = false; renderChapter(chapter);
}

sunflowerBtn.addEventListener('click', ()=>{
  // page-turn effect for opening
  openScrapbook();
});

nextBtn.addEventListener('click', ()=>{
  if(chapter<4){ chapter++; renderChapter(chapter);} 
});
prevBtn.addEventListener('click', ()=>{ if(chapter>0){ chapter--; renderChapter(chapter);} else { // back to intro
  scrapbook.hidden=true; intro.hidden=false; }
});

// YouTube embed + controls
playMusicBtn.addEventListener('click', ()=>{
  // If a hosted audio exists, play it; otherwise create/show YouTube iframe player
  if(bgAudio.src){ bgAudio.play().catch(()=>alert('Browser blocked autoplay; please interact with the page to start audio.')); return; }

  // show container
  ytContainer.style.display='block'; ytContainer.setAttribute('aria-hidden','false');
  if(!ytPlayer && ytReady){
    ytPlayer = new YT.Player('yt-player', {
      height: '180', width: '320', videoId: YT_VIDEO_ID,
      playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0 },
      events: { 'onReady': (e)=>{ e.target.playVideo(); playMusicBtn.textContent='⏸ Pause music'; }, 'onStateChange': onPlayerStateChange }
    });
  } else if(ytPlayer){
    const state = ytPlayer.getPlayerState();
    if(state===YT.PlayerState.PLAYING) { ytPlayer.pauseVideo(); playMusicBtn.textContent='▶ Play music'; }
    else { ytPlayer.playVideo(); playMusicBtn.textContent='⏸ Pause music'; }
  }
});

ytClose.addEventListener('click', ()=>{
  if(ytPlayer) ytPlayer.pauseVideo();
  ytContainer.style.display='none'; ytContainer.setAttribute('aria-hidden','true');
  playMusicBtn.textContent='▶ Play music';
});

function onPlayerStateChange(e){
  if(e.data===YT.PlayerState.ENDED) playMusicBtn.textContent='▶ Play music';
  if(e.data===YT.PlayerState.PLAYING) playMusicBtn.textContent='⏸ Pause music';
}

// initial type animation and petal airflow start
typeTitle(TITLE, introTitleEl, 70);

// expose for debug
window.SITE = {renderChapter, CONFIG};

// placeholder loader: if assets aren't replaced, show gentle fallback styling
