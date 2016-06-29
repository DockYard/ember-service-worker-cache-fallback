self.addFetchListener(function(event) {
  return caches.open('esw-fallback-cache')
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
