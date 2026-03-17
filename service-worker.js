importScripts('./version.js');
const CACHE_NAME=`miesanie-farieb-${self.APP_VERSION}`;
const URLS_TO_CACHE=['./','./index.html','./manifest.json','./version.js','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS_TO_CACHE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):Promise.resolve()))));self.clients.claim()});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(url.pathname.endsWith('/version.js')){e.respondWith(fetch(e.request,{cache:'no-store'}));return}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
