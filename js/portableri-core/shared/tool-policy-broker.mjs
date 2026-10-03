import { SCHEMA_TOOL_POLICY_BLOCK } from './constants.mjs';

/** P9 · system policy only — never faux HOST consent. */
export const TOOL_POLICY_ATTRIBUTION = 'system_policy';

const FAUX_HOST_DENY = [
  /\bdenied by the user\b/i,
  /\buser rejected\b/i,
  /\buser denied\b/i,
];

/** Catalogued blocks · Wave B demo (Drive MCP = primary real block). */
export const P9_KNOWN_BLOCKS = {
  DRIVE_MCP_WRITE_BLOCKED: {
    code: 'DRIVE_MCP_WRITE_BLOCKED',
    policy:
      'Cursor MCP write gate or mcpToolGroupPolicy blocked Drive tools — not the same as HOST clicking Deny.',
    fix: 'Settings → MCP → enable writes for KaiRis Drive · Reload Window · or KeyFormHer OAuth mirror.',
    fix_ref: 'processes/KEYFORMHER-Drive-Conduit.md',
    surface: 'mcp',
    conduit: 'keyformher',
  },
  MCP_NEEDS_AUTH: {
    code: 'MCP_NEEDS_AUTH',
    policy: 'MCP namespace requires authentication before tools run.',
    fix: 'Run mcp_auth for the namespace · confirm OAuth · reload MCP in Cursor.',
    fix_ref: 'processes/PRIME-KEYFORMHER-SHORES-INDEX.md',
    surface: 'mcp',
    conduit: '',
  },
  SANDBOX_RESTRICTED: {
    code: 'SANDBOX_RESTRICTED',
    policy: 'Agent sandbox blocked syscall or network the tool required.',
    fix: 'Re-run with required_permissions (network / all) or use HOST CLI outside sandbox.',
    fix_ref: 'processes/CC-SUPREME-PRIME-GATEKEEPER.md',
    surface: 'host',
    conduit: '',
  },
  SMART_MODE_BLOCKED: {
    code: 'SMART_MODE_BLOCKED',
    policy: 'Smart Mode / Auto-review blocked a high-risk action (e.g. push to main).',
    fix: 'Approve through Cursor card · or split action (commit locally · PR) · never label as HOST deny.',
    fix_ref: 'publish/2026-09-23_Portable-RI_Prime-Gatekeeper_Subscriber-Law-FAQ_v0.md',
    surface: 'host',
    conduit: '',
  },
};

export function isFauxHostDenyMessage(message) {
  const m = String(message ?? '');
  return FAUX_HOST_DENY.some((re) => re.test(m));
}

export function buildToolPolicyBlockV1({
  code,
  policy,
  fix,
  surface = 'unknown',
  tool = '',
  namespace = '',
  raw_message = '',
  fix_ref = '',
  conduit = '',
  at,
}) {
  const policyText = String(policy ?? '').trim();
  const fixText = String(fix ?? '').trim();
  if (!policyText || !fixText) {
    throw new Error('P9: policy and fix are required');
  }
  return {
    schema: SCHEMA_TOOL_POLICY_BLOCK,
    at: at ?? new Date().toISOString(),
    code: code || 'TOOL_POLICY_BLOCK',
    policy: policyText,
    fix: fixText,
    fix_ref: String(fix_ref ?? '').trim(),
    conduit: String(conduit ?? '').trim(),
    surface,
    tool: String(tool ?? '').trim(),
    namespace: String(namespace ?? '').trim(),
    attributed_to: TOOL_POLICY_ATTRIBUTION,
    raw_message_excerpt: String(raw_message ?? '').slice(0, 500),
    faux_host_deny_rejected: isFauxHostDenyMessage(raw_message),
  };
}

export function verifyToolPolicyBlockV1(block) {
  if (!block || typeof block !== 'object') return { ok: false, error: 'P9: missing block' };
  if (block.schema !== SCHEMA_TOOL_POLICY_BLOCK) return { ok: false, error: 'P9: schema mismatch' };
  if (!String(block.policy).trim() || !String(block.fix).trim()) {
    return { ok: false, error: 'P9: policy and fix required' };
  }
  if (block.attributed_to !== TOOL_POLICY_ATTRIBUTION) {
    return { ok: false, error: 'P9: attributed_to must be system_policy (not host_consent)' };
  }
  if (!block.at) return { ok: false, error: 'P9: at timestamp required' };
  return { ok: true, code: block.code };
}

