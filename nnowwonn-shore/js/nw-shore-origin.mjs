/** Current shore host · www.nnowwonn.com · www.enterfaceri.com · localhost · Node verify */
const DOMAIN_WWW = {
  'nnowwonn.com': 'www.nnowwonn.com',
  'enterfaceri.com': 'www.enterfaceri.com',
};

/** @returns {boolean} */
function hasBrowserLocation() {
  return typeof location !== 'undefined' && Boolean(location?.hostname);
}

function currentHostname() {
  if (hasBrowserLocation()) return location.hostname;
  return 'www.enterfaceri.com';
}

function currentHost() {
  if (hasBrowserLocation()) return location.host;
  return 'enterfaceri.com';
}

export function apexForHost(hostname = currentHostname()) {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return null;
  if (hostname.startsWith('www.')) return hostname.slice(4);
  for (const apex of Object.keys(DOMAIN_WWW)) {
    if (hostname === apex || hostname.endsWith(`.${apex}`)) return apex;
  }
  return null;
}

export function canonWww(hostname = currentHostname()) {
  const apex = apexForHost(hostname);
  if (apex && DOMAIN_WWW[apex]) return DOMAIN_WWW[apex];
  if (hostname.startsWith('www.')) return hostname;
  return hostname;
}

export function canonOrigin() {
  if (hasBrowserLocation() && (location.protocol === 'http:' || location.protocol === 'https:')) {
    return `${location.protocol}//${canonWww()}`;
  }
  return `https://${canonWww()}`;
}

/** LASHER / export label e.g. enterfaceri.com/forum.html */
export function shorePath(page = 'workbench.html') {
  const apex = apexForHost();
  const host = apex ?? currentHost();
  return `${host}/${page}`;
}

/** PortAbleRI `?shore=` tag · not the full hostname */
export function shoreQueryTag() {
  const apex = apexForHost();
  if (apex === 'enterfaceri.com') return 'enterfaceri';
  if (apex === 'nnowwonn.com') return 'nnowwonn';
  return 'enterfaceri';
}

/** EnterFaceRI product URL vs NOW:WON brand URL (same static shore). */
export function isProductShoreHost() {
  const apex = apexForHost();
  if (!apex) return true;
  return apex === 'enterfaceri.com';
}

/** Other public host · same bench · no cross-redirect. */
export function siblingShoreHome() {
  const apex = apexForHost();
  if (apex === 'nnowwonn.com') return 'https://www.enterfaceri.com/';
  if (apex === 'enterfaceri.com') return 'https://www.nnowwonn.com/';
  return 'https://www.nnowwonn.com/';
}

export function portableriStudioHref(extra = {}) {
  const u = new URL('https://portableri.com/studio.html');
  u.searchParams.set('shore', shoreQueryTag());
  u.searchParams.set('from', 'enterface');
  for (const [k, v] of Object.entries(extra)) {
    if (v != null && v !== '') u.searchParams.set(k, String(v));
  }
  return u.href;
}

export function portableriPageHref(page, extra = {}) {
  const u = new URL(page, 'https://portableri.com/');
  u.searchParams.set('from', shoreQueryTag());
  for (const [k, v] of Object.entries(extra)) {
    if (v != null && v !== '') u.searchParams.set(k, String(v));
  }
  return u.href;
}

export function localStudio8877Href() {
  return `http://127.0.0.1:8877/studio.html?shore=${shoreQueryTag()}&from=enterface`;
}
