/**
 * Device filing motion · front → gate → back → named · no animation delay (graphics off)
 */
import { setMemoryCorePhase } from './nw-memory-core.mjs';

/**
 * @template T
 * @param {() => Promise<T>} work · lasher / hold / crystallize on device
 * @param {(phase: 'front'|'gate'|'back'|'crystal'|'done'|'idle') => void} [onPhase]
 * @returns {Promise<T>}
 */
export async function runFilingMotionPipeline(work, onPhase) {
  const step = (p) => {
    setMemoryCorePhase(p);
    onPhase?.(p);
  };
  step('front');
  step('gate');
  const result = await work();
  step('back');
  step('crystal');
  step('done');
  step('idle');
  return result;
}
