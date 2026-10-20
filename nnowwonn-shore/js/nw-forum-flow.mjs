/**
 * Forum · chat UX · front / gate / back / named · LASHER on device · no NW LLM.
 */
import { buildLasherRecordV0, downloadText } from './nw-workbench.mjs';
import { mightHealth, mightStoreMoment, mightCompress, openLaneAStudio } from './nw-forum-might.mjs';
import { setMemoryCorePhase } from './nw-memory-core.mjs';
import { runFilingMotionPipeline } from './nw-filing-motion.mjs';
import { wireComposerIntent } from './nw-composer-intent.mjs';
import { parseMomentImport } from './nw-moment-import.mjs';
import { markCustodyByKey, notifyCustodyChanged, syncCustodyFromDevice } from './nw-user-custody.mjs';
import { shorePath } from './nw-shore-origin.mjs';

const PHASE_MS = 420;
const THREAD_KEY = 'nw-forum-thread-v2';
const THREAD_KEY_LEGACY = 'nw-forum-thread-v1';

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** @typedef {{ role: 'user', text: string } | { role: 'assistant', recordId: string, sha256: string, replyText?: string, userEcho?: string, importLane?: string, parentMomentId?: string, err?: string }} ForumMsg */

/** @returns {ForumMsg[]} */
function migrateLegacyThread(raw) {
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    /** @type {ForumMsg[]} */
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      const m = arr[i];
      if (m.role === 'user') {
        out.push({ role: 'user', text: String(m.text ?? '') });
        continue;
      }
      if (m.recordId && m.sha256) {
        out.push(m);
        continue;
      }
      const prior = out[out.length - 1];
      const userEcho =
        prior?.role === 'user' ? String(prior.text).slice(0, 160) : '';
      const html = String(m.html ?? '');
      const idMatch = html.match(/<code>(LASHER[^<]+)<\/code>/i);
      const sealMatch = html.match(/forum-msg-seal[^>]*>\s*<code>([^<]+)/i);
      if (idMatch) {
        out.push({
          role: 'assistant',
          recordId: idMatch[1],
          sha256: sealMatch?.[1]?.replace(/…$/, '') ?? '',
          replyText: '',
          userEcho,
        });
        continue;
      }
      if (html.includes('forum-msg-err')) {
        out.push({
          role: 'assistant',
          recordId: 'error',
          sha256: '',
          err: html.replace(/<[^>]+>/g, ' ').trim(),
        });
        continue;
      }
      out.push({ role: 'assistant', recordId: 'legacy', sha256: '', replyText: '', userEcho });
    }
    return out;
  } catch {
    return [];
  }
}

/** @returns {ForumMsg[]} */
function loadThread() {
  try {
    const raw = localStorage.getItem(THREAD_KEY);
    if (raw) return JSON.parse(raw);
    const leg = localStorage.getItem(THREAD_KEY_LEGACY);
    if (leg) {
      const migrated = migrateLegacyThread(leg);
      saveThread(migrated);
      return migrated;
    }
    return [];
  } catch {
    return [];
  }
}

function saveThread(messages) {
  try {
    localStorage.setItem(THREAD_KEY, JSON.stringify(messages.slice(-80)));
  } catch {
    /* */
  }
}

