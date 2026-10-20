/**
 * Device filing motion · front → gate → (work) → back → named · mirrored cubes
 */
import { setMemoryCorePhase } from './nw-memory-core.mjs';

const PHASE_MS = 420;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * @template T
 * @param {() => Promise<T>} work · lasher / hold / crystallize on device
 * @param {(phase: 'front'|'gate'|'back'|'crystal'|'done'|'idle') => void} [onPhase]
 * @returns {Promise<T>}
 */
export async function runFilingMotionPipeline(work, onPhase) {
  const step = async (p) => {
    setMemoryCorePhase(p);
    onPhase?.(p);
  };
  await step('front');
  await sleep(PHASE_MS * 0.7);
  await step('gate');
  const result = await work();
  await step('back');
  await sleep(PHASE_MS);
  await step('crystal');
  await sleep(PHASE_MS);
  await step('done');
  await sleep(320);
  await step('idle');
  return result;
}
