const CACHE='bloom-shell-v5030';
const ROOT=self.registration.scope;
const SHELL=['','index.html','css/styles.css?v=5030','js/app.js?v=5030','manifest.webmanifest','bloom-icon.png','bloom-apple-icon.png'].map(p=>new URL(p,ROOT).href);
const ART=["atlas-cover.webp","atlas-landscape.webp","atlas-paper-texture.webp","atlas-joy-illustration.webp","atlas-chapter-child.webp","atlas-chapter-roots.webp","atlas-chapter-joy.webp","atlas-chapter-values.webp","atlas-chapter-dreams.webp","atlas-chapter-traits.webp","atlas-chapter-wins.webp","atlas-chapter-scars.webp",'languages-design.webp','island-inspiration-design.webp','maze-design.webp','workshop-design.webp','joy-design.webp','harmony-design.webp','port-design.webp','academy-scene.webp','academy-drum.webp',"bloom-world-map.webp","aeri.webp","astra.webp","cosmi.webp","crystal.webp","ember.webp","flora.webp","fungi.webp","lumi.webp","miko.webp","mossi.webp","neri.webp","nox.webp","oli.webp","ossi.webp","silva.webp","terra.webp","morning.webp","day.webp","evening.webp","night.webp"].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})));await Promise.allSettled(ART.map(async u=>{const r=await fetch(u,{cache:'reload'});if(r.ok)await c.put(u,r);}));await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();const previous=keys.filter(k=>/^bloom-shell-v\d+$/.test(k)&&k!==CACHE).sort((a,b)=>Number(b.split('v').pop())-Number(a.split('v').pop()));await Promise.allSettled(previous.slice(1).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',e=>{
 const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||!u.href.startsWith(ROOT)||u.pathname===new URL('sw.js',ROOT).pathname)return;
 e.respondWith((async()=>{
 const c=await caches.open(CACHE);
 const nav=q.mode==='navigate';
 const key=nav?new URL('index.html',ROOT).href:q;
 const cached=await c.match(key);
 if(cached&&!nav&&(SHELL.includes(u.href)||ART.includes(u.href)))return cached;
 try{const r=await fetch(q,{cache:nav?'reload':'no-cache'});if(r.ok){try{await c.put(key,r.clone());}catch{}}return r;}catch{
 return cached||await caches.match(key)|| (nav?await caches.match(new URL('index.html',ROOT).href):null)|| (nav?new Response('<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bloom</title><p>Bloom пока недоступен без интернета. Подключись к сети и открой приложение снова.</p></html>',{headers:{'Content-Type':'text/html; charset=utf-8'}}):Response.error());
 }
 })());
});