/** Map raw tool/MCP stderr or UI copy → governed envelope. */
export function classifyToolBlockFromMessage({ message, surface = 'mcp', tool = '', namespace = '' }) {
  const msg = String(message ?? '');
  if (!msg.trim()) {
    return buildToolPolicyBlockV1({
      code: 'MISSING_MESSAGE',
      policy: 'Tool failed without a message — classify before telling HOST they denied.',
      fix: 'Capture stderr · pass --message to interpret-tool-block',
      surface,
      tool,
      namespace,
      raw_message: msg,
    });
  }

  if (/needsAuth|needs auth|not authenticated|401/i.test(msg)) {
    const k = P9_KNOWN_BLOCKS.MCP_NEEDS_AUTH;
    return buildToolPolicyBlockV1({ ...k, tool, namespace, raw_message: msg });
  }
  if (/sandbox/i.test(msg) && /network|permission|restrict|not allowed/i.test(msg)) {
    const k = P9_KNOWN_BLOCKS.SANDBOX_RESTRICTED;
    return buildToolPolicyBlockV1({ ...k, tool, namespace, raw_message: msg });
  }
  if (/Smart Mode|smart_mode|Auto-review|SmartMode/i.test(msg)) {
    const k = P9_KNOWN_BLOCKS.SMART_MODE_BLOCKED;
    return buildToolPolicyBlockV1({ ...k, tool, namespace, raw_message: msg });
  }

  const driveContext =
    /drive/i.test(tool) || /drive/i.test(namespace) || /drive_create|kairis-drive/i.test(msg);
  if (/mcpToolGroupPolicy|reads\/writes:\s*off/i.test(msg) || (isFauxHostDenyMessage(msg) && driveContext)) {
    const k = P9_KNOWN_BLOCKS.DRIVE_MCP_WRITE_BLOCKED;
    return buildToolPolicyBlockV1({ ...k, tool, namespace, raw_message: msg });
  }
  if (isFauxHostDenyMessage(msg)) {
    return buildToolPolicyBlockV1({
      code: 'MCP_TOOL_POLICY',
      policy:
        'Message reads like “user denied” — in governed sessions this is usually IDE/MCP policy, not HOST refusal.',
      fix: 'Check MCP tool group policy · Reload Window · document block with interpret-tool-block.',
      fix_ref: 'publish/2026-09-23_Portable-RI_Prime-Gatekeeper_Subscriber-Law-FAQ_v0.md',
      surface,
      tool,
      namespace,
      raw_message: msg,
    });
  }

  return buildToolPolicyBlockV1({
    code: 'TOOL_POLICY_BLOCK',
    policy: `Tool blocked: ${msg.slice(0, 240)}`,
    fix: 'Identify surface (MCP · sandbox · git) · apply fix path · log with append-tool-policy if exporting audit.',
    fix_ref: 'processes/PRIME-KEYFORMHER-SHORES-INDEX.md',
    surface,
    tool,
    namespace,
    raw_message: msg,
  });
}

export function knownBlockDemo(code) {
  const key = String(code ?? '').trim().toUpperCase().replace(/-/g, '_');
  const entry = P9_KNOWN_BLOCKS[key];
  if (!entry) return null;
  return buildToolPolicyBlockV1({ ...entry, raw_message: `(demo ${key})` });
}

/** Append-only audit row on P7 bundle (optional field). Caller should verify bundle after. */
export function appendToolPolicyEventToExportBundle(bundle, blockEnvelope) {
  const v = verifyToolPolicyBlockV1(blockEnvelope);
  if (!v.ok) throw new Error(v.error);
  if (!bundle?.kernel_bootstrap?.worldline_id) throw new Error('kernel_bootstrap required');
  const next = structuredClone(bundle);
  if (!Array.isArray(next.tool_policy_log)) next.tool_policy_log = [];
  next.tool_policy_log.push(blockEnvelope);
  next.amended_at = blockEnvelope.at;
  return next;
}
