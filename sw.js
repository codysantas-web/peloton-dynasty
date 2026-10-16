// Offline cache for Peloton Dynasty. The version is replaced at build time.
const VERSION = '2c9cecca3b';
const CACHE = 'peloton-' + VERSION;
const FILES = ['./', './index.html', './app.js?v=' + VERSION, './app.css?v=' + VERSION, './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon.png'];

self.addEventListener('install', (e) => {
  // straight from the network (never a stale copy from the browser's HTTP cache)
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('peloton-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // the version check always goes to the network
  if (new URL(e.request.url).pathname.endsWith('/version.json')) return;
  // music is big and rarely changes: its own cache, kept across app updates, filled the first time a track plays
  if (new URL(e.request.url).pathname.includes('/music/')) {
    e.respondWith(
      caches.open('pd-music').then((c) =>
        c.match(e.request).then(
          (hit) =>
            hit ||
            fetch(e.request).then((res) => {
              if (res.status === 200) c.put(e.request, res.clone());
              return res;
            }),
        ),
      ),
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: false }).then(
      (hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            if (res.ok && new URL(e.request.url).origin === location.origin) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
            }
            return res;
          })
          .catch(() => caches.match('./index.html')),
    ),
  );
});
