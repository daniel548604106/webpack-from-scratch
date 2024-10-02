const CACHE_NAME = `my-cache-v3`; // Use VERSION directly
const urlsToCache = ['/main.css', '/index.html'];

// // Install event - caches the files
// 一旦建立好了就把 cache 加到 service worker storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      cache.addAll(urlsToCache).then(() => {
        console.log('cache updated');
      });
    })
  );
});

// // Fetch event - serves cached content when offline
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Cache hit - return the response
//       if (response) {
//         return response;
//       }
//       // Fetch from network if not in cache
//       return fetch(event.request).catch(() => {
//         return caches.match('/offline.html');
//       });
//     })
//   );
// });

// // Activate event - removes old caches
// Activate 表示最新的 service worker 已經啟用了，清掉不是這個版本的 cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

console.log('service worker', CACHE_NAME);
//
