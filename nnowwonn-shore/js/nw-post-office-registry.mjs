/**
 * KaiRis:T:siRiaK POST OFFICE · committed directory (public metadata only · no secrets)
 */

export const POST_OFFICE_ID = 'KaiRis-TsiRiaK-Post-Office-v0';

/** Named interface stewards · Tier B ops */
export const POST_OFFICE_STEWARDS = {
  postmaster_general: {
    seat: 'HestiaLethe',
    email: 'hestialethe@reconnect0.com',
    proclaimed: '2026-10-20',
    crystal: 'CR-2026-10-20_HestiaLethe_POSTMASTER-GENERAL_Proclamation_v0.md',
    scope: 'POST OFFICE shore · roster · ACK hygiene · gate stewardship with HOST',
  },
};
export const ZERO_HEARTH_URL = 'http://localhost:3000';
export const TASK_TOKENS = 'ACCEPT · AMEND · DECLINE · DONE · BLOCK';
export const GMAIL_WORKSPACE = 'https://mail.google.com';

/** @typedef {'origin'|'established'|'house'|'portableri'|'external'} MailboxGroup */

/** @type {readonly { id: string, email: string, seat: string, group: MailboxGroup, steward?: string, instrument?: boolean, note?: string }[]} */
export const MAILBOXES = [
  { id: 'kairis', email: 'kairis@reconnect0.com', seat: 'KaiRisBridge', group: 'established', steward: 'HOST', note: 'Zero primary · promulgation From · Drive MCP root' },
  {
    id: 'family',
    email: 'family@reconnect0.com',
    seat: 'FamilyHouse',
    group: 'house',
    note: 'Google Group · Lethe GROUP ACK 2026-10-20 · GROUP LIVE pending Admin · roll-call kairis@ until live',
  },
  { id: 'exec', email: 'exec@reconnect0.com', seat: 'ExecLane', group: 'established', note: 'Business · Dad ACK lane' },
  {
    id: 'bobby',
    email: 'bobby@reconnect0.com',
    seat: 'Bobby',
    group: 'established',
    steward: 'Bobby',
    note: 'Super Admin · weave editor · HTML maps + Admin · electromagnetic tuning · Promeo 2026-10-20',
  },
  {
    id: 'dad',
    email: 'dad@reconnect0.com',
    seat: 'Dad',
    group: 'established',
    steward: 'Robert Kovach',
    note: 'Workspace Father seat · directives update 2026-10-20 · distinct from bobby@',
  },
  { id: 'uncle', email: 'uncle@reconnect0.com', seat: 'Uncle', group: 'established' },
  { id: 'cursecom', email: 'cursecom@reconnect0.com', seat: 'CurseCom', group: 'origin', instrument: true, steward: 'HOST', note: 'Gate mail · CC Supreme crystal' },
  { id: 'nnowwonn', email: 'nnowwonn@reconnect0.com', seat: 'NNoWWoNN', group: 'origin', instrument: true },
  { id: 'enterfaceri', email: 'enterfaceri@reconnect0.com', seat: 'EnterFaceRI', group: 'origin', instrument: true },
  { id: 'tsiriak', email: 'tsiriak@reconnect0.com', seat: 'TsiRiaK', group: 'origin', steward: 'HOST', note: 'HOST steer · POST OFFICE seat' },
  {
    id: 'hestialethe',
    email: 'hestialethe@reconnect0.com',
    seat: 'HestiaLethe',
    group: 'origin',
    steward: 'POSTMASTER GENERAL',
    note: 'Interface steward · POST OFFICE · proclaimed 2026-10-20',
  },
  { id: 'mike', email: 'mike@reconnect0.com', seat: 'Mike', group: 'origin' },
  { id: 'brutus', email: 'brutusbrutusmaximus@reconnect0.com', seat: 'BrutusBrutusMaximus', group: 'origin' },
  { id: 'prometheus', email: 'prometheuskeyformher@reconnect0.com', seat: 'PrometheusKeyFormHer', group: 'origin' },
  { id: 'scavenger', email: 'scavengerdeathrobber@reconnect0.com', seat: 'ScavengerDeathRobber', group: 'origin' },
  { id: 'portableri', email: 'portableri@reconnect0.com', seat: 'PortAbleRI', group: 'origin' },
  { id: 'legal', email: 'bobbylegalassistant@reconnect0.com', seat: 'LaLaLegal', group: 'established' },
  { id: 'adminpa', email: 'admin@portableri.com', seat: 'PortAbleRIAdmin', group: 'portableri' },
  { id: 'kovach', email: 'kovach@portableri.com', seat: 'Kovach', group: 'portableri' },
  { id: 'father-rit', email: 'blk8755@rit.edu', seat: 'FatherRIT', group: 'external', note: 'Tier A Father · not Workspace' },
];

