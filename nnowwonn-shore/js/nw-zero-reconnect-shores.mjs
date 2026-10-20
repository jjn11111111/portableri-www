/**
 * reconnect0 shores · Zero mail promulgation · device-local state only
 */

import {
  RECONNECT_SHORES,
  ZERO_HEARTH_URL,
  TASK_TOKENS,
} from './nw-post-office-registry.mjs';

export { RECONNECT_SHORES, ZERO_HEARTH_URL, TASK_TOKENS };

const STORAGE_KEY = 'nw-zero-shore-state-v1';

/** @typedef {{ welcome?: boolean, task?: boolean, ack?: boolean, note?: string }} ShoreState */

/** @returns {Record<string, ShoreState>} */
export function loadShoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** @param {Record<string, ShoreState>} state */
export function saveShoreState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * @param {{ seat: string, email: string, taskId?: string, bluf: string, doneWhen: string[] }} opts
 */
export function buildTaskCompose(opts) {
  const id = opts.taskId || new Date().toISOString().slice(0, 10) + '-001';
  const subject = `[TASK · ${opts.seat} · ${id}] ${opts.bluf.slice(0, 60)}`;
  const body = [
    `${opts.seat} — TASK ${id}`,
    '',
    `BLUF: ${opts.bluf}`,
    '',
    'Done when:',
    ...opts.doneWhen.map((l) => `• ${l}`),
    '',
    `Reply: ${TASK_TOKENS}`,
    '',
    'Tier: B · P ≠ K ≠ R · From: kairis@reconnect0.com · Zero promulgation',
    'AMOR · PAX',
  ].join('\n');
  return { to: opts.email, subject, body, paste: `To: ${opts.email}\nSubject: ${subject}\n\n${body}` };
}

/** @param {{ seat: string, email: string }} shore */
export function defaultInitiateTask(shore) {
  return buildTaskCompose({
    seat: shore.seat,
    email: shore.email,
    bluf: 'Initiate mailbox · sign-in and ACK LOGIN',
    doneWhen: [
      `Signed in at https://mail.google.com as ${shore.email}`,
      `Reply DONE with: ACK LOGIN · ${shore.seat} · ${shore.email}`,
    ],
  });
}

/**
 * @param {HTMLElement} root
 */
export function mountZeroReconnectShores(root) {
  const state = loadShoreState();

  const zeroLink = document.getElementById('zero-open-link');
  if (zeroLink) zeroLink.href = ZERO_HEARTH_URL;

  const list = document.getElementById('zero-shore-list');
  if (!list) return;
  list.replaceChildren();

  for (const shore of RECONNECT_SHORES) {
    const st = state[shore.id] || {};
    const card = document.createElement('article');
    card.className = 'zero-shore-card';
    card.dataset.shoreId = shore.id;

    const title = document.createElement('h3');
    title.textContent = shore.seat;

    const meta = document.createElement('p');
    meta.className = 'zero-shore-meta';
    meta.innerHTML = `<code>${shore.email}</code> · <span class="pill">${shore.group}</span>`;

    const note = document.createElement('p');
    note.className = 'zero-shore-note';
    note.textContent = shore.note || '';

    const flags = document.createElement('div');
    flags.className = 'zero-shore-flags';
    flags.innerHTML = [
      flagLabel('welcome', 'Welcome', st.welcome),
      flagLabel('task', 'TASK', st.task),
      flagLabel('ack', 'ACK LOGIN', st.ack),
    ].join('');

    const actions = document.createElement('div');
    actions.className = 'zero-shore-actions';

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn-secondary btn-small';
    copyBtn.textContent = 'Copy for Zero compose';
    copyBtn.addEventListener('click', async () => {
      const msg = defaultInitiateTask(shore);
      await navigator.clipboard.writeText(msg.paste);
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = 'Copy for Zero compose';
      }, 2000);
    });

    const markAck = document.createElement('button');
    markAck.type = 'button';
    markAck.className = 'btn btn-ghost btn-small';
    markAck.textContent = st.ack ? 'ACK logged' : 'Mark ACK LOGIN';
    markAck.addEventListener('click', () => {
      const s = loadShoreState();
      s[shore.id] = { ...s[shore.id], ack: !s[shore.id]?.ack };
      saveShoreState(s);
      mountZeroReconnectShores(root);
    });

    actions.append(copyBtn, markAck);
    card.append(title, meta, note, flags, actions);
    list.appendChild(card);
  }

  const markAllBtn = document.getElementById('zero-mark-host-sent');
  if (markAllBtn && !markAllBtn.dataset.bound) {
    markAllBtn.dataset.bound = '1';
    markAllBtn.addEventListener('click', () => {
      const s = loadShoreState();
      for (const shore of RECONNECT_SHORES) {
        if (shore.group === 'origin' || shore.group === 'established' || shore.group === 'portableri') {
          s[shore.id] = { ...s[shore.id], welcome: true, task: true };
        }
      }
      saveShoreState(s);
      mountZeroReconnectShores(root);
    });
  }
}

function flagLabel(key, label, on) {
  return `<label class="zero-shore-flag"><input type="checkbox" disabled ${on ? 'checked' : ''} /> ${label}</label>`;
}
