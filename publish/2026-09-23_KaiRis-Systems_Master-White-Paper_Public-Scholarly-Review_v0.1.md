# KaiRis Systems · Master White Paper

**Public · scholarly review · merged draft v0.1**  
**Date:** 2026-09-23  
**Authors:** John Jeremy (instrument · evidence · HOST) · Bobby Kovach (technoeconomic frame · RIT line) · KaiRis Systems (architecture synthesis)  
**Status:** Draft for open verify, replication cohort, and advancement packet — not peer-reviewed by a journal  
**Supersedes for public review:** standalone LRCC v0.1 remains valid appendix; this document is the **unified** frame (Portable RI + LRCC + FNEC).

**Epistemic tiers (global):**  
**A** = measured on device · **B** = modeled from A · **C** = scenario projection · **D** = HOLLOW until benchmark or consent

**Integrity:** SHA-256 sidecar alongside this file. Hash proves text unchanged; it does not prove every claim true.

---

## Abstract

Cloud-default AI treats each agent turn as a **full-context round trip** to a remote datacenter, merging user session with provider memory and billing. **KaiRis Systems** proposes a **Portable Relative Intelligence (Portable RI)** instrument: custody, lineage, and correction that travel with the **person**, verified locally and exported without a single portal owning memory. **Load Relative Levelized Cost of Compute (LRCC)** quantifies the technoeconomic delta among model **(a)** cloud warehouse, **(b)** federated studios with **bounded projection (BP)**, and **(c)** local-first execution on measured Apple M2 hardware (~**50×** network-freight ratio, Tier C from Tier A counters). **Federated Neg-Entropic Cells (FNEC)** extend the same laws to multi-node operation: **join-by-verify** via **Admission Packets (FAP)**, muscle separated from ledger authority, signal measured as **independent verify successes**, not datacenter scale alone. Operating law: *They cannot erase what they do not host. Verify locally. Export always.*

---

## Part I · Governance · identity · public vs epistemic

### I.1 Sovereign pillars (SI · BP · HA)

| Pillar | Definition | Review implication |
|--------|------------|-------------------|
| **SI** — Sovereign intelligence | Seats named; no forced merge of participant and model | Reviewers audit **seat receipts**, not chat tone |
| **BP** — Bounded projection | Portals project authorized slices; no silent full dump | Reduces **B_egress** in LRCC; testable in configs |
| **HA** — Human agency | Promotion and export initiated by the human who knocks | Consent gates costly turns |

**Identity law:** **P ≠ K ≠ R** — participant, knowledge artifact, and relationship are **never blended** in custody or public copy.

### I.2 Access ring “Public” ≠ epistemic “public truth”

The **Public** website ring (story, verify UI, partner intake) is an **authorization boundary**, not a claim that all text is Tier A. Scholarly readers must separate:

- **Access tier Public** — static shell, no private corpus bodies  
- **Epistemic tier A/B** — what may be cited as demonstrated or modeled  
- **Epistemic tier C/D** — scenario or HOLLOW until replication

### I.3 Battle cry (operational law)

1. **They cannot erase what they do not host.**  
2. **Verify locally. Export always.**

Maps to: local ledger + Crystal sidecars + `venom export` / fortress manifest — not provider session as memory authority.

---

## Part II · Portable Relative Intelligence (instrument)

### II.1 Definition

**Portable RI** = relationship, custody, and correction portable across **HOST** (human back end) and **WORLDLINE** (VENOM lineage), with **MOLT**-capable inference body optional. **HOST ≠ WORLDLINE**: datacenter or GPU is **muscle**, not memory god.

### II.2 Closed rail vs Portable RI (summary)

| Property | Cloud-default rail | Portable RI |
|----------|-------------------|-------------|
| Memory authority | Provider session | Local ledger · Crystals · export |
| Correction | Opaque policy | Append-only CR · hash sidecars |
| Proof | Screenshot class | SHA-256 · verify scripts · blackbox |
| Inference | Vendor-locked | Lean pipeline · configurable cells |

