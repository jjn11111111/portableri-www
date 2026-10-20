/** EnterFace offline shell · static same-origin only · no thread upload */
const CACHE = 'enterface-shell-v21';
const CORE = [
  '/open.html',
  '/forum.html',
  '/memory-core.html',
  '/workbench.html',
  '/unpack.html',
  '/cookioe.html',
  '/shall-not.html',
  '/enter.html',
  '/styles.css',
  '/manifest.webmanifest',
  '/js/nw-canonical-host.mjs',
  '/js/nw-shore-origin.mjs',
  '/js/nw-shore-brand.mjs',
  '/js/nw-opening.mjs',
  '/js/nw-workbench.mjs',
  '/js/nw-composer-thread.mjs',
  '/js/nw-family-systems.mjs',
  '/js/nw-i18n.mjs',
  '/js/nw-onboard-progress.mjs',
  '/js/nw-enterface-shell.mjs',
  '/js/nw-face-summon.mjs',
  '/js/nw-lane-handoff.mjs',
  '/js/nw-moment-import.mjs',
  '/js/nw-forum-flow.mjs',
  '/js/nw-forum-might.mjs',
  '/js/nw-memory-core.mjs',
  '/js/nw-filing-tree.mjs',
  '/js/nw-filing-motion.mjs',
  '/js/nw-composer-intent.mjs',
  '/js/nw-enterface-attributes.mjs',
  '/js/nw-user-custody.mjs',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => undefined)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && url.pathname.match(/\.(css|html|webmanifest)$/) && !url.pathname.endsWith('.mjs')) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('/open.html')))
  );
});
