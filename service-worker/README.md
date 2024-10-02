Configure Hostname
https://www.youtube.com/watch?v=4WGNCbfrXU0

Presets 就是寫好的整包很好用的一些工具， React 轉 jsx 有， babel 預設也是有 preset-env

Presets 背後長這樣，就是 return 一些 loader , plugin

```
module.exports = function() {
  return {
    plugins: ["pluginA", "pluginB", "pluginC"],
  };
};
```

```
var a = async() =>{
    await console.log("Hello from the future!")
    console.log("Done")
}

```

被 babel 轉換後結果是

```
var a = function(){
    return Promise.resolve().then((function(){
        return console.log('Hello from the future!")
    })).then(function(){
        console.log("Done")
    })
}
```

Service worker cache 最好是在每一次 redeploy 時就更新 cache-name，這樣就會在 deploy 時清除快取

```
const CACHE_NAME = 'my-cache-v2'; // Update version on redeployment

const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/app.js',
    '/images/logo.png',
];

// Install event - Cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting(); // Force SW to activate immediately after install
});

// Activate event - Clear old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Force clients to use the updated SW immediately
});

// Fetch event - Serve cached content or fetch new content
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});


```

最新 Next.js 官方推薦使用
https://serwist.pages.dev/
