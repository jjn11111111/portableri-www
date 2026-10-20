import { apexForHost, canonWww } from './nw-shore-origin.mjs';

export function ensureCanonicalHost() {
  const www = canonWww();
  if (location.hostname === www) return;
  const apex = apexForHost();
  if (!apex) return;
  const target = `https://${www}${location.pathname}${location.search}${location.hash}`;
  location.replace(target);
}

ensureCanonicalHost();
