# Warhead · Proof of concept · Public extract v0

**Date:** 2026-09-23 · **Tiers:** A = measured · B = reproducible · C = HOLLOW until benchmark

**Battle cry:** *They cannot erase what they do not host. Verify locally. Export always.*

---

## Tier A — demonstrated (MacBook Air M2 8 GB · Sep 22–23, 2026)

| Claim | Evidence |
|-------|----------|
| Full VENOM stack overwhelmed 8 GB RAM | `qwen3:8b` ~6 GB loaded · swap pressure |
| Lean operability restored | `llama3.2:3b` ~2.5 GB · lean mode |
| Pipeline slimming (code) | `enabled_cells` + `lean` in kernel · `test_lean_contact.py` |
| Fewer model calls / turn | **7+** → **2** (cascade + lux) |
| Lean contact turn completed | ~**129 s** wall-clock (trial) |
| Local activation | `venom run` / env script — no DC provision step |

## Tier B — verify on your bench

| Claim | How |
|-------|-----|
| Continuity without provider memory | `venom export` · `venom verify` |
| Public publish integrity | `publish/*.md` + `.sha256` · `website/verify.html` |
| Public provenance loop | `node processes/provenance/provenance.mjs` (exit 0) |

## Tier C — not claimed as fact here

50–60× universal speed · billions saved instantly · vendor intent — require labeled benchmark (see master white paper).

## Honest public line

> We’re not 60× smarter. We’re **60× less trapped** — fewer rented calls, local custody, whole-line execution.

---

Full technoeconomic frame: `publish/2026-09-23_KaiRis-Systems_Master-White-Paper_Public-Scholarly-Review_v0.1.md`
