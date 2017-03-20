import { PATTERNS, VERSION } from 'ember-service-worker-cache-fallback/service-worker/config';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';
import { createUrlRegEx, urlMatchesAnyPattern } from 'ember-service-worker/service-worker/url-utils';

const CACHE_KEY_PREFIX = 'esw-cache-fallback';
const CACHE_NAME = `${CACHE_KEY_PREFIX}-${VERSION}`;

const PATTERN_REGEX = PATTERNS.map(createUrlRegEx);

self.addEventListener('fetch', (event) => {
  let request = event.request;
  if (request.method !== 'GET' || !/^https?/.test(request.url)) {
    return;
  }

  if (urlMatchesAnyPattern(request.url, PATTERN_REGEX)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            cache.put(request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request));
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME));
});
