const CACHE  = 'clustertoko-v2'; // Naikkan versi jika kamu update kode
const ASSETS = [
  '/', // Penting agar root bisa dibuka
  './index.html', 
  './dashboard.html', 
  './upload.html',
  './clustering.html', 
  './hasil.html',
  './assets/css/style.css',
  './assets/js/config.js', 
  './assets/js/utils.js', 
  './assets/js/api.js',
  './assets/img/icon-512.png', 
  './assets/img/icon-192.png', 
  './manifest.json'
];

// Install: Simpan aset ke cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      console.log('Caching assets...');
      return c.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Ambil dari cache, jika tidak ada baru ambil dari internet
self.addEventListener('fetch', e => {
  // JANGAN cache request ke API atau Firebase Auth
  if (
    e.request.url.includes('/api/') || 
    e.request.url.includes('googleapis.com') || 
    e.request.url.includes('gstatic.com')
  ) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r => {
      return r || fetch(e.request).catch(() => {
        // Opsional: berikan halaman offline jika internet mati
        if (e.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});