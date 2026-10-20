/**
 * Dual-host shore branding · enterfaceri = product face · nnowwonn = NOW:WON brand.
 * Same static shore · no cross-redirect · PortAbleRI ?shore= follows hostname.
 */

import {
  isProductShoreHost,
  siblingShoreHome,
  portableriStudioHref,
  portableriPageHref,
  localStudio8877Href,
} from './nw-shore-origin.mjs';

const COPY = {
  product: {
    navHome: 'EnterFaceRI',
    navEnter: 'EnterFaceRI',
    openingMark: 'EnterFaceRI',
    openingSubLead: 'ReClaim YOUr Face · open shore ·',
    siblingText: 'Same open bench · NOW:WON brand',
    familyHereName: 'EnterFaceRI · open shore',
    indexEyebrow: 'EnterFaceRI · ReClaim YOUr Face · open shore · no login on www',
    workbenchTitle: 'EnterFaceRI Workbench',
    workbenchLead:
      'One thread for you — the EnterFaceRI instrument on the open shore. Hold here first; KaiRis family lanes when you choose.',
    documentTitle: (page) => PAGE_TITLES.product[page] ?? PAGE_TITLES.product.generic,
  },
  nnowwonn: {
    navHome: 'NNowwoNN · NOW:WON',
    navEnter: 'EnterFace',
    openingMark: 'NNoWWoNN',
    openingSubLead: 'EnterFace · NOW:WON ·',
    siblingText: 'Same open bench · EnterFaceRI product mark',
    familyHereName: 'EnterFace · NOW:WON',
    indexEyebrow: 'ReClaim YOUr Face · EnterFaceRI · open shore · no login on www',
    workbenchTitle: 'EnterFace Workbench',
    workbenchLead:
      'One thread for you — gateway to the KaiRis family of systems (NOW:WON · PortAbleRI · verify · library · witness). Hold here first; open other lanes only when you choose.',
    documentTitle: (page) => PAGE_TITLES.nnowwonn[page] ?? PAGE_TITLES.nnowwonn.generic,
  },
};

const PAGE_TITLES = {
  product: {
    home: 'EnterFaceRI · ReClaim YOUr Face',
    opening: 'EnterFaceRI · begin typing',
    workbench: 'EnterFaceRI Workbench · KaiRis family',
    generic: 'EnterFaceRI · open shore',
  },
  nnowwonn: {
    home: 'NOW:WON · two ways in',
    opening: 'EnterFace · NOW:WON',
    workbench: 'EnterFace Workbench · KaiRis family · NNoWWoNN',
    generic: 'NOW:WON · EnterFace · NNoWWoNN',
  },
};

function brandCopy() {
  return isProductShoreHost() ? COPY.product : COPY.nnowwonn;
}

function wireShoreLinks() {
  const map = {
    'portableri-studio': () => portableriStudioHref(),
    'portableri-start': () => portableriPageHref('start.html'),
    'portableri-onboarding': () => portableriPageHref('onboarding.html', { begin: '1' }),
    'local-studio-8877': () => localStudio8877Href(),
  };
  for (const el of document.querySelectorAll('[data-shore-link]')) {
    const key = el.getAttribute('data-shore-link');
    const fn = map[key];
    if (fn) el.href = fn();
  }
}

function applyBrandVisibility() {
  const product = isProductShoreHost();
  for (const el of document.querySelectorAll('[data-brand-show]')) {
    const mode = el.getAttribute('data-brand-show');
    el.hidden = mode === 'product' ? !product : product;
  }
}

function setText(sel, text) {
  const el = document.querySelector(sel);
  if (el && text) el.textContent = text;
}

/**
 * @param {{ page?: 'home' | 'opening' | 'workbench' | 'generic' }} [opts]
 */
export function applyShoreBrand(opts = {}) {
  const page = opts.page ?? 'generic';
  const b = brandCopy();

  applyBrandVisibility();
  wireShoreLinks();

  setText('[data-brand-nav-home]', b.navHome);
  setText('[data-brand-nav-enter]', b.navEnter);
  setText('[data-brand-opening-mark]', b.openingMark);
  setText('[data-brand-index-eyebrow]', b.indexEyebrow);
  setText('[data-brand-workbench-title]', b.workbenchTitle);

  const wbLead = document.querySelector('[data-brand-workbench-lead]');
  if (wbLead) wbLead.innerHTML = b.workbenchLead;

  const openingSub = document.querySelector('[data-brand-opening-sub]');
  if (openingSub) {
    openingSub.innerHTML = `${b.openingSubLead} <a href="forum.html" class="opening-cookioe">Forum</a> · <a href="unpack.html#enterface-attributes" class="opening-cookioe">Say both</a> · <a href="shall-not.html" class="opening-cookioe">YOU SHALL NOT PASS</a> · <a href="cookioe.html" class="opening-cookioe">Cookioe</a> · yours`;
  }

  const sibling = document.querySelector('[data-brand-sibling]');
  if (sibling) {
    sibling.href = siblingShoreHome();
    sibling.textContent = b.siblingText;
  }

  const title = b.documentTitle(page);
  if (title) document.title = title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta && page === 'home') {
    meta.content = isProductShoreHost()
      ? 'EnterFaceRI — ReClaim YOUr Face on the open shore. Hold on device · no NW chat pipe · KaiRis family lanes when you choose.'
      : 'NOW:WON — two ways in, one fire. Hearth or Forge. EnterFaceRI on NNowwoNN · same keys, same workbench.';
  }
}

export { brandCopy, isProductShoreHost };
