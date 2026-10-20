/**
 * EnterFace · moment / reply import · closes Symbiote / Studio loop on NW (no pipe).
 */

import { shorePath } from './nw-shore-origin.mjs';

/** @param {string} raw */
export function parseMomentImport(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error('Not valid JSON.');
  }

  if (data?.schema === 'NW-Moment-Reply-v0') {
    const text = String(data.reply_text ?? '').trim();
    if (!text) throw new Error('Reply file has no reply_text.');
    return {
      kind: 'reply',
      lane: data.lane ?? 'studio',
      parentId: data.parent_moment_id ?? null,
      text,
    };
  }

  if (data?.schema === 'NW-Moment-Export-v0' && data.moment) {
    return {
      kind: 'moment',
      record: data.moment,
      sha256: String(data.content_sha256 ?? ''),
    };
  }

  if (data?.schema === 'PortAbleRI-Lasher-v0' && data.id) {
    return { kind: 'moment', record: data, sha256: '' };
  }

  throw new Error('Unknown moment format. Use NW-Moment-Export-v0 or NW-Moment-Reply-v0.');
}

/**
 * Build reply file HOST can save from Studio/symbiote and re-import here.
 * @param {{ parentId: string, lane: string, replyText: string }} opts
 */
export function buildReplyExportText(opts) {
  const body = {
    schema: 'NW-Moment-Reply-v0',
    exported_at: new Date().toISOString(),
    parent_moment_id: opts.parentId,
    lane: opts.lane,
    reply_text: String(opts.replyText ?? '').trim(),
    shore: shorePath('workbench.html'),
  };
  return JSON.stringify(body, null, 2);
}

/** @param {string} text @param {string} filename */
export function downloadReplyExport(text, filename = 'NW-Moment-Reply-v0.json') {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * @param {string} lane
 * @param {{ record: object, sha256: string }} ctx
 */
export function reflectHtml(lane, text, parentId) {
  const label = lane === 'symbiote' ? 'PARI symbiote' : lane === 'studio' ? 'Local Studio' : 'Reflect lane';
  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/\n/g, '<br>');
  return (
    `<strong>${label}</strong> (imported · HOST allow)<br>` +
    `<span class="msg-body-reflect">${esc(text)}</span>` +
    (parentId ? `<br><span class="msg-meta">Parent moment: ${parentId}</span>` : '')
  );
}
