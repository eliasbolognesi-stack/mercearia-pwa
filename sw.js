const CACHE_NAME = 'pwa-super-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Network-first for API calls (/api/), cache-first for static
  const isApiRequest = event.request.url.includes('/api/');
  
  if (isApiRequest) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request) || new Response('API Offline', { status: 503 });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
