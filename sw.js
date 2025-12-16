const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Strategy: Stale-While-Revalidate
  // This serves from cache immediately while updating in the background
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = networkResponse.clone();

          // Open cache and put the new response
          caches.open(CACHE_NAME).then((cache) => {
            // We only cache http/https requests, avoiding chrome-extension schemes etc.
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, responseToCache);
            }
          });

          return networkResponse;
        })
        .catch((err) => {
          // Network failure - nothing to do here, the outer promise will return cachedResponse if available
          console.log('Network fetch failed', err);
        });

      return cachedResponse || fetchPromise;
    })
  );
});