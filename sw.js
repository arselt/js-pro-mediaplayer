const VERSION = "v1";

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  // Other methods don't tend to be saved
  if (request.method != "GET") {
    return;
  }

  // Search through Cache
  event.respondWith(cachedResponse(request));

  //Then to network to look for changes
  event.waitUntil(updateCache(request));
});

async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll;
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
