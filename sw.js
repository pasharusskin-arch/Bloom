const CACHE='bloom-shell-v3301';
const ROOT=self.registration.scope;
const SHELL=['','index.html','css/styles.css','js/app.js','manifest.webmanifest','bloom-icon.png','bloom-apple-icon.png'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})));await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||!u.href.startsWith(ROOT))return;
 e.respondWith((async()=>{
 const c=await caches.open(CACHE);
 const nav=q.mode==='navigate';
 const key=nav?new URL('index.html',ROOT).href:q;
 const cached=await c.match(key);
 if(cached&&(nav||SHELL.includes(u.href)))return cached;
 try{const r=await fetch(q,{cache:'no-cache'});if(r.ok){try{await c.put(key,r.clone());}catch{}}return r;}catch{
 return cached||await caches.match(key)|| (nav?await caches.match(new URL('index.html',ROOT).href):null)||Response.error();
 }
 })());
});
