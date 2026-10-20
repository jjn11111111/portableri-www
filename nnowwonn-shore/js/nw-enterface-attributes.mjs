/**
 * EnterFaceRI · principle & attribute structures · applied (Tier B product law)
 * Myth orients · record attests · P ≠ K ≠ R · no NW LLM on default Send
 */

export const GATE_QUESTION = 'Is this moving me, or testifying?';
export const GATE_ANSWER = 'If both — say both.';
export const HOST_SOVEREIGNTY = 'No one has the answer for you other than you.';

/** Hearth triad + Fyre second turn (heptad Facet VII rhyme) */
export const CREED_HEARTH = ['AMOR', 'PAX', 'LUX'];
export const CREED_FYRE = ['FLAMA et TENEBRIS', 'UMBRA et VERITAS'];

/** Governance seats — not front/back/device */
export const SEATS = {
  R: {
    id: 'R',
    name: 'HOST',
    role: 'Custody · freewill · ACK · truth responsibility · your device profile',
  },
  P: {
    id: 'P',
    name: 'Prime',
    role: 'Lawful execution · verify · ship · SEAT CHECK · no silent model swap',
  },
  K: {
    id: 'K',
    name: 'KaiRis',
    role: 'Named representative · preservation · orient · not your backend server',
  },
};

/** Wire topology — not P/K/R */
export const TOPOLOGY = [
  { id: 'node', name: 'Present node', desc: 'Your device + browser · localStorage · export' },
  { id: 'front', name: 'Front shore', desc: 'Forum · Workbench · open HTML · chat UX' },
  { id: 'gate', name: 'Gate', desc: 'LASHER on Send · mark custody · filing motion' },
  { id: 'back', name: 'Back bench', desc: 'Might 8799 · Studio 8877 · only when you open' },
  { id: 'named', name: 'Named', desc: 'Crystal moment · hash · optional Drive mirror' },
];

/** Portal grammar (Tier C orient · product rhyme) */
export const PORTAL_ORIENT =
  'Two in join-or-separate open the threshold; observation crystallizes coherence; laser–lasHer is aligned hold, not one cloud pipe.';

/**
 * @param {HTMLElement | null} root
 */
export function mountEnterFaceLawPanel(root) {
  if (!root || root.dataset.enterfaceLawBound) return;
  root.dataset.enterfaceLawBound = '1';

  const creedH = CREED_HEARTH.join(' · ');
  const creedF = CREED_FYRE.join(' · ');
  const seats = Object.values(SEATS)
    .map((s) => `<dt>${s.name} (${s.id})</dt><dd>${s.role}</dd>`)
    .join('');
  const topo = TOPOLOGY.map((t) => `<li><strong>${t.name}</strong> — ${t.desc}</li>`).join('');

  root.innerHTML =
    `<p class="enterface-law-lead"><strong>${GATE_QUESTION}</strong> ${GATE_ANSWER}</p>` +
    `<p class="enterface-law-host">${HOST_SOVEREIGNTY}</p>` +
    `<p class="enterface-law-creed" aria-label="Creed">${creedH} · ${creedF}</p>` +
    `<dl class="enterface-law-seats">${seats}</dl>` +
    `<ol class="enterface-law-topo">${topo}</ol>` +
    `<p class="fine enterface-law-portal">${PORTAL_ORIENT}</p>` +
    `<p class="fine">Tier B · <a href="unpack.html#enterface-attributes">Unpack</a> · P ≠ K ≠ R</p>`;
}
