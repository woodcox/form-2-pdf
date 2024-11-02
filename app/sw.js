(() => {
  // src/scripts/js/sw.js
  var caches;
  var self;
  var cacheName = "your-app-cache-v1";
  var assetsToCache = [
    "/",
    "/index.html",
    "{{ '/app/style.css' | hash }}",
    "/path/to/your/css/styles.css",
    "/path/to/your/js/script.js",
    "https://via.placeholder.com/128x128?text=App+Icon",
    "https://via.placeholder.com/192x192?text=App+Icon",
    "https://via.placeholder.com/512x512?text=App+Icon",
    // Add a wildcard to match all pages (*)
    "/*"
  ];
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => cache.addAll(assetsToCache)).then(() => self.skipWaiting())
    );
  });
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => name !== cacheName).map((name) => caches.delete(name))
        );
      }).then(() => self.clients.claim())
    );
  });
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response2) => {
          if (!response2 || response2.status !== 200 || response2.type !== "basic") {
            return response2;
          }
          const responseToCache = response2.clone();
          caches.open(cacheName).then((cache) => cache.put(event.request, responseToCache));
          return response2;
        });
      })
    );
  });
})();
//# sourceMappingURL=sw.js.map
