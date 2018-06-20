// sw help from https://css-tricks.com/serviceworker-for-offline/

// files that will be cached using the install event
const cacheName = 'app-v1';

self.addEventListener('install', (event) => {
	// delays the install event until the promise is resolved
    event.waitUntil(
        caches
        .open(cacheName)
        .then((cache) => {
			return cache.addAll([
				'/',
				'css/styles.css',
                'data/restaurants.json',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'index.html',
				'restaurant.html'
			]);
		}).then(() => {
            console.log('Service Worker: install completed');
        })
	);
});

// fetch updates from the network
self.addEventListener('fetch', (event) => {
    console.log('fetch updates from the network');

    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
});

// activate new cache and delete the old cache
self.addEventListener('activate', (event) => {
    console.log('activate new cache');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter((cName) => {
                    return cacheName.startsWith('app-') && cacheName != cacheName;
                }).map((cName) => {
                    return cache.delete(cName);
                })
            )
        }).catch((error) => {
            // on first run, it should log this error
            console.log('there is no old cache to be deleted');
            return
        })
    );
});
