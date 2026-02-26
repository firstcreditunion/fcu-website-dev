// Minimal PWA service worker: no offline caching
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})
// Keep an empty fetch handler so Chrome considers SW installable for PWA
self.addEventListener('fetch', () => { })


