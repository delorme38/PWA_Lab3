self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
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
        'img/icon-512x512.png',
        'page-hors-ligne.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(cacheOrNetwork(event.request).catch(() => fallbackVersPageHorsLigne()));
});


function cacheOrNetwork(request) {
  return fromCache(request).catch(() => fetch(request));
};

function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function fallbackVersPageHorsLigne() {
  return caches.match("page-hors-ligne.html");
}

this.addEventListener('sync', function (event) {
  console.log("evenement recu : " + event);
  if (event.tag == 'notifier-reseau') {
      console.log("le reseau est de retour!!");
      event.waitUntil(envoyerNotification());
  }
});

function envoyerNotification() {
  if (Notification.permission === 'granted') {
      var options = {
          body: 'Veuillez raffraichir la page ou clicker sur Reessayer',
          requireInteraction: true
      };

      self.registration.showNotification('Connexion est retabli', options);
  } else {
      console.log("aucune notification car non permis");
  }
}
