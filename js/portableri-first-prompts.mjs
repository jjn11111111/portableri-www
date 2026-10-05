/**
 * Subscriber first prompts · SEAT CHECK + FOCUS LOCK (v0).
 * @see publish/2026-10-05_PortAbleRI_Subscriber-First-Prompts_Focus-Lock_v0.md
 */

export const FOCUS_ANGLES = [
  {
    id: 'instrument',
    label: 'Instrument',
    hint: 'Center · studio · BP · default day one',
    ring: 'Center instrument (studio · BP · verify)',
    outcome:
      'Learn PortAbleRI as my local studio — SI hold context at home · BP send only what I mark · HA I steer.',
    firstTurn:
      'confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then help me take the next lawful step on-site (demo · verify · export).',
  },
  {
    id: 'verify',
    label: 'Verify',
    hint: 'Local proof · manifest or export',
    ring: 'Verify (local proof · trust manifest)',
    outcome:
      'Walk me through one verify pass on my export or manifest hash — Tier A/B honesty, no legal guarantees from software.',
    firstTurn:
      'confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then guide verify steps only.',
  },
  {
    id: 'learn',
    label: 'Learn',
    hint: 'APLTFeV · Prime law · rollout',
    ring: 'Learn (APLTFeV · Prime law · rollout)',
    outcome:
      'Teach APLTFeV in plain language — Agency · Prime · Local truth · Fortress · export · Verify — and my next click on portableri.com.',
    firstTurn:
      'confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then answer from published docs only (flag Tier C myth separately).',
  },
  {
    id: 'build',
    label: 'Build / ship',
    hint: 'Hearth · one deliverable sentence',
    ring: 'Build / ship (Hearth · one Prime)',
    outcome: '[one sentence — your deliverable]',
    firstTurn:
      'confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then propose the smallest lawful next step and execute it.',
    extra:
      'Tool blocks = policy + fix, not faux HOST denial.\nNo silent model swap. After SEAT CHECK + FOCUS LOCK: execute toward my outcome without undeclared guests or subagents.',
  },
  {
    id: 'myth',
    label: 'Myth & Record',
    hint: 'Tier C · orientation only',
    ring: 'Myth & Record (Tier C · orientation only)',
    outcome:
      'Explore Myth & Record framing with epistemic tiers — separate metaphor from Tier A/B instrument claims.',
    firstTurn:
      'confirm SEAT CHECK, restate my outcome, label Tier C clearly, do not present myth as established fact.',
  },
];

const PRIME_DISPLAY = {
  'composer-2.5-fast': 'Composer 2.5 Fast',
  'claude-sonnet': 'Claude Sonnet',
  'gpt-4.1': 'GPT-4.1',
  grok: 'Grok',
  'local-mlx': 'Local MLX',
};

export function displayModelId(primeModelId) {
  const id = String(primeModelId || '').trim();
  if (!id) return '[model]';
  return PRIME_DISPLAY[id] || id;
}

export function buildSeatCheck({ foregroundModel, primeModelId, mode = 'Hearth', headCount = 1, subagents = 'off' }) {
  const fg = displayModelId(foregroundModel || primeModelId);
  const prime = String(primeModelId || '').trim() || '[your Prime ID]';
  return `SEAT CHECK · Foreground: ${fg} · Mode: ${mode} · Head count: ${headCount} · Subagents: ${subagents} · Prime: ${prime}`;
}

export function buildFocusLock(angle, outcomeOverride) {
  const outcome = String(outcomeOverride || angle.outcome).trim();
  const lines = [
    `FOCUS LOCK · Ring: ${angle.ring}`,
    `Outcome this thread: ${outcome}`,
    'BP: send only what I mark · HA: I steer · P ≠ K ≠ R',
    `First turn: ${angle.firstTurn}`,
  ];
  if (angle.extra) lines.push(angle.extra);
  return lines.join('\n');
}

export function buildCombinedPrompt({ angle, primeModelId, foregroundModel, outcomeOverride }) {
  const seat = buildSeatCheck({ foregroundModel, primeModelId });
  const focus = buildFocusLock(angle, outcomeOverride);
  return `${seat}\n\n${focus}`;
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}