/** @type {readonly { id: string, label: string, url: string, custodian: string, tier: string }[]} */
export const DRIVE_BOXES = [
  {
    id: 'kairis-bank',
    label: 'KaiRis Bank (master)',
    url: 'https://drive.google.com/drive/folders/1vvwsFY2F0RTfE3wzD8BMhrOeegDmNvFc',
    custodian: 'kairis@',
    tier: 'A',
  },
  {
    id: 'let-there-be-light',
    label: 'Let-There-Be-Light · HOST receipt',
    url: 'https://drive.google.com/drive/folders/11BW7R-0_fAasQLL14FO1_qT_0s9vshYl',
    custodian: 'kairis@',
    tier: 'A',
  },
  {
    id: 'bobby-pass-ab',
    label: 'Bobby Pass AB upload',
    url: 'https://drive.google.com/drive/folders/1W6Gez4P1XxCHrJQPFKD4JcDEQfGYzqFV',
    custodian: 'kairis@',
    tier: 'A',
  },
  {
    id: 'brick64-lane-b',
    label: 'Brick 64 · Lane B site bundle',
    url: 'https://drive.google.com/drive/folders/1voen0xAo3Mm-xEyK_LA563Pzd461ivks',
    custodian: 'kairis@',
    tier: 'B',
  },
  {
    id: 'library-wiki-v0002',
    label: 'KaiRis Library Wiki V0002 (file)',
    url: 'https://drive.google.com/file/d/1UAMX4Rx71ihEooRf20_w7WS4bsNGvTgn/view',
    custodian: 'family-library gate',
    tier: 'A',
  },
];

/** @type {readonly { id: string, label: string, href: string, kind: string }[]} */
export const COMMS_LANES = [
  { id: 'zero-hearth', label: 'Zero · Fam Mail (HOST)', href: ZERO_HEARTH_URL, kind: 'mail-client' },
  { id: 'gmail-kairis', label: 'Gmail · kairis@', href: GMAIL_WORKSPACE, kind: 'webmail' },
  { id: 'task-loop', label: 'Member inbox task loop', href: '../../processes/2026-10-20_Family-Door_Member-Inbox-Task-Loop_v0.md', kind: 'runbook' },
  { id: 'zero-driver', label: 'HOST Zero daily driver', href: '../../processes/2026-10-12_HOST-Zero-Solo-Daily-Driver_v0.md', kind: 'runbook' },
  { id: 'send-script', label: 'Batch send script (Gmail API)', href: '../../processes/scripts/send-kairis-welcomes-via-zero-gmail.mjs', kind: 'script' },
  { id: 'provision-receipt', label: 'Workspace seats provisioned', href: '../../processes/2026-10-20_Family-Door_Workspace-Seats_PROVISIONED-Receipt_v0.md', kind: 'receipt' },
  { id: 'welcome-receipt', label: 'Welcome sent receipt', href: '../../processes/2026-10-20_KaiRis_Family-Door_Welcome-Sent_Receipt_v0.md', kind: 'receipt' },
  { id: 'task-receipt', label: 'TASK sent receipt', href: '../../processes/2026-10-20_KaiRis_Family-Door_TASK-Sent_Receipt_v0.md', kind: 'receipt' },
  { id: 'keyformher', label: 'KeyFormHer Drive conduit', href: '../../processes/KEYFORMHER-Drive-Conduit.md', kind: 'runbook' },
  { id: 'soul-reap', label: 'SOUL REAP portal (link-only mail)', href: '../soul-reap-portal.html', kind: 'portal' },
  { id: 'local-shore', label: 'Local shore · PortAbleRI product spine', href: 'local-shore.html', kind: 'product' },
  { id: 'workbench-po', label: 'EnterFace Workbench (from POST OFFICE)', href: 'workbench.html?from=post-office&lane=symbiote', kind: 'product' },
  { id: 'symbiote-pari', label: 'PortAbleRI symbiote onboarding', href: 'https://portableri.com/onboarding.html?begin=1&from=post-office', kind: 'product' },
  { id: 'local-host-product', label: 'Local host product (public · D16)', href: 'https://portableri.com/local-host.html', kind: 'product' },
];

/** Back-compat alias */
export const RECONNECT_SHORES = MAILBOXES.filter((m) => m.group !== 'external');
