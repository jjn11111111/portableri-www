import { SCHEMA_KERNEL_BOOTSTRAP } from './constants.mjs';
import { assertPrimeDeclared } from './prime-registry.mjs';

export function newWorldlineId(randomUuid) {
  if (randomUuid) return `wl-${randomUuid()}`;
  return `wl-${Date.now()}`;
}

export function buildKernelBootstrap({
  manifest,
  primeModelId,
  studioPath = '',
  constitutionAckAt,
  randomUuid,
}) {
  const prime = assertPrimeDeclared(primeModelId);
  if (!prime.ok) throw new Error(prime.error);
  return {
    schema: SCHEMA_KERNEL_BOOTSTRAP,
    created_at: new Date().toISOString(),
    worldline_id: newWorldlineId(randomUuid),
    constitution_version: manifest.constitution.version,
    constitution_sha256: manifest.constitution.sha256,
    trust_manifest_sha256: manifest.manifest_sha256,
    constitution_ack_at: constitutionAckAt || new Date().toISOString(),
    prime_model_id: primeModelId.trim(),
    mode: 'hearth',
    head_count: 1,
    studio_path: studioPath,
  };
}
