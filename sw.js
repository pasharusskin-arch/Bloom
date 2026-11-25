const CACHE='bloom-shell-v4700';
const ROOT=self.registration.scope;
const SHELL=['','index.html','css/styles.css','js/app.js','manifest.webmanifest','bloom-icon.png','bloom-apple-icon.png'].map(p=>new URL(p,ROOT).href);
const ART=["atlas-cover.webp","atlas-landscape.webp","atlas-paper-texture.webp","atlas-joy-illustration.webp","atlas-chapter-child.webp","atlas-chapter-roots.webp","atlas-chapter-joy.webp","atlas-chapter-values.webp","atlas-chapter-dreams.webp","atlas-chapter-traits.webp","atlas-chapter-wins.webp","atlas-chapter-scars.webp",'languages-design.webp','island-inspiration-design.webp','maze-design.webp','workshop-design.webp','joy-design.webp','harmony-design.webp','port-design.webp','academy-scene.webp','academy-drum.webp',"heroine-level-01.webp","heroine-level-05.webp","heroine-level-10.webp","heroine-level-15.webp","heroine-level-20.webp","heroine-level-25.webp","heroine-level-30.webp","heroine-level-35.webp","house-level-01.webp","house-level-02.webp","house-level-04.webp","house-level-06.webp","house-level-09.webp","garden-level-01.webp","garden-level-02.webp","garden-level-04.webp","garden-level-06.webp","garden-level-09.webp","forest-level-01.webp","forest-level-02.webp","forest-level-04.webp","forest-level-06.webp","forest-level-09.webp","bloom-world-map.webp","aeri.webp","astra.webp","cosmi.webp","crystal.webp","ember.webp","flora.webp","fungi.webp","lumi.webp","miko.webp","mossi.webp","neri.webp","nox.webp","oli.webp","ossi.webp","silva.webp","terra.webp","morning.webp","day.webp","evening.webp","night.webp"].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})));await Promise.allSettled(ART.map(async u=>{const r=await fetch(u,{cache:'reload'});if(r.ok)await c.put(u,r);}));await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||!u.href.startsWith(ROOT))return;
 e.respondWith((async()=>{
 const c=await caches.open(CACHE);
 const nav=q.mode==='navigate';
 const key=nav?new URL('index.html',ROOT).href:q;
 const cached=await c.match(key);
 if(cached&&(nav||SHELL.includes(u.href)||ART.includes(u.href)))return cached;
 try{const r=await fetch(q,{cache:'no-cache'});if(r.ok){try{await c.put(key,r.clone());}catch{}}return r;}catch{
 return cached||await caches.match(key)|| (nav?await caches.match(new URL('index.html',ROOT).href):null)||Response.error();
 }
 })());
});
