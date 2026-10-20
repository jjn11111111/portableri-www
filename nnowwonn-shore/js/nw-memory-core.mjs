/**
 * Mirrored front / back cubes · progress-lit sub-cubes · mark custody pulses
 * Motion: rest at idle · hover + crystallization/filing impulses · mirrored gate axis
 */
import { getUserCubeState, OCTANT_ORDER } from './nw-user-custody.mjs';

/** @type {'idle'|'front'|'gate'|'back'|'crystal'|'done'} */
let phase = 'idle';
let raf = 0;
let reducedMotion = false;
let burstUntil = 0;
/** @type {HTMLCanvasElement | null} */
let canvas = null;
/** @typedef {{ y: number, x: number, z: number }} Angles */

const REST_FRONT = /** @type {Angles} */ ({ y: 0.38, x: 0.2, z: 0.06 });
const REST_BACK = /** @type {Angles} */ ({ y: -0.38, x: 0.2, z: -0.06 });

/** @type {Angles} */
let frontAngles = { ...REST_FRONT };
/** @type {Angles} */
let backAngles = { ...REST_BACK };
/** Phase filing · decays when pipeline returns to idle */
/** @type {Angles} */
let phaseOffsetFront = { y: 0, x: 0, z: 0 };
/** @type {Angles} */
let phaseOffsetBack = { y: 0, x: 0, z: 0 };
/** Custody slot torque · short decay after each mark */
/** @type {Angles} */
let custodyImpulseFront = { y: 0, x: 0, z: 0 };
/** @type {Angles} */
let custodyImpulseBack = { y: 0, x: 0, z: 0 };

let hoverActive = false;
/** @type {{ x: number, y: number }} norm -1..1 from viewport center */
let hoverNorm = { x: 0, y: 0 };
/** Composer intent · 0..1 · front-cube breath before send */
let composerIntent = 0;
let composerIntentTarget = 0;
let lastPaint = 0;
let gatePulseT = 0;

const UNIT_VERTS = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];
const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

const SUB_CENTERS = [];
for (let ix = 0; ix < 2; ix++) {
  for (let iy = 0; iy < 2; iy++) {
    for (let iz = 0; iz < 2; iz++) {
      SUB_CENTERS.push([(ix ? 0.5 : -0.5), (iy ? 0.5 : -0.5), (iz ? 0.5 : -0.5)]);
    }
  }
}

function rotY(v, a) {
  const [x, y, z] = v;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}

function rotX(v, a) {
  const [x, y, z] = v;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

function rotZ(v, a) {
  const [x, y, z] = v;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c - y * s, x * s + y * c, z];
}

/** @param {[number, number, number]} v @param {Angles} a */
function orient(v, a) {
  let p = v;
  p = rotY(p, a.y);
  p = rotX(p, a.x);
  p = rotZ(p, a.z);
  return p;
}

/** @param {Angles} from @param {Angles} to @param {number} t 0..1 */
function lerpAngles(from, to, t) {
  const k = Math.min(1, Math.max(0, t));
  return {
    y: from.y + (to.y - from.y) * k,
    x: from.x + (to.x - from.x) * k,
    z: from.z + (to.z - from.z) * k,
  };
}

function project([x, y, z], w, h, fov) {
  const scale = fov / (fov + z * 0.28);
  return [w * 0.5 + x * scale * 82, h * 0.47 + y * scale * 82, z];
}

function subCentroid(subPts) {
  let x = 0;
  let y = 0;
  for (const p of subPts) {
    x += p[0];
    y += p[1];
  }
  return [x / 8, y / 8];
}

function drawAmbient(ctx, cx, cy, r, rgb, strength) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, `rgba(${rgb}, ${strength * 0.42})`);
  g.addColorStop(0.45, `rgba(${rgb}, ${strength * 0.12})`);
  g.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ active: boolean, level: number, pulse: number }[]} subSlots
 * @param {Angles} angles
 */