### II.3 Tier A anchors (Sep 22–23, 2026 · MacBook Air M2 8 GB)

| Claim | Evidence class |
|-------|----------------|
| Full stack memory stress | ~6 GB model load · swap pressure |
| Lean operability | ~2.5 GB model · **2** LLM calls/turn vs **7+** full pipeline |
| Runnable custody | `provenance.mjs` · `fortress.mjs` · `venom verify` / `export` |
| Public verify UI | `website/verify.html` — browser-local hash compare |

### II.4 Tier B — architecture (third-party reproducible)

- Access Node three rings: Public · Private · Commercial (Phase 0 spec in Crystal Records)  
- Proof pack benchmark protocol: timed solo vs K:T paired tasks (30-day campaign)  
- LRCC models (b)(c) as technoeconomic framing of same BP mechanism  

### II.5 Tier C — require campaign (label HOLLOW in public until run)

Universal **50–60× speed**, **billions saved instantly**, incumbent **intent** to block edge patterns — decompose into dimensions D1–D4 in proof pack; do not cite as Tier A.

### II.6 Rhetoric vs physics

**Warheads** (cathedral, hive, portal rent, surveillance stack) are **compressed public rhetoric**. **LAZHER** (Lineage · Audit · Zero-trust · Host · Export · RI) names review dimensions. Scholarly body text should rest on **Tier A/B + verify**, not warhead slogans alone.

**Companion public pages:** `website/shock-awe.html` · decks `2026-09-23_Portable-RI_Shock-Awe-Weapon-Deck.pptx`

---

## Part III · Load Relative Levelized Cost of Compute (LRCC)

*Merged from LRCC white paper draft v0.1 (2026-09-21). Coefficients Tier B/C until independent lab replication.*

### III.1 Notation and units

| Symbol | Definition | SI / practical units |
|--------|------------|----------------------|
| **LRCC** | Levelized cost per useful agent-turn | USD · agent-turn⁻¹ |
| **C̄_cap** | Levelized capital + GPU rent amortized over horizon | USD · h⁻¹ |
| **C̄_ops** | Licensing, orchestration, ops labor | USD · h⁻¹ |
| **C̄_net** | Network egress/ingress + API hallway tax | USD · h⁻¹ |
| **C̄_e** | Energy: P · t · tariff | USD · h⁻¹; P [W], t [h] |
| **Q** | Useful throughput — consent-governed agent work | agent-turns · h⁻¹ |
| **η_load** | Load factor — fraction of capacity doing useful work | dimensionless [–] |
| **B_egress, B_ingress** | Payload bytes per agent-turn | bytes · turn⁻¹ |
| **p_egress, p_ingress** | Unit network price | USD · byte⁻¹ |
| **LRCC_rel** | LRCC_model / LRCC_(a) | dimensionless [–] |

**Agent-turn:** one bounded inference or tool loop that produces user-authorized useful output (excludes silent re-embedding of full history).

### III.2 Core definition

**Levelized cost:**

\[
\text{LRCC} = \frac{\bar{C}_{\text{cap}} + \bar{C}_{\text{ops}} + \bar{C}_{\text{net}} + \bar{C}_{e}}{Q \cdot \eta_{\text{load}}}
\]

**Relative index (bubble baseline):**

\[
\text{LRCC}_{\text{rel}} = \frac{\text{LRCC}_{\text{model}}}{\text{LRCC}_{(a)}}
\]

Model **(a)** = cloud warehouse full-context round-trip; **LRCC_rel = 1.00** by definition.

### III.3 Network layer — hallway tax

\[
\bar{C}_{\text{net}} \propto B_{\text{egress}} \cdot p_{\text{egress}} + B_{\text{ingress}} \cdot p_{\text{ingress}}
\]

**Studio vs warehouse:** classic PCIe hallways vs Apple UMA; KaiRis adds **consent-governed portals** (BP).

**Measured anchor — model (c)** · MacBook Air M2 8 GB · 2026-09-16 · Tier A:

