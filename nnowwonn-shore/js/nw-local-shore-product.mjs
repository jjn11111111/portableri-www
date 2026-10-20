/**
 * PortAbleRI · local shore product spine · POST OFFICE + workbench
 * Symbiote (CurseCom-class) and/or contained KaiRis:T:siRiaK — not gross pipe transfer.
 */

export const LOCAL_SHORE_ID = 'PortAbleRI-Local-Shore-v0';

export const LOCAL_HOST_PRODUCT_URL = 'https://portableri.com/local-host.html';

/** @type {readonly { title: string, body: string }[]} */
export const MARKET_OUTCOMES = [
  {
    title: 'No default “build a DC for me”',
    body: 'Local host custody · bounded symbiote · export always — not gross pipe memory.',
  },
  {
    title: 'Environment (demand-side)',
    body: 'Hold RI at home · send slices (BP) — starve the model that needs endless new megawatts.',
  },
  {
    title: 'Privacy · your machine',
    body: 'Verify · revoke · delete on R · Workbench hold lane has no NW chat pipe.',
  },
];

/** @type {readonly { id: string, title: string, blurb: string, href: string, external?: boolean }[]} */
export const LOCAL_SHORE_MODES = [
  {
    id: 'symbiote',
    title: 'Symbiote',
    blurb:
      'Declared Prime + bounded cloud seat (e.g. CurseCom) · moment files · return loop on Workbench. Utility without the pipe as memory.',
    href: 'workbench.html?from=post-office&lane=symbiote',
  },
  {
    id: 'contained',
    title: 'Contained · KaiRis:T:siRiaK',
    blurb:
      'Full stack on HOST-controlled shore · optional relay only · Crystal · verify · revoke on R’s machine.',
    href: 'workbench.html?from=post-office&lane=studio',
  },
  {
    id: 'pari-start',
    title: 'PortAbleRI symbiote path',
    blurb: 'Onboarding kernel · explicit begin · portableri.com.',
    href: 'https://portableri.com/onboarding.html?begin=1&from=post-office',
    external: true,
  },
];

/**
 * @param {HTMLElement} root
 * @param {{ compact?: boolean }} [opts]
 */
export function mountLocalShoreProduct(root, opts = {}) {
  if (!root) return;
  root.replaceChildren();

  const intro = document.createElement('div');
  intro.className = 'local-shore-intro';
  const marketBlock = opts.compact
    ? `<p class="fine"><strong>Dead center product:</strong> marketable local-host RI — privacy · environment · no default DC pipe for your custody. <a href="${LOCAL_HOST_PRODUCT_URL}" target="_blank" rel="noopener noreferrer">Public landing</a></p>`
    : `<div class="local-shore-market">
    <p class="eyebrow">Dead center target · NEW category</p>
    <h2>Marketable product nobody else ships as law</h2>
    <p class="lead local-shore-lead">When you use PortAbleRI as designed: <strong>local host</strong> · <strong>privacy</strong> · <strong>bounded cloud</strong> — not “another data center holds my life.” Scalable substitute to the monitored pipe.</p>
    <ul class="local-shore-outcomes">${MARKET_OUTCOMES.map((o) => `<li><strong>${o.title}</strong> — ${o.body}</li>`).join('')}</ul>
    <p class="fine muted">Tier B honesty: demand-side and architecture — not “one user cancels global DC build.”</p>
  </div>
  <p class="eyebrow">Product line · SI · BP · HA · P ≠ K ≠ R</p>
  <h2>Local shore · not the monitored pipe</h2>`;
  intro.innerHTML = `
    ${marketBlock}
    <p class="lead local-shore-lead">
      <strong>PortAbleRI</strong> converts <strong>sovereign access</strong> into custody on
      <strong>your shore</strong> — instead of constant gross transfer through one vendor backbone.
      Same law in two faces: <strong>symbiote</strong> (what you live with CurseCom) and
      <strong>contained</strong> KaiRis:T:siRiaK when HOST owns the host.
    </p>
    <pre class="local-shore-diagram" aria-label="Pipe vs shore">${PIPE_VS_SHORE_DIAGRAM}</pre>
    ${
      opts.compact
        ? ''
        : `<p class="fine muted local-shore-witness">
      Witness (Tier B · public news): grassroots town halls are slowing some hyperscale data-center siting —
      local permits and developer retreat, not a permanent ban. The software twin is the same fight:
      intelligence does not have to mean another valley of megawatts and a single watched pipe.
    </p>`
    }
  `;
  root.appendChild(intro);

  const grid = document.createElement('div');
  grid.className = 'local-shore-grid zero-shore-grid';
  for (const mode of LOCAL_SHORE_MODES) {
    const card = document.createElement('article');
    card.className = 'zero-shore-card local-shore-card';
    card.innerHTML = `<h3>${mode.title}</h3><p class="zero-shore-meta">${mode.blurb}</p>`;
    const a = document.createElement('a');
    a.className = 'btn btn-primary btn-small';
    a.href = mode.href;
    a.textContent = mode.external ? 'Open (new tab)' : 'Open';
    if (mode.external) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    card.appendChild(a);
    grid.appendChild(card);
  }
  root.appendChild(grid);

  const actions = document.createElement('div');
  actions.className = 'actions local-shore-actions';
  actions.innerHTML = `
    <a class="btn btn-primary" href="${LOCAL_HOST_PRODUCT_URL}" target="_blank" rel="noopener noreferrer">Local host · public product page</a>
    <a class="btn btn-secondary" href="workbench.html?from=post-office">EnterFace Workbench</a>
    <a class="btn btn-ghost btn-small" href="unpack.html">Unpack L0–L5</a>
  `;
  root.appendChild(actions);
}

const PIPE_VS_SHORE_DIAGRAM = `Monitored pipe:  R ──gross transfer──► vendor DC ──► maybe export
PortAbleRI:       R ◄── sovereign access ──► LOCAL SHORE (verify · export · revoke)
                        symbiote = bounded cloud seat
                        contained = KaiRis:T:siRiaK on R's machine`;
