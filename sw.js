const CACHE_NAME = 'v5';
const CACHE_FILES = [
    '/',
];

self.addEventListener('install', function(event) {
    console.log('install service...');
});

self.addEventListener('activate', event => {
    console.log('activate service...')
});

self.addEventListener('fetch', event => {
    console.log(event, this, 'this.navigator.onLine......' + this.navigator.onLine);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) { // 命中缓存
                console.log('命中缓存：', event.request.url);
                if (event.request.url.lastIndexOf('/') == event.request.url.length - 1)  {
                    // console.log( event.request.url);
                    if (this.navigator.onLine) return fetch(event.request)
                }
                return response;
            }
            console.log('未命中缓存：', event.request.url);
            return fetch(event.request);
        })
    );
});
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(cache => {
//      return cache.match(event.request).then(response => {
//       return response || fetch(event.request)
//       .then(response => {
//         const responseClone = response.clone();
//         cache.put(event.request, responseClone);
//         })
//       })
//     }
//  )
// });