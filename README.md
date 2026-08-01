For-Her / girlfriend-day branch

This branch contains a single-page interactive scrapbook to celebrate International Girlfriend Day. It includes:
- Intro sky with drifting sunflower petals
- Typed title animation
- Clickable sunflower that opens a 5-chapter scrapbook
- Chapter 1: chat bubbles (message + reflection)
- Chapter 2: "Finally Meeting" photo album (uses assets/photo1.jpg..photo4.jpg)
- Chapter 3: 30 little things list (your provided content)
- Chapter 4: the love letter (your provided content)
- Chapter 5: the future page that animates messages and finishes with a full bloom and closing
- Embedded link to the YouTube video you provided for playback; ability to use a hosted MP3 if you add one to assets and set script.js bgAudio.src manually

How to preview locally:
1. Clone your repo: git clone https://github.com/ethanpoppelmann/For-Her.git
2. Checkout the branch: git checkout girlfriend-day
3. Open index.html in a browser (or serve with a local http server: `npx http-server .`)

How to replace the photos with the real images you uploaded in this conversation:
- Replace the placeholder files in assets/ with your photos named exactly:
  - assets/photo1.jpg
  - assets/photo2.jpg
  - assets/photo3.jpg
  - assets/photo4.jpg
  - assets/photo5.jpg
  - assets/photo6.jpg (you said you would send 2 more)

Notes about music:
- You linked a YouTube video (https://www.youtube.com/watch?v=bjjc59FgUpg). I cannot embed or redistribute the audio file from YouTube directly, but the site includes a link that opens YouTube and a Play button that will open YouTube if no hosted MP3 is present.
- If you own the rights to an MP3 copy of the song and can upload it to the repo at assets/music.mp3, set bgAudio.src = 'assets/music.mp3' in script.js (or tell me and I'll add it). Autoplay may be blocked by browsers; a play button will be available.

Next steps I can take for you (choose one):
- Replace the placeholder images with the ones you uploaded in chat (I can update the branch if you paste files here or confirm you'd like me to pull them). NOTE: I cannot automatically extract files from chat attachments into the repo — please upload them to the repo or paste them here as files.
- Add a small GitHub Pages workflow or instructions to publish the site and provide the URL.
- Tweak animations, fonts, or the page-turn effect.

I committed these files to branch: girlfriend-day
// rebuild trigger
