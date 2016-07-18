import { addFetchListener, PROJECT_REVISION } from 'ember-service-workers/service-worker';

const CACHE_KEY_PREFIX = 'esw-fallback-cache-';
const CACHE_NAME = `${CACHE_KEY_PREFIX}${PROJECT_REVISION}`;

addFetchListener(function(event) {
  return caches.open(CACHE_NAME)
    .then(function(cache) {
      return fetch(event.request, { mode: 'no-cors' })
        .then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(function(response) {
          return caches.match(event.request);
        });
    });
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        if (cacheName.indexOf(CACHE_KEY_PREFIX) === 0 && cacheName !== CACHE_NAME) {
          caches.delete(cacheName);
        }
      });
    })
  );
});
