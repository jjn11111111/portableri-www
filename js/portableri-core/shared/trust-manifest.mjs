import { canonicalJson } from './canonical.mjs';
import { SCHEMA_TRUST_MANIFEST } from './constants.mjs';

export async function verifyTrustManifest(manifest, sha256HexAsync) {
  if (!manifest || manifest.schema !== SCHEMA_TRUST_MANIFEST) {
    return { ok: false, error: 'invalid schema' };
  }
  const { manifest_sha256, ...body } = manifest;
  const expected = await sha256HexAsync(canonicalJson(body));
  if (expected !== manifest_sha256) {
    return { ok: false, error: 'manifest_sha256 mismatch', computed: expected };
  }
  return { ok: true, manifest_sha256 };
}
