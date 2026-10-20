/**
 * Memory core · graphics removed v0 · phase hooks kept for filing pipeline / custody
 * (restore canvas from git history when visuals return)
 */

/** @type {string} */
let phase = 'idle';

/** @param {string} next */
export function setMemoryCorePhase(next) {
  phase = next;
  try {
    window.dispatchEvent(new CustomEvent('nw-memory-core-phase', { detail: { phase: next } }));
  } catch {
    /* non-browser */
  }
}

export function getMemoryCorePhase() {
  return phase;
}

/** @param {ParentNode | null | undefined} _root */
export function mountMemoryCoreField(_root) {
  /* no canvas · core filing via nw-filing-tree + forum pipeline bar */
}

export const setHypercubePhase = setMemoryCorePhase;
export const mountMirroredHypercubes = mountMemoryCoreField;
