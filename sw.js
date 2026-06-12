const CACHE = 'calstfrancis-v2';
const PRECACHE = [
  '/index.html',
  '/style.css',
  '/fonts/fonts.css',
  '/fonts/Ktk1ALSLW8zDe0rthJysWrnLsAzHEKOY.woff2',
  '/fonts/rnCr-xNNww_2s0amA9M5kng.woff2',
  '/fonts/rnCt-xNNww_2s0amA9M8onrmTA.woff2',
  '/defs.svg',
  '/favicon.svg',
  '/cursor.svg',
  '/manifest.json',
  '/abouts/shared-about.css',
  '/abouts/shared-about.js',
  '/abouts/about-rubric.html',
  '/abouts/about-zerkalo.html',
  '/abouts/about-spasibo.html',
  '/abouts/about-gost.html',
  '/abouts/about-severed-hours.html',
  '/404.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Fonts: cache-first (they never change)
  if (url.pathname.startsWith('/fonts/')) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
    return;
  }

  // HTML pages: network-first, fall back to cache
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('/404.html')))
    );
    return;
  }

  // Everything else: stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => null);
      return cached || network;
    })
  );
});
