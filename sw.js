const PRECACHE = [
  '/index.html',
  '/style.css',
  '/tokens.css',
  '/fonts/fonts.css',
  '/fonts/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hU4-6qj.woff2',
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

// Cache name is derived from the precache list itself, so editing PRECACHE
// (adding/removing/renaming an entry) automatically invalidates old caches —
// no manual version bump to remember or forget.
const hashPrecache = list => {
  let h = 0;
  const s = list.join('|');
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
};
const CACHE = `calstfrancis-${hashPrecache(PRECACHE)}`;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
      .catch(err => {
        // addAll aborts on the first 404 — surface which URL broke instead of
        // failing silently (this happened once with a stale font filename).
        console.error('[sw] precache failed, a PRECACHE entry is likely broken:', err);
        throw err;
      })
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

  // Stylesheets, scripts and versions.json: network-first, same as HTML.
  // These used to be stale-while-revalidate, which meant the first load after a
  // deploy rendered the new markup against the *previous* CSS — a deployed fix
  // could look broken until a second reload. Correctness beats the few ms.
  const isCode = /\.(css|js)$/.test(url.pathname) || url.pathname === '/versions.json';

  if (isCode || e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        // Offline: fall back to the cached copy. Only an HTML request may fall
        // back to /404.html — handing that to a <link rel=stylesheet> would
        // serve markup as CSS.
        .catch(() => caches.match(e.request).then(hit => hit || (isCode ? undefined : caches.match('/404.html'))))
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
