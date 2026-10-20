/**
 * KaiRis:T:siRiaK POST OFFICE · gated UI
 */

import {
  MAILBOXES,
  DRIVE_BOXES,
  COMMS_LANES,
  ZERO_HEARTH_URL,
  TASK_TOKENS,
  GMAIL_WORKSPACE,
} from './nw-post-office-registry.mjs';
import {
  getSessionAce,
  sessionCan,
  postOfficeBeacon,
} from './nw-post-office-gate.mjs';
import {
  loadShoreState,
  saveShoreState,
  buildTaskCompose,
  defaultInitiateTask,
} from './nw-zero-reconnect-shores.mjs';
import { mountLocalShoreProduct } from './nw-local-shore-product.mjs';

/** @param {HTMLElement} root */
export function mountPostOfficeApp(root) {
  const ace = getSessionAce();
  const aceLabel = document.getElementById('post-office-ace-label');
  if (aceLabel && ace) {
    aceLabel.textContent = ace.ace === 'post-office-host' ? 'HOST promulgation' : 'Steward read';
  }

  bindTabs();
  if (location.hash === '#zero') {
    document.querySelector('[data-po-tab="zero"]')?.click();
  } else if (location.hash === '#directory') {
    document.querySelector('[data-po-tab="directory"]')?.click();
  } else if (location.hash === '#shore' || location.hash === '#product') {
    document.querySelector('[data-po-tab="shore"]')?.click();
  }
  mountLocalShoreProduct(document.getElementById('po-panel-shore'), { compact: true });
  renderDirectory(document.getElementById('po-panel-directory'));
  renderDrives(document.getElementById('po-panel-drives'));
  renderComms(document.getElementById('po-panel-comms'));
  renderZeroPanel(document.getElementById('po-panel-zero'));

  const zeroLink = document.getElementById('po-zero-open');
  if (zeroLink) {
    zeroLink.href = ZERO_HEARTH_URL;
    zeroLink.addEventListener('click', () => postOfficeBeacon('zero_open'));
  }

  if (!sessionCan('*') && !sessionCan('zero:compose:self')) {
    document.querySelectorAll('[data-host-only]').forEach((el) => {
      el.hidden = true;
    });
  }
}

function bindTabs() {
  const tabs = document.querySelectorAll('[data-po-tab]');
  const panels = document.querySelectorAll('[data-po-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-po-tab');
      tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      panels.forEach((p) => {
        p.hidden = p.getAttribute('data-po-panel') !== id;
      });
    });
  });
}

/** @param {HTMLElement|null} el */
function renderDirectory(el) {
  if (!el) return;
  el.replaceChildren();
  const table = document.createElement('div');
  table.className = 'po-directory-table';
  for (const box of MAILBOXES) {
    const row = document.createElement('article');
    row.className = 'po-directory-row';
    row.innerHTML = `
      <div class="po-directory-main">
        <strong>${box.seat}</strong>
        <code>${box.email}</code>
        <span class="pill">${box.group}</span>
        ${box.instrument ? '<span class="pill pill-warn">instrument</span>' : ''}
      </div>
      <p class="po-directory-note">${box.note || ''}${box.steward ? ` · steward: ${box.steward}` : ''}</p>
    `;
    const actions = document.createElement('div');
    actions.className = 'zero-shore-actions';
    if (box.group !== 'external') {
      const gmail = document.createElement('a');
      gmail.className = 'btn btn-ghost btn-small';
      gmail.href = GMAIL_WORKSPACE;
      gmail.target = '_blank';
      gmail.rel = 'noopener';
      gmail.textContent = 'Gmail';
      actions.appendChild(gmail);
    }
    if (sessionCan('*')) {
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-secondary btn-small';
      copy.textContent = 'Copy TASK';
      copy.addEventListener('click', async () => {
        const msg = defaultInitiateTask({ seat: box.seat, email: box.email });
        await navigator.clipboard.writeText(msg.paste);
        postOfficeBeacon('compose_copy');
        copy.textContent = 'Copied';
        setTimeout(() => {
          copy.textContent = 'Copy TASK';
        }, 2000);
      });
      actions.appendChild(copy);
    }
    row.appendChild(actions);
    table.appendChild(row);
  }
  el.appendChild(table);
}

