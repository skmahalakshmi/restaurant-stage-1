self.addEventListener('install', function (event) {
	console.log('SW Installed');
	event.waitUntil(
    	caches.open('static')
        	.then(function (cache) {
            	return cache.addAll([

            	]);
        	})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
    	caches.match(event.request).then(function(resp) {
        	return resp || fetch(event.request).then(function(response) {
            	return caches.open('static').then(function(cache) {
                	cache.put(event.request, response.clone());
                	return response;
            	});
        	});
    	})
	);
});
