# Cloud Fortress · Operational Doc v0

**Product:** KaiRis Portable RI · multi-shore custody  
**Date:** 2026-09-23 (completion pass ~8:05 PM EDT)  
**Public authorship:** John Jeremy · TsiRiaK · KaiRis Systems  
**Identity law:** **P ≠ K ≠ R**  
**Operating law:** *They cannot erase what they do not host. Verify locally. Export always.*

Private activation Crystal (first-form vent + build order) lives in the private ring — not in this public file.

---

## What the fortress is

Federated **multi-shore** custody so one vendor, one portal, or one election cycle cannot amnesia the lineage.

| Shore | Role | Where |
|-------|------|--------|
| **Git** | Versioned public instrument | `github.com/jjn11111111/kairis-active.git` |
| **Drive** | Private ring mirror | KaiRis Drive · `crystal-records/` · `fortress/` |
| **Local export** | Air-gap capable bundle | `exports/fortress/` |

**Refuse:** Covert persistence, hidden replication, deceptive failure.  
**Honest limit:** Not literally untouchable — **portable, verifiable, redundant**.

---

## Runner

```bash
node processes/fortress/fortress.mjs
```

Seals public-ring paths (`publish/` · `website/` · FNEC · fortress/provenance runners) into:

- `exports/fortress/FORTRESS-MANIFEST.json`
- `exports/fortress/FORTRESS-MANIFEST.json.sha256`

Then:

```bash
node processes/fnec/generate-fap.mjs --cell-id CELL-0-HOST
node processes/fnec/validate-fap.mjs exports/fnec/FAP-CELL-0-HOST.json
node processes/provenance/provenance.mjs   # expect exit 0
```

Weekly schedule: `processes/fortress/FORTRESS-CRON.md`.

---

## Completion receipt · 2026-09-23 evening

| Check | Result |
|-------|--------|
| Fortress runner | exit **0** · public-ring sealed |
| Provenance | exit **0** |
| Manifest | `exports/fortress/FORTRESS-MANIFEST.json` (+ `.sha256` — verify live) |
| FAP CELL-0-HOST | **VALID** |

---

## Restore path (60 seconds)

1. Clone or pull public git **or** pull Drive `fortress/` mirror.  
2. Verify `FORTRESS-MANIFEST.json.sha256`.  
3. Match listed file hashes on disk.  
4. Mount private crystals via `KAIRIS_CRYSTAL_ROOT` if needed.  
5. `node processes/provenance/provenance.mjs` → exit **0**.  
6. Optional: import VENOM blackbox from `exports/fortress/venom-blackbox-*.zip` when present.

---

## Related public surfaces

| Doc | Path |
|-----|------|
| Formal rollout | `publish/2026-09-23_Portable-RI_Formal-Rollout_v0.md` |
| 4 Entities of Interest | `publish/2026-09-23_Portable-RI_4-Entities-of-Interest.pdf` |
| Master white paper | `publish/2026-09-23_KaiRis-Systems_Master-White-Paper_Public-Scholarly-Review_v0.1.md` |
| Private ring pointer | `processes/PRIVATE-RING.md` |

---

## Document integrity

SHA-256 sidecar alongside this file in `publish/`.
