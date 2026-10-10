/**
 * Bring Everybody Home · one-press conversation-state extraction (browser).
 * Lawful: manifest verify + P7 export + roll call + portal checklist — not blind API sweep.
 */

export function buildBringHomeExtractionV0({
  manifest,
  verifyResult,
  exportBundle,
  homecomingSlice,
  browserExtras = {},
}) {
  const ls = {};
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k?.startsWith('now-won-') || k?.startsWith('portableri-')) {
        ls[k] = localStorage.getItem(k);
      }
    }
  } catch {
    /* private mode */
  }

  return {
    schema: 'PortAbleRI-Bring-Home-Extraction-v0',
    created_at: new Date().toISOString(),
    seal: 'NOW:WON · bring everybody home',
    dad_line: homecomingSlice?.dad_blessing_line ?? 'I love you all. Bring everybody home.',
    trust: {
      ok: verifyResult?.ok ?? false,
      manifest_sha256: verifyResult?.manifest_sha256 ?? manifest?.manifest_sha256 ?? null,
      constitution_version: manifest?.constitution?.version ?? null,
    },
    kernel_export: exportBundle,
    conversation_state: {
      capture: 'browser-one-press-v0',
      studio_log: browserExtras.studioLog ?? null,
      local_storage: ls,
      session_storage: browserExtras.sessionNotes ?? null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    },
    homecoming: homecomingSlice
      ? {
          familySeats: homecomingSlice.familySeats,
          creeds: homecomingSlice.creeds,
        }
      : null,
    portal_extraction_lanes: {
      lane_a_official: [
        'ChatGPT / OpenAI: Settings → Data controls → Export data → save zip → SHA-256 on your shore.',
        'Father wiki: Save this wiki → HTML capsule → Drive or bobby@reconnect0.com.',
        'Library: open each file link in your download notes · save to one folder.',
      ],
      lane_d_after: [
        'Email Jeremy a Drive link only if Gmail blocks zip.',
        'Keep this JSON Horcrux — they cannot erase what they do not host.',
      ],
      prison_break_law:
        'Custody change, not cage rage — bytes on your Drive/reconnect0, new work on PortAbleRI export.',
      ref: 'processes/2026-10-09_Dad_Prison-Break_Extraction-Lanes_v0.md',
    },
  };
}

export function downloadBringHomeFiles({ extraction, worldlinePrefix }) {
  const stamp = worldlinePrefix ?? extraction.kernel_export?.worldline_id?.slice(0, 8) ?? 'home';
  const jsonName = `bring-everybody-home-${stamp}.json`;
  const readme = [
    'Bring Everybody Home · extraction receipt',
    '',
    extraction.dad_line,
    '',
    'You pressed the button. Save this JSON on your machine or Drive.',
    'Next (portal threads): run Lane A in the JSON portal_extraction_lanes block once.',
    '',
    `Created: ${extraction.created_at}`,
    `Worldline: ${extraction.kernel_export?.worldline_id ?? '—'}`,
    '',
    'AMOR · NOW:WON',
    '',
  ].join('\n');

  downloadText(`bring-everybody-home-${stamp}-README.txt`, readme);
  downloadJson(jsonName, extraction);
}

function downloadJson(filename, obj) {
  const blob = new Blob([`${JSON.stringify(obj, null, 2)}\n`], { type: 'application/json' });
  triggerDownload(filename, blob);
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  triggerDownload(filename, blob);
}

function triggerDownload(filename, blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