/** @param {HTMLElement|null} el */
function renderDrives(el) {
  if (!el) return;
  el.replaceChildren();
  const grid = document.createElement('div');
  grid.className = 'zero-shore-grid';
  for (const drive of DRIVE_BOXES) {
    const card = document.createElement('article');
    card.className = 'zero-shore-card';
    card.innerHTML = `
      <h3>${drive.label}</h3>
      <p class="zero-shore-meta">Tier ${drive.tier} · ${drive.custodian}</p>
    `;
    const a = document.createElement('a');
    a.className = 'btn btn-secondary btn-small';
    a.href = drive.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Open Drive';
    card.appendChild(a);
    grid.appendChild(card);
  }
  el.appendChild(grid);
}

/** @param {HTMLElement|null} el */
function renderComms(el) {
  if (!el) return;
  el.replaceChildren();
  const list = document.createElement('ul');
  list.className = 'po-comms-list';
  for (const lane of COMMS_LANES) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = lane.href;
    if (
      lane.kind === 'mail-client' ||
      lane.kind === 'webmail' ||
      lane.kind === 'portal' ||
      /^https?:\/\//.test(lane.href)
    ) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    a.textContent = lane.label;
    li.append(`${lane.kind}: `);
    li.appendChild(a);
    list.appendChild(li);
  }
  const proto = document.createElement('p');
  proto.className = 'micro muted';
  proto.textContent = `Task reply tokens: ${TASK_TOKENS}`;
  el.append(list, proto);
}

/** @param {HTMLElement|null} list */
function renderZeroPanel(list) {
  if (!list) return;
  list.replaceChildren();
  const state = loadShoreState();
  const shores = MAILBOXES.filter((m) => m.group !== 'external' && m.id !== 'kairis');

  for (const shore of shores) {
    const st = state[shore.id] || {};
    const card = document.createElement('article');
    card.className = 'zero-shore-card';
    card.dataset.shoreId = shore.id;

    const title = document.createElement('h3');
    title.textContent = shore.seat;

    const meta = document.createElement('p');
    meta.className = 'zero-shore-meta';
    meta.innerHTML = `<code>${shore.email}</code> · <span class="pill">${shore.group}</span>`;

    const flags = document.createElement('div');
    flags.className = 'zero-shore-flags';
    flags.innerHTML = [
      flagLabel('Welcome', st.welcome),
      flagLabel('TASK', st.task),
      flagLabel('ACK LOGIN', st.ack),
    ].join('');

    const actions = document.createElement('div');
    actions.className = 'zero-shore-actions';

    if (sessionCan('*') || sessionCan('zero:compose:self')) {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn-secondary btn-small';
      copyBtn.textContent = 'Copy for Zero';
      copyBtn.addEventListener('click', async () => {
        const msg = defaultInitiateTask({ seat: shore.seat, email: shore.email });
        await navigator.clipboard.writeText(msg.paste);
        postOfficeBeacon('compose_copy');
        copyBtn.textContent = 'Copied';
        setTimeout(() => {
          copyBtn.textContent = 'Copy for Zero';
        }, 2000);
      });
      actions.appendChild(copyBtn);
    }

    if (sessionCan('*')) {
      const markAck = document.createElement('button');
      markAck.type = 'button';
      markAck.className = 'btn btn-ghost btn-small';
      markAck.textContent = st.ack ? 'ACK logged' : 'Mark ACK LOGIN';
      markAck.addEventListener('click', () => {
        const s = loadShoreState();
        s[shore.id] = { ...s[shore.id], ack: !s[shore.id]?.ack };
        saveShoreState(s);
        renderZeroPanel(list);
      });
      actions.appendChild(markAck);
    }

    card.append(title, meta, flags, actions);
    list.appendChild(card);
  }

  const markAllBtn = document.getElementById('po-mark-host-sent');
  if (markAllBtn && !markAllBtn.dataset.bound && sessionCan('*')) {
    markAllBtn.dataset.bound = '1';
    markAllBtn.addEventListener('click', () => {
      const s = loadShoreState();
      for (const shore of shores) {
        if (shore.group === 'origin' || shore.group === 'established' || shore.group === 'portableri') {
          s[shore.id] = { ...s[shore.id], welcome: true, task: true };
        }
      }
      saveShoreState(s);
      renderZeroPanel(list);
    });
  }
}

function flagLabel(label, on) {
  return `<label class="zero-shore-flag"><input type="checkbox" disabled ${on ? 'checked' : ''} /> ${label}</label>`;
}

export { buildTaskCompose };
