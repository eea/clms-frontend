function clearOldCaches(event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      let cacheListToClear = [
        'clms-static-assets',
        'clms-pages-cache',
        'clms-api-data-cache',
      ];

      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheListToClear.includes(cacheName);
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
}

self.addEventListener('activate', (event) => {
  clearOldCaches(event);
});