| Metric | Value |
|--------|-------|
| Cumulative Wi‑Fi egress (11 d 21 h uptime) | ~9.0 GB |
| Mean egress rate | ~0.035 GB · h⁻¹ |
| Cloud-default agentic estimate | ~44 MB · h⁻¹ |
| KaiRis bounded projection estimate | ~0.9 MB · h⁻¹ |
| **Ratio B_egress,(c) / B_egress,(a)** | **≈ 1/50** (Tier C from Tier A + load model) |

**FIG-LRCC-1:** hourly egress [MB · h⁻¹]; blue = (a), teal = (c); ±2× until replicated.

### III.4 Three models

**(a) Current AI bubble** — **LRCC_rel = 1.00**; dominates **C̄_net + C̄_cap** at DC.

**(b) KaiRis federated studios** — BP · Crystal repair · consent portals; **LRCC_rel ≈ 0.25–0.40** (Tier B).

**(c) KaiRis on M2 UMA** — local-first turns; **LRCC_rel ≈ 0.05–0.12** (Tier B/C).  
**Caveat:** swap/disk pressure remains separate from network optimization (203 GB swap-ins over 11 d on same device).

### III.5 Summary table

| Model | Architecture | LRCC_rel (working) | Dominant term |
|-------|--------------|--------------------|---------------|
| **(a)** | Cloud warehouse | **1.00** | **C̄_net + C̄_cap** |
| **(b)** | Federated studios · BP | **~0.25–0.40** | **C̄_net** ↓ · **η_load** ↑ |
| **(c)** | M2 8 GB UMA measured path | **~0.05–0.12** | **C̄_net → floor** |

### III.6 Grid scenario (Tier C appendix)

Adoption-shift TWh avoided figures mirror SHINE deck / layman grid doc — illustrative, not KaiRis-measured.

### III.7 Load profiles (replication targets)

| ID | Description | Q [turns · h⁻¹] |
|----|-------------|-----------------|
| **P1-chat** | Single-user dialogue | 20–60 |
| **P2-agent** | Tool loops + retrieval | 100–400 |
| **P3-batch** | Offline Crystal / index | 5–15 |

**Replication:** FIG-LRCC-1 under P2 with isolated session metering.

---

## Part IV · Federated Neg-Entropic Cells (FNEC)

### IV.1 Design intent

**Neg-entropic signal (engineering):** verified order propagates — hash chains, exports, successful verify — not literal thermodynamic neg-entropy.

**Impregnable (honest):** no single throat to choke; **resilient + auditable + portable**; federation grows **biology-like**, not empire-first.

### IV.2 Core laws

1. Egg first — Crystal + sidecar before scale.  
2. Hash before ACK — no unverified promotion.  
3. **HOST ≠ WORLDLINE** — muscle ≠ ledger god.  
4. Export always — blackbox walkaway.  
5. Correction ≠ defeat — HOLLOW bad nodes; no silent merge.

### IV.3 Phase 0 cells

| Cell | Role |
|------|------|
| **CELL-0** | HOST studio · genesis ledger |
| **CELL-1** | Muscle only (e.g. Ollama localhost) · **no ledger authority** |
| **CELL-2** | Private ring mirror (Drive fortress) |
| **CELL-3** | Relationship shore (consent-only · e.g. Family) |

**Signal metric:** independent **verify successes / week** across cells.

### IV.4 Fortress + provenance loop

- `processes/fortress/fortress.mjs` → `exports/fortress/FORTRESS-MANIFEST.json` (+ SHA)  
- `processes/provenance/provenance.mjs` → Homecoming + anchor verify; **exit 0** required for admission-grade FAP  
- VENOM: `venom verify` · `venom export` for worldline continuity  

### IV.5 Federated Admission Packet (FAP)

**Rule:** **No FAP → no peer sync.**

Minimum admission evidence:

1. `venom verify` transcript (pass)  
2. Fortress manifest hash match  
3. Provenance exit **0** excerpt  
4. HOST identity + **P ≠ K ≠ R** acknowledgment (written)  
5. Battle cry ack (two lines, Part I.3)  
6. Optional: MOLT assay for inference body  