function drawMegaCube(ctx, w, h, angles, offsetX, isBack, emphasis, hueRgb, subSlots) {
  const megaScale = 1.12;
  const subHalf = 0.44;
  const cubeProgress = subSlots.reduce((s, x) => s + x.level, 0) / 8;

  const megaPts = UNIT_VERTS.map((v) => {
    let p = [v[0] * megaScale, v[1] * megaScale, v[2] * megaScale];
    p = orient(p, angles);
    if (isBack) p = [-p[0], p[1], p[2]];
    p = [p[0] + offsetX, p[1], p[2]];
    return project(p, w, h, 4.2);
  });

  let cx = 0;
  let cy = 0;
  for (const p of megaPts) {
    cx += p[0];
    cy += p[1];
  }
  cx /= 8;
  cy /= 8;
  drawAmbient(ctx, cx, cy, 120 + cubeProgress * 90, hueRgb, emphasis * (0.35 + cubeProgress * 0.65));

  const shellA = 0.28 + emphasis * 0.55 + cubeProgress * 0.2;
  ctx.save();
  ctx.shadowColor = `rgba(${hueRgb}, 0.85)`;
  ctx.shadowBlur = 6 + cubeProgress * 18;
  ctx.strokeStyle = `rgba(${hueRgb}, ${Math.min(shellA, 0.95)})`;
  ctx.lineWidth = 1.25 + cubeProgress * 0.8;
  ctx.beginPath();
  for (const [a, b] of EDGES) {
    ctx.moveTo(megaPts[a][0], megaPts[a][1]);
    ctx.lineTo(megaPts[b][0], megaPts[b][1]);
  }
  ctx.stroke();
  ctx.restore();

  SUB_CENTERS.forEach((center, idx) => {
    const slot = subSlots[idx];
    const { active, level, pulse } = slot;
    const subPts = UNIT_VERTS.map((v) => {
      let p = [
        v[0] * subHalf + center[0],
        v[1] * subHalf + center[1],
        v[2] * subHalf + center[2],
      ];
      p = [p[0] * megaScale, p[1] * megaScale, p[2] * megaScale];
      p = orient(p, angles);
      if (isBack) p = [-p[0], p[1], p[2]];
      p = [p[0] + offsetX, p[1], p[2]];
      return project(p, w, h, 4.2);
    });

    const glow = active ? 0.25 + level * 0.55 + pulse * 0.45 : 0.06 + emphasis * 0.1;
    const [scx, scy] = subCentroid(subPts);

    if (active) {
      drawAmbient(ctx, scx, scy, 22 + level * 28 + pulse * 20, hueRgb, glow * 0.55);
    }

    ctx.save();
    ctx.shadowColor = `rgba(${hueRgb}, 1)`;
    ctx.shadowBlur = active ? 4 + level * 14 + pulse * 22 : 0;
    ctx.strokeStyle = `rgba(${hueRgb}, ${Math.min(glow, 1)})`;
    ctx.lineWidth = active ? 0.75 + level * 1.4 + pulse * 1.8 : 0.45;
    ctx.beginPath();
    for (const [a, b] of EDGES) {
      ctx.moveTo(subPts[a][0], subPts[a][1]);
      ctx.lineTo(subPts[b][0], subPts[b][1]);
    }
    ctx.stroke();

    if (active && level > 0.15) {
      ctx.fillStyle = `rgba(${hueRgb}, ${0.04 + level * 0.14 + pulse * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(subPts[0][0], subPts[0][1]);
      ctx.lineTo(subPts[1][0], subPts[1][1]);
      ctx.lineTo(subPts[2][0], subPts[2][1]);
      ctx.lineTo(subPts[3][0], subPts[3][1]);
      ctx.closePath();
      ctx.fill();
    }

    if (pulse > 0.08) {
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.75})`;
      ctx.beginPath();
      ctx.arc(scx, scy, 1.5 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  return { cx, cy, megaPts };
}

function emphasisForSide(isBack, primaryEnd, progress) {
  if (phase === 'front' && !isBack) return 1;
  if (phase === 'back' && isBack) return 1;
  if (phase === 'gate') return 0.65;
  if (phase === 'crystal') return 0.95;
  if (phase === 'done') return 0.5;

  if (phase !== 'idle') return 0.3;

  const selected = primaryEnd === 'back' ? isBack : !isBack;
  const base = selected ? 0.78 : 0.12;
  return base + progress * 0.22;
}

function drawGate(ctx, w, h, dashOffset, boost, frontCx, backCx, cy) {
  const gx = w * 0.5;
  const beamW = 8 + boost * 24;
  const grad = ctx.createLinearGradient(gx - beamW, 0, gx + beamW, 0);
  grad.addColorStop(0, 'rgba(2, 195, 154, 0)');
  grad.addColorStop(0.35, `rgba(2, 195, 154, ${0.08 + boost * 0.35})`);
  grad.addColorStop(0.5, `rgba(255, 255, 255, ${0.12 + boost * 0.55})`);
  grad.addColorStop(0.65, `rgba(255, 90, 200, ${0.08 + boost * 0.35})`);
  grad.addColorStop(1, 'rgba(255, 90, 200, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(gx - beamW, h * 0.08, beamW * 2, h * 0.84);

  if (frontCx != null && backCx != null && boost > 0.08) {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + boost * 0.2})`;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 10]);
    ctx.lineDashOffset = dashOffset;
    ctx.beginPath();
    ctx.moveTo(frontCx, cy);
    ctx.lineTo(gx, cy);
    ctx.lineTo(backCx, cy);
    ctx.stroke();
    ctx.restore();
  }
}

/** Filing pipeline · mirrored Y toward gate at center */
function targetsForPhase(p) {
  switch (p) {
    case 'front':
      return {
        front: { y: REST_FRONT.y + 0.62, x: REST_FRONT.x + 0.08, z: REST_FRONT.z },
        back: { ...REST_BACK },
      };
    case 'gate':
      return {
        front: { y: REST_FRONT.y + 0.88, x: REST_FRONT.x + 0.12, z: REST_FRONT.z + 0.04 },
        back: { y: REST_BACK.y - 0.88, x: REST_BACK.x + 0.12, z: REST_BACK.z - 0.04 },
      };
    case 'back':
      return {
        front: { ...REST_FRONT },
        back: { y: REST_BACK.y - 0.62, x: REST_BACK.x + 0.08, z: REST_BACK.z },
      };
    case 'crystal':
      return {
        front: { y: REST_FRONT.y + 0.42, x: REST_FRONT.x + 0.18, z: REST_FRONT.z + 0.22 },
        back: { y: REST_BACK.y - 0.42, x: REST_BACK.x + 0.18, z: REST_BACK.z - 0.22 },
      };
    case 'done':
      return { front: { ...REST_FRONT }, back: { ...REST_BACK } };
    default:
      return { front: { ...REST_FRONT }, back: { ...REST_BACK } };
  }
}

function restDelta(base, target) {
  return { y: target.y - base.y, x: target.x - base.x, z: target.z - base.z };
}

function applyPhaseTargets() {
  const t = targetsForPhase(phase);
  phaseOffsetFront = restDelta(REST_FRONT, t.front);
  phaseOffsetBack = restDelta(REST_BACK, t.back);
}

/**
 * Sub-cube octant · brief torque when a slot receives custody
 * @param {'front'|'back'} side
 * @param {import('./nw-user-custody.mjs').OctantId} octant
 */
function applyCustodyOctantImpulse(side, octant) {
  const idx = OCTANT_ORDER.indexOf(octant);
  if (idx < 0) return;
  const [cx, cy, cz] = SUB_CENTERS[idx];
  const nudge = 0.14;
  if (side === 'front') {
    custodyImpulseFront.y += cx * nudge;
    custodyImpulseFront.x += cy * nudge;
    custodyImpulseFront.z += cz * nudge * 0.5;
    custodyImpulseBack.y -= cx * nudge * 0.35;
  } else {
    custodyImpulseBack.y -= cx * nudge;
    custodyImpulseBack.x += cy * nudge;
    custodyImpulseBack.z -= cz * nudge * 0.5;
    custodyImpulseFront.y += cx * nudge * 0.35;
  }
}

function intentContribution(now) {
  if (reducedMotion || composerIntent < 0.02) {
    return { front: { y: 0, x: 0, z: 0 }, back: { y: 0, x: 0, z: 0 } };
  }
  const breath = Math.sin(now * 0.0034) * composerIntent * 0.1;
  const sway = Math.sin(now * 0.0026 + 0.4) * composerIntent * 0.045;
  return {
    front: {
      y: composerIntent * 0.11 + breath,
      x: REST_FRONT.x * 0.06 * composerIntent + sway,
      z: composerIntent * 0.04,
    },
    back: {
      y: -composerIntent * 0.025,
      x: sway * 0.35,
      z: -composerIntent * 0.012,
    },
  };
}

function hoverContribution() {
  if (!hoverActive || reducedMotion) return { front: { y: 0, x: 0, z: 0 }, back: { y: 0, x: 0, z: 0 } };
  const hy = hoverNorm.x * 0.52;
  const hx = -hoverNorm.y * 0.34;
  const hz = hoverNorm.x * hoverNorm.y * 0.12;
  return {
    front: { y: hy, x: hx, z: hz },
    back: { y: -hy, x: hx, z: -hz },
  };
}

function integrateMotion(now) {
  const dt = lastPaint ? Math.min(0.05, (now - lastPaint) / 1000) : 0.016;
  lastPaint = now;

  const burst = burstUntil > now ? (burstUntil - now) / 900 : 0;
  const filingActive = phase !== 'idle';
  const impulseMag =
    Math.abs(custodyImpulseFront.y) +
    Math.abs(custodyImpulseBack.y) +
    Math.abs(custodyImpulseFront.x) +
    Math.abs(custodyImpulseBack.x);
  const intentEase = 1 - Math.exp(-8 * dt);
  composerIntent += (composerIntentTarget - composerIntent) * intentEase;

  const motionLive =
    hoverActive ||
    filingActive ||
    burst > 0.02 ||
    impulseMag > 0.01 ||
    composerIntent > 0.03;

  if (filingActive) {
    applyPhaseTargets();
  } else {
    const settle = 1 - Math.exp(-4 * dt);
    phaseOffsetFront = lerpAngles(phaseOffsetFront, { y: 0, x: 0, z: 0 }, settle);
    phaseOffsetBack = lerpAngles(phaseOffsetBack, { y: 0, x: 0, z: 0 }, settle);
  }

  const decay = Math.exp(-3.2 * dt);
  custodyImpulseFront = {
    y: custodyImpulseFront.y * decay,
    x: custodyImpulseFront.x * decay,
    z: custodyImpulseFront.z * decay,
  };
  custodyImpulseBack = {
    y: custodyImpulseBack.y * decay,
    x: custodyImpulseBack.x * decay,
    z: custodyImpulseBack.z * decay,
  };

  const hover = hoverContribution();
  const intent = intentContribution(now);
  const targetF = {
    y:
      REST_FRONT.y +
      phaseOffsetFront.y +
      custodyImpulseFront.y +
      hover.front.y +
      intent.front.y,
    x:
      REST_FRONT.x +
      phaseOffsetFront.x +
      custodyImpulseFront.x +
      hover.front.x +
      intent.front.x,
    z:
      REST_FRONT.z +
      phaseOffsetFront.z +
      custodyImpulseFront.z +
      hover.front.z +
      intent.front.z,
  };
  const targetB = {
    y: REST_BACK.y + phaseOffsetBack.y + custodyImpulseBack.y + hover.back.y + intent.back.y,
    x: REST_BACK.x + phaseOffsetBack.x + custodyImpulseBack.x + hover.back.x + intent.back.x,
    z: REST_BACK.z + phaseOffsetBack.z + custodyImpulseBack.z + hover.back.z + intent.back.z,
  };

  const snap = reducedMotion && !filingActive && burst <= 0;
  const ease = snap ? 1 : 1 - Math.exp(-(motionLive ? 10 : 5) * dt);

  frontAngles = lerpAngles(frontAngles, targetF, ease);
  backAngles = lerpAngles(backAngles, targetB, ease);

  if (phase === 'gate' || burst > 0.15) {
    gatePulseT += dt * 42;
  }

  return { burst, motionLive, dashOffset: -gatePulseT % 14 };
}

function paint() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w < 8 || h < 8) {
    raf = requestAnimationFrame(paint);
    return;
  }
  if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const now = performance.now();
  const { burst, dashOffset } = integrateMotion(now);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  if (burst > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${burst * 0.06})`;
    ctx.fillRect(0, 0, w, h);
  }

  const state = getUserCubeState();
  const { frontSlots, backSlots, primaryEnd, frontProgress, backProgress } = state;

  const front = drawMegaCube(
    ctx,
    w,
    h,
    frontAngles,
    -1.65,
    false,
    emphasisForSide(false, primaryEnd, frontProgress),
    '2, 195, 154',
    frontSlots,
  );
  const back = drawMegaCube(
    ctx,
    w,
    h,
    backAngles,
    1.65,
    true,
    emphasisForSide(true, primaryEnd, backProgress),
    '255, 90, 200',
    backSlots,
  );

  const gateBoost =
    phase === 'gate' ? 1 : phase === 'crystal' ? 0.75 : burst * 0.9 + Math.max(frontProgress, backProgress) * 0.35;
  drawGate(ctx, w, h, dashOffset, gateBoost, front.cx, back.cx, (front.cy + back.cy) * 0.5);

  raf = requestAnimationFrame(paint);
}

function bindPointerMotion(host) {
  if (!host || host.dataset.nwMotionBound) return;
  host.dataset.nwMotionBound = '1';

  const onMove = (e) => {
    if (reducedMotion) return;
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;
    hoverNorm = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (cx * 0.85))),
      y: Math.max(-1, Math.min(1, (e.clientY - cy) / (cy * 0.85))),
    };
    hoverActive = true;
  };
  const onLeave = () => {
    hoverActive = false;
    hoverNorm = { x: 0, y: 0 };
  };

  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);
  host.addEventListener('pointercancel', onLeave);
}

