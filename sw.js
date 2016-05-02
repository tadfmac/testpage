// from http://www.html5rocks.com/ja/tutorials/service-worker/introduction/

// Update

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './',
  './Mitsukuni_defying_the_skeleton_spectre_invoked_by_princess_Takiyasha.jpg',
  './Warrior_Minamoto_Raiko_and_the_Earth_Spider_LACMA_M.2006.136.292a-c_(1_of_2).jpg',
  './Cats_suggested_as_the_fifty-three_stations_of_the_Tokaido.jpg',
  './Kuniyoshi_Utagawa,_wrestling.jpg'
];

// インストール処理のコールバックをセット
self.addEventListener('install', function(event) {
  // インストール処理
  console.log("sw.js: installed");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch() イベント
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        });
      );
    });
  );
});




