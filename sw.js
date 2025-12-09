const CACHE='at-zero-v1', urlsToCache=['/','/index.html','/css/style.css','/js/app.js','/js/basicpitch.min.js','/js/midi-export.js','/js/pdf-export.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urlsToCache))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