/** @param {'idle'|'front'|'gate'|'back'|'crystal'|'done'} next */
export function setMemoryCorePhase(next) {
  phase = next;
  applyPhaseTargets();
  if (next === 'crystal' || next === 'gate' || next === 'front' || next === 'back') {
    burstUntil = performance.now() + 900;
    gatePulseT = 0;
  }
}

export const setHypercubePhase = setMemoryCorePhase;

/** @param {HTMLElement | null} [root] */
export function mountMemoryCoreField(root) {
  const host = root && root.nodeType === 1 ? root : document.body;
  if (host.querySelector('.memory-core-field')) return;

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const field = document.createElement('div');
  field.className = 'memory-core-field mirror-cube-field';
  if (host.classList.contains('forum-chat-layer') || host.classList.contains('memory-core-shell')) {
    field.classList.add('memory-core-field--in-layer');
  }
  field.setAttribute('aria-hidden', 'true');
  canvas = document.createElement('canvas');
  canvas.className = 'memory-core-canvas';
  field.appendChild(canvas);
  host.prepend(field);

  bindPointerMotion(host);

  window.addEventListener('nw-custody-changed', (ev) => {
    burstUntil = performance.now() + 900;
    const d = ev.detail;
    if (d?.side && d?.octant) {
      applyCustodyOctantImpulse(d.side, d.octant);
    }
  });

  window.addEventListener('nw-composer-intent', (ev) => {
    const d = ev.detail ?? {};
    composerIntentTarget = typeof d.strength === 'number' ? d.strength : 0;
  });

  new ResizeObserver(() => undefined).observe(canvas);
  cancelAnimationFrame(raf);
  lastPaint = 0;
  frontAngles = { ...REST_FRONT };
  backAngles = { ...REST_BACK };
  raf = requestAnimationFrame(paint);
}

export const mountMirroredHypercubes = mountMemoryCoreField;