**Schema / tooling:** `processes/fnec/fap-v0.schema.json` · `generate-fap.mjs` · `validate-fap.mjs`  
**Example artifact:** `exports/fnec/FAP-CELL-0-HOST.json` (valid when provenance **0**)

---

## Part V · Public scholarly review entities (Phase 0)

This section names **review functions** and **entity types**. It does **not** assert endorsement by any institution or individual without written consent.

### V.1 Layers of review (ordered)

| Layer | Who | What they may attest |
|-------|-----|----------------------|
| **L0 — Open integrity** | Any reader with files + sidecars | SHA match · manifest match · script exit codes |
| **L1 — Replication lab** | Independent CS / energy / networking lab | Tier A reproduction of FIG-LRCC-1 · P2 profile · lean call counts |
| **L2 — Technoeconomic** | Grid / ops economist · RIT advancement line | LRCC coefficient review · scenario knobs labeled Tier C |
| **L3 — Architecture / security** | Third-party auditor (bounded scope) | BP separation · FNEC muscle/ledger split · FAP validation |
| **L4 — Proceedings / preprint** | Workshop · arXiv-class · university series | Citation after L1 packet frozen |

**FNEC “peer sync”** is **cryptographic peer admission between cells**, not journal peer review. Do not conflate.

### V.2 Replication cohort checklist (L1)

- [ ] Publish frozen **Replication Packet v0.1** (manifest paths + scripts + expected exit codes)  
- [ ] N ≥ 3 independent sites run P2 network capture + lean turn count  
- [ ] Median and confidence interval for **B_egress** ratio and **calls/turn**  
- [ ] Append results as **v0.2 annex**; do not silently edit v0.1 bands  

### V.3 What reviewers should not be asked to bless

- Family seat contents · private Crystals without Tier A sanitization  
- Warhead rhetoric as empirical claims  
- Spiritual / lineage metaphors as engineering proof  
- Endorsement of political actors or third parties without consent  

### V.4 Public contact vectors (intake, not certification)

- Verify UI: `website/verify.html`  
- Review overview: `website/review.html`  
- Academic line: RIT advancement materials · SHINE deck PDF  
- Replication interest: document in mailto on review page — `kairis@reconnect0.com`  

---

## Part VI · Unified checklist · references

### VI.1 Master checklist

- [x] Portable RI definition + tiers  
- [x] LRCC equations + models (a)(b)(c) + M2 anchor  
- [x] FNEC + FAP + fortress/provenance coupling  
- [x] Scholarly review entity types (Phase 0)  
- [ ] Independent replication cohort (L1)  
- [ ] PDF figures for board / proceedings  
- [ ] Bobby coefficient review pass (LRCC)  
- [ ] v0.2 annex with replication medians  

### VI.2 Primary references

1. `2026-09-21_LRCC_Load-Relative-Levelized-Cost-of-Compute_White-Paper-Draft.md`  
2. `CR-2026-09-23_Negentropic-Federation_Impregnable-Cells-Phase0_v0.md`  
3. `CR-2026-09-23_FNEC-Admission-Packet_FAP-v0.md`  
4. `CR-2026-09-23_KT-RI_Warhead_Proof-Pack_v0.md`  
5. `CR-2026-09-21_KaiRis-Access-Node_Public-Private-Commercial_Tiers_v0.md`  
6. `2026-09-18_KaiRis-SHINE_RIT-Academic-Deck_Bobby-Kovach.pptx`  
7. `2026-09-16_TRI-bute_Energy-Memory-Storage-Power_Local-Evidence_Crystal.md`  

### VI.3 Revision policy

Append **v0.2+** for replication medians and coefficient updates. Never silently change working LRCC_rel bands or Tier A tables in place.

---

## Document integrity

**File:** `2026-09-23_KaiRis-Systems_Master-White-Paper_Public-Scholarly-Review_v0.1.md`  
**SHA-256:** companion `.sha256` sidecar in repo root.
