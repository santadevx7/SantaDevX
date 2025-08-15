// Service Worker for Saif Fikry Portfolio
// Advanced PWA Features

const CACHE_NAME = 'saif-fikry-portfolio-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Files to cache
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdn.jsdelivr.net/npm/typed.js@2.0.12'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', request.url);
                    return cachedResponse;
                }
                
                // Fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Check if valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clone response for caching
                        const responseToCache = networkResponse.clone();
                        
                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                console.log('Service Worker: Caching dynamic content', request.url);
                                cache.put(request, responseToCache);
                            });
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('Service Worker: Fetch failed', error);
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return placeholder for images
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#00d4ff"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14">صورة غير متاحة</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        throw error;
                    });
            })
    );
});

// Background sync
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'رسالة جديدة من موقع سيف فكري',
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'استكشف الموقع',
                icon: '/icon-explore.png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/icon-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('سيف فكري - Portfolio', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Sync contact form data
async function syncContactForm() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        const contactRequests = requests.filter(request => 
            request.url.includes('/contact') && request.method === 'POST'
        );
        
        for (const request of contactRequests) {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    await cache.delete(request);
                    console.log('Service Worker: Contact form synced successfully');
                }
            } catch (error) {
                console.error('Service Worker: Failed to sync contact form', error);
            }
        }
    } catch (error) {
        console.error('Service Worker: Sync contact form failed', error);
    }
}

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
    console.log('Service Worker: Periodic sync triggered', event.tag);
    
    if (event.tag === 'update-content') {
        event.waitUntil(updateContent());
    }
});

// Update content in background
async function updateContent() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        
        // Update critical resources
        const criticalResources = [
            '/',
            '/index.html',
            '/style.css',
            '/script.js'
        ];
        
        for (const resource of criticalResources) {
            try {
                const response = await fetch(resource);
                if (response.ok) {
                    await cache.put(resource, response);
                    console.log('Service Worker: Updated resource', resource);
                }
            } catch (error) {
                console.error('Service Worker: Failed to update resource', resource, error);
            }
        }
    } catch (error) {
        console.error('Service Worker: Update content failed', error);
    }
}

// Handle fetch errors gracefully
function handleFetchError(request) {
    if (request.destination === 'document') {
        return caches.match('/index.html');
    }
    
    if (request.destination === 'image') {
        return caches.match('/placeholder-image.svg');
    }
    
    return new Response('خدمة غير متاحة حالياً', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
            'Content-Type': 'text/plain; charset=utf-8'
        })
    });
}

// Cache management
async function cleanupCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name !== STATIC_CACHE && name !== DYNAMIC_CACHE
    );
    
    return Promise.all(
        oldCaches.map(cacheName => {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
        })
    );
}

// Performance monitoring
function logPerformance(request, startTime) {
    const duration = Date.now() - startTime;
    console.log(`Service Worker: ${request.url} took ${duration}ms`);
    
    // Send performance data to analytics (if implemented)
    if (duration > 1000) {
        console.warn(`Service Worker: Slow request detected: ${request.url} (${duration}ms)`);
    }
}

// Error reporting
function reportError(error, context) {
    console.error(`Service Worker Error [${context}]:`, error);
    
    // Send error to monitoring service (if implemented)
    // This could be integrated with services like Sentry, LogRocket, etc.
}

console.log('Service Worker: Script loaded successfully');

