/**
 * This user’s filing only · progress from mark custody
 */
import { getUserFilingExclusive, getUserCubeState, OCTANT_ORDER } from './nw-user-custody.mjs';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pct(n) {
  return `${Math.round(n * 100)}%`;
}

function levelMap(slots) {
  /** @type {Record<string, number>} */
  const m = {};
  OCTANT_ORDER.forEach((id, i) => {
    m[id] = slots[i]?.level ?? 0;
  });
  return m;
}

function column(title, rows, progress, empty) {
  if (!rows.length) {
    return `<section class="filing-tree-col filing-tree-empty"><h2>${esc(title)}</h2><p>${esc(empty)}</p></section>`;
  }
  const lis = rows
    .map((r) => {
      const level = r.level ?? 0;
      return (
        `<li>` +
        `<code>${esc(r.id)}</code> <span>${esc(r.label)}</span>` +
        `<span class="filing-tree-meter" style="--fill:${pct(level)}" aria-hidden="true"></span>` +
        (r.hint ? `<em>${esc(r.hint)}</em>` : '') +
        `</li>`
      );
    })
    .join('');
  return (
    `<section class="filing-tree-col">` +
    `<h2>${esc(title)} <span class="filing-tree-pct">${pct(progress)}</span></h2>` +
    `<ol class="filing-tree-list">${lis}</ol></section>`
  );
}

/** @param {HTMLElement} root */
export function renderFilingTree(root) {
  if (!root) return;
  const filing = getUserFilingExclusive();
  const state = getUserCubeState();
  const primaryLabel =
    filing.primaryEnd === 'back' ? 'Back filing end active' : 'Front filing end active';

  const fLevels = levelMap(state.frontSlots);
  const bLevels = levelMap(state.backSlots);

  const frontRows = filing.front.map((r) => ({ ...r, level: fLevels[r.id] ?? 0.4 }));
  const backRows = filing.back.map((r) => ({ ...r, level: bLevels[r.id] ?? 0.4 }));

  root.innerHTML =
    `<p class="filing-tree-facet">Your facet · <code>${esc(filing.facet)}</code> · ${esc(primaryLabel)} · this device only</p>` +
    `<div class="filing-tree-grid">` +
    column('Front slots', frontRows, state.frontProgress, 'Send on Forum to mark front custody.') +
    column('Back slots', backRows, state.backProgress, 'Export · 8877 · Muscle to mark back custody.') +
    `</div>`;
}

window.addEventListener('nw-custody-changed', () => {
  const root = document.getElementById('filing-tree');
  if (root) renderFilingTree(root);
});
