// MoreToolbox Service Worker — offline caching for static SSG tools
const CACHE_NAME = 'moretoolbox-v1'

// Pre-cache critical pages on install
const PRECACHE_URLS = [
  '/',
  '/tools/json-formatter/',
  '/tools/base64/',
  '/tools/url-encode/',
  '/tools/timestamp/',
  '/tools/qrcode/',
  '/tools/jwt-decoder/',
  '/tools/hash-generator/',
  '/tools/password-generator/',
  '/tools/uuid-generator/',
  '/tools/regex-tester/',
  '/tools/diff-checker/',
  '/tools/dns-lookup/',
  '/tools/my-ip/',
  '/tools/css-gradient/',
  '/tools/markdown-to-html/',
  '/tools/sql-formatter/',
  '/tools/html-formatter/',
  '/tools/js-formatter/',
  '/tools/xml-formatter/',
  '/tools/css-formatter/',
  '/tools/case-converter/',
  '/tools/color-converter/',
  '/tools/number-base/',
  '/tools/json-to-csv/',
  '/tools/yaml-formatter/',
  '/tools/html-entity/',
  '/tools/email-validator/',
  '/tools/cron-generator/',
  '/tools/meta-tag/',
  '/tools/svg-to-png/',
  '/tools/image-converter/',
  '/tools/image-compressor/',
  '/tools/lorem-ipsum/',
  '/tools/word-count/',
  '/tools/bcrypt-generator/',
  '/tools/random-number/',
  '/tools/user-agent/',
  '/tools/text-dedup/',
  '/tools/base64-image/',
  '/tools/markdown-editor/',
  '/tools/box-shadow-generator/',
  '/tools/color-palette/',
  '/tools/html-playground/',
  '/tools/password-strength/',
  '/tools/http-status-codes/',
  '/tools/url-parser/',
  '/tools/image-resizer/',
  '/tools/csv-viewer/',
  '/tools/emoji-picker/',
  '/tools/ascii-art-generator/',
  '/tools/json-schema-validator/',
  '/tools/qr-scanner/',
  '/tools/uuid-decoder/',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Stale-while-revalidate: serve from cache, then update
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => cached)
      return cached || fetchPromise
    })
  )
})
