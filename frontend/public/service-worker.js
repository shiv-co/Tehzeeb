// 🌸 Tehzeeb Creations — Optimized Service Worker
const CACHE_NAME = "tehzeeb-cache-v2"; // increment this to clear old caches
const API_CACHE = "tehzeeb-api-cache-v1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/Logo1.png",
];

// 🧱 INSTALL — Cache essential static assets
self.addEventListener("install", (event) => {
  console.log("🪶 [SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ [SW] Pre-caching static assets...");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// 🧹 ACTIVATE — Remove old caches
self.addEventListener("activate", (event) => {
  console.log("⚙️ [SW] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== API_CACHE) {
            console.log("🧹 [SW] Removing old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ⚡ FETCH HANDLER
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests (like POST, PUT)
  if (request.method !== "GET") return;

  const requestURL = new URL(request.url);

  // --- 1️⃣ API Calls (network-first strategy)
  if (requestURL.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a clone for offline use
          const clone = response.clone();
          caches.open(API_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Use cache if offline
          return caches.match(request);
        })
    );
    return;
  }

  // --- 2️⃣ Static Assets (cache-first strategy)
  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request)
          .then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(() => {
            // Optional fallback for offline pages/images
            if (request.destination === "document") {
              return caches.match("/index.html");
            }
          })
      );
    })
  );
});
