self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installation - v1');
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        'index.html',
        'index.js',
        'Carte.js',
        'favicon.ico',
        'bootstrap-5.1.3-dist/css/bootstrap.min.css',
        'icons-1.7.2/font/bootstrap-icons.css',
        'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
        'img/img-1.jpg',
        'img/img-2.jpg',
        'img/img-3.jpg',
        'img/img-4.jpg',
        'img/img-5.jpg',
        'img/img-6.jpg',
        'img/img-7.jpg',
        'img/img-8.jpg',
        'img/img-9.jpg',
        'img/icon-96x96.png',
        'img/icon-192x192.png',
        'img/icon-256x256.png',
        'img/icon-384x384.png',
        'img/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();

        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }
  }));
});

self.addEventListener('activate', (e) => {
  console.log('active');
});
