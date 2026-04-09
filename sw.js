// O CACHE DO APLICATIVO (Faz a tela abrir sem internet)
const CACHE_NAME = 'logistica-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Se você tiver arquivos CSS ou JS separados, adicione o nome deles aqui embaixo, ex:
  // '/style.css',
  // '/scripts.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retorna a tela salva no celular se não tiver internet
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/index.html');
    })
  );
});