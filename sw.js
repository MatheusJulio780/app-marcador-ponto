const CACHE_NAME = 'icaphi-esponja-v1';

self.addEventListener('install', event => {
    self.skipWaiting(); // Ativa na hora
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
    // ESTRATÉGIA ESPONJA: Tenta a internet primeiro. Se falhar, puxa da memória.
    event.respondWith(
        fetch(event.request)
        .then(respostaRede => {
            // Se tem internet, ele salva uma cópia silenciosa na memória pra usar depois
            if (respostaRede && respostaRede.status === 200 && event.request.method === 'GET') {
                const copia = respostaRede.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copia));
            }
            return respostaRede;
        })
        .catch(() => {
            // Caiu a internet? Ele entrega a cópia da memória!
            return caches.match(event.request);
        })
    );
});