/** @param {HTMLElement} root */
function setPhase(root, phase) {
  if (!root) return;
  root.dataset.phase = phase;
  setMemoryCorePhase(phase);
  root.querySelectorAll('[data-forum-step]').forEach((el) => {
    el.classList.toggle('forum-step-lit', el.dataset.forumStep === phase);
  });
  if (phase === 'crystal' || phase === 'done') {
    root.querySelectorAll('[data-forum-step]').forEach((el) => el.classList.add('forum-step-lit'));
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** @param {ForumMsg[]} messages */
function renderThread(messages) {
  const threadEl = document.getElementById('forum-thread');
  const emptyEl = document.getElementById('forum-thread-empty');
  if (!threadEl) return;

  threadEl.innerHTML = '';
  if (!messages.length) {
    if (emptyEl) emptyEl.hidden = false;
    return;
  }
  if (emptyEl) emptyEl.hidden = true;

  for (const m of messages) {
    const div = document.createElement('div');
    div.className = `forum-msg forum-msg-${m.role}`;
    if (m.role === 'user') {
      div.textContent = m.text;
    } else if (m.err) {
      div.innerHTML = `<p class="forum-msg-err">${escHtml(m.err)}</p>`;
    } else if (m.recordId === 'pending') {
      div.innerHTML = '<p class="forum-msg-pending">…</p>';
    } else {
      div.innerHTML = assistantHtml(
        { id: m.recordId },
        m.sha256,
        m.replyText ?? '',
        m.userEcho ?? '',
        m.importLane,
        m.parentMomentId,
      );
    }
    threadEl.appendChild(div);
  }
  threadEl.scrollTop = threadEl.scrollHeight;
}

function assistantHtml(record, sha256, replyText, userEcho, importLane, parentMomentId) {
  let body = replyText?.trim() ?? '';
  if (!body) {
    body = userEcho
      ? `Held on this device — “${userEcho}”`
      : 'Held on this device. Nothing left the open shore unless you open a HOST lane.';
  }
  const importLabel =
    importLane && record.id === 'reply-import'
      ? `<p class="forum-msg-import fine">Imported · ${escHtml(importLane)} · no NW pipe</p>`
      : '';
  const sealBlock =
    record.id &&
    record.id !== 'legacy' &&
    record.id !== 'error' &&
    record.id !== 'reply-import' &&
    record.id !== 'pending'
      ? `<details class="forum-msg-meta"><summary>Named moment</summary>` +
        `<p class="forum-msg-id"><code>${escHtml(record.id)}</code></p>` +
        (sha256 ? `<p class="forum-msg-seal"><code>${escHtml(sha256)}</code></p>` : '') +
        `</details>`
      : '';
  const parentBlock =
    parentMomentId && record.id === 'reply-import'
      ? `<details class="forum-msg-meta"><summary>Shuttle link</summary><p><code>${escHtml(parentMomentId)}</code></p></details>`
      : '';
  return `<p class="forum-msg-reply">${escHtml(body)}</p>${importLabel}${parentBlock}${sealBlock}`;
}

/**
 * @param {{ query: string }} opts
 */
export async function runForumFlow(opts) {
  const stage = document.getElementById('forum-stage');
  const query = String(opts.query ?? '').trim();
  if (!query) throw new Error('Empty.');

  const buildOpts = {
    firstForm: query,
    slug: query.slice(0, 48),
    tier: 'B',
    lashTo: ['NW-Forum-v0'],
    shore: shorePath('forum.html'),
  };

  if (stage) stage.hidden = false;

  const built = await runFilingMotionPipeline(() => buildLasherRecordV0(buildOpts), (p) => {
    if (!stage) return;
    if (p === 'idle') {
      stage.hidden = true;
    }
    setPhase(stage, p);
  });

  return built;
}

export function wireForumChat() {
  const form = document.getElementById('forum-form');
  const input = document.getElementById('forum-input');
  const btn = document.getElementById('forum-submit');
  const btnSave = document.getElementById('forum-save');

  let messages = loadThread();
  let lastExport = /** @type {{ exportText: string, filename: string, recordId: string, sha256: string } | null} */ (
    null
  );
  const btnLaneA = document.getElementById('forum-lane-a');
  const btnMuscle = document.getElementById('forum-lane-c');
  const btnImportReply = document.getElementById('forum-import-reply');
  const importReplyFile = document.getElementById('forum-import-reply-file');
  let lastUserLine = '';

  /** @param {ReturnType<typeof parseMomentImport>} parsed */
  function appendImportedReply(parsed) {
    if (parsed.kind !== 'reply') {
      throw new Error('Forum import expects NW-Moment-Reply-v0 (use Export for raw moments on Workbench).');
    }
    messages.push({
      role: 'assistant',
      recordId: 'reply-import',
      sha256: '',
      replyText: parsed.text,
      importLane: parsed.lane ?? 'studio',
      parentMomentId: parsed.parentId ?? undefined,
    });
    markCustodyByKey('front', 'handoff', { hint: (parsed.parentId ?? 'reply').slice(0, 28) });
    markCustodyByKey('back', parsed.lane === 'symbiote' ? 'turn' : 'studio');
    setMemoryCorePhase('back');
    window.setTimeout(() => setMemoryCorePhase('idle'), 600);
    notifyCustodyChanged();
    saveThread(messages);
    renderThread(messages);
  }

  async function ingestReplyRaw(raw) {
    const parsed = parseMomentImport(raw);
    appendImportedReply(parsed);
  }

  renderThread(messages);
  syncCustodyFromDevice();
  notifyCustodyChanged();

  async function sendLine(text) {
    const line = String(text ?? '').trim();
    if (!line) return;

    messages.push({ role: 'user', text: line });
    renderThread(messages);
    input.value = '';
    input.style.height = '';

    btn.disabled = true;
    messages.push({
      role: 'assistant',
      recordId: 'pending',
      sha256: '',
    });
    renderThread(messages);

    try {
      const { record, sha256, filename, exportText } = await runForumFlow({ query: line });
      lastUserLine = line;
      markCustodyByKey('front', 'forum', { hint: line.slice(0, 40) });
      markCustodyByKey('front', 'export', { hint: record.id.slice(0, 28) });
      if (await mightHealth()) {
        try {
          await mightStoreMoment(record.id, JSON.parse(exportText));
          markCustodyByKey('back', 'might_live');
          markCustodyByKey('back', 'moment', { hint: record.id.slice(0, 28) });
        } catch {
          /* Might offline · hold still valid */
        }
      }
      messages.pop();
      messages.push({
        role: 'assistant',
        recordId: record.id,
        sha256,
        replyText: '',
        userEcho: line.slice(0, 160),
      });
      lastExport = { exportText, filename, recordId: record.id, sha256 };
      if (btnSave) btnSave.disabled = false;
      if (btnLaneA) btnLaneA.disabled = false;
      if (btnMuscle) btnMuscle.disabled = false;
    } catch (err) {
      messages.pop();
      messages.push({
        role: 'assistant',
        recordId: 'error',
        sha256: '',
        err: err.message,
      });
    } finally {
      btn.disabled = false;
      saveThread(messages);
      renderThread(messages);
      input.focus();
    }
  }

  if (!form || !input) return;

  wireComposerIntent(input);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendLine(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
  });

  btnSave?.addEventListener('click', () => {
    if (!lastExport) return;
    downloadText(
      lastExport.filename.replace(/\.json$/, '-forum.json'),
      lastExport.exportText,
    );
    markCustodyByKey('front', 'export', { hint: lastExport.recordId.slice(0, 28) });
    markCustodyByKey('back', 'crystal', { hint: lastExport.sha256.slice(0, 16) });
    notifyCustodyChanged();
  });

  btnLaneA?.addEventListener('click', async () => {
    if (!lastExport) return;
    btnLaneA.disabled = true;
    try {
      await openLaneAStudio(lastExport);
      markCustodyByKey('back', 'studio');
      markCustodyByKey('back', 'moment', { hint: lastExport.recordId.slice(0, 28) });
    } catch (e) {
      alert(e.message);
    } finally {
      btnLaneA.disabled = !lastExport;
    }
  });

  btnImportReply?.addEventListener('click', () => importReplyFile?.click());

  importReplyFile?.addEventListener('change', async () => {
    const file = importReplyFile.files?.[0];
    importReplyFile.value = '';
    if (!file) return;
    try {
      await ingestReplyRaw(await file.text());
    } catch (e) {
      alert(e.message);
    }
  });

  btnMuscle?.addEventListener('click', async () => {
    if (!lastExport || !lastUserLine) return;
    btnMuscle.disabled = true;
    const idx = messages.length - 1;
    const prev = messages[idx]?.role === 'assistant' ? { ...messages[idx] } : null;
    try {
      const data = await mightCompress({ text: lastUserLine, momentId: lastExport.recordId });
      markCustodyByKey('back', 'compress');
      markCustodyByKey('back', 'might_live');
      const compressed = data.compressed_text ?? '';
      if (messages[idx]?.role === 'assistant' && messages[idx].recordId !== 'pending') {
        messages[idx].replyText = compressed;
        saveThread(messages);
        renderThread(messages);
      }
    } catch (e) {
      alert(e.message);
      if (prev && messages[idx]?.role === 'assistant') messages[idx] = prev;
    } finally {
      btnMuscle.disabled = false;
    }
  });

  requestAnimationFrame(() => input.focus());
}
