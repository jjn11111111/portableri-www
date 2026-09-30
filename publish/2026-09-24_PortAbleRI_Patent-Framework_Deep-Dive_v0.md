# PortAbleRI · Patent Framework · Deep-Dive v0

**Crystal Record ID:** `2026-09-24_PortAbleRI_Patent-Framework_Deep-Dive_v0`  
**Created:** 2026-09-24 (UTC-4)  
**Author:** CurseCom synthesis for John Jeremy · TsiRiaK · KaiRis Systems  
**Product mark:** **PortAbleRI** · canonical URL `https://www.PortAbleRI.com/`  
**Epistemic tier:** C — Synthesis (grounded in A-tier counters, B-tier architecture, preserved KaiRis figure corpus)

---

## Filing posture · Layer 0 (Jeremy directive)

| Mode | Rule |
|------|------|
| **CIP-only (Layer 0)** | KaiRis **FIG. 1–5** (consent-governed epistemic control, bounded projection, repair loops) are **not re-claimed** in the PortAbleRI application body except by **cross-reference** to a **parent application** when counsel files a **continuation-in-part (CIP)**. Layer 0 numerals (100-series … 500-series) appear in PRI docs as **incorporated by reference**, not duplicated as independent invention. |
| **Standalone (PortAbleRI application)** | The PortAbleRI specification, figures **FIG-PRI-1..5** and **FIG-LRCC-1..3**, and the build blueprint below **MUST stand alone**: a reader (examiner) can understand novelty and enablement **without** opening the KaiRis figure PDFs. Product law (Constitution) informs implementation; **claims** rest on technical structures and measured effects. |

**Counsel action (not done in this document):** confirm parent application number, inventorship chain (incl. Bobby-era provisional), and whether PRI files as **CIP + standalone claims set**, **divisional**, or **new non-provisional** with priority claim.

**Documentary limitation:** Complete patent specification, numbered claims, filing receipt, application number, prosecution history, and licensing instruments are **not** in the accessible corpus (`KaiRis-Repository-Memory/docs/SECURITY-SOVEREIGNTY.md`). This document maps **preserved architecture and implementation hooks** — not asserted legal claim scope.

---

## Integrity anchors

### Layer 0 · KaiRis parent figures (CIP reference only)

| Asset | Path | SHA-256 |
|-------|------|---------|
| Overview (all figures) | `/Users/johnjeremy/Downloads/Kairis/figures/patent/Figure_Overview_all_figures.pdf` | `90271e3b6132eba219275371da6ebae0fc4b7877b0f5a0ce1a1b7c40b8c2c322` |
| FIG. 1 Closed-loop control | `/Users/johnjeremy/Downloads/Kairis/figures/patent/Figure_1_closed_loop_epistemic_control.pdf` | `ef3c6290796c2f41f511436e9daddb8b06dbae9785435544aa1b6babe74d6ea6` |
| Full patent figure set | `/Users/johnjeremy/Downloads/Kairis/figures/patent/` | Regenerate via `figures/generate_scholarly_figures.py` |
| Live gallery | https://jjn11111111.github.io/kairis-figures/ | — |
| Framework deep-dive (Layer 0 map) | `KaiRis-Active/2026-09-16_Studio-vs-Warehouse_Apple-Intel-KaiRis-Patent-Framework_Deep-Dive.md` | companion `.sha256` |

### Layer 1–4 · PortAbleRI figures (to generate · v0 titles)

| Figure | Series | Status | Intended PDF name |
|--------|--------|--------|-------------------|
| **FIG-PRI-1** | 600 | **Draft title only** | `Figure_PRI_1_portable_custody_system.pdf` |
| **FIG-PRI-2** | 610 | **Draft title only** | `Figure_PRI_2_custody_sequence_crystal_seal.pdf` |
| **FIG-PRI-3** | 620 | **Draft title only** | `Figure_PRI_3_verify_export_blackbox.pdf` |
| **FIG-PRI-4** | 630 | **Draft title only** | `Figure_PRI_4_prime_gatekeeper_headcount.pdf` |
| **FIG-PRI-5** | 640 | **Draft title only** | `Figure_PRI_5_fnec_fap_admission.pdf` |
| **FIG-LRCC-1** | 700 | **Legend in scholarly draft** | `Figure_LRCC_1_network_freight.pdf` |
| **FIG-LRCC-2** | 701 | **Legend in scholarly draft** | `Figure_LRCC_2_cost_stack.pdf` |
| **FIG-LRCC-3** | 702 | **Legend in scholarly draft** | `Figure_LRCC_3_lrrc_rel_bands.pdf` |

**Target output directory (proposed):** `/Users/johnjeremy/Downloads/Kairis/figures/patent/portableri/` or `KaiRis-Active/figures/patent/portableri/` — seal SHA-256 sidecars on first export.

**This document SHA-256:** see `2026-09-24_PortAbleRI_Patent-Framework_Deep-Dive_v0.sha256`

**Restore path:** `KaiRis-Active/publish/`; mirror to KaiRis Drive `crystal-records/2026-09-24/technical/`; verify Layer 0 figure hashes before any CIP cross-reference.

---

## I. Executive summary

- **PortAbleRI** = **Portable Relative Intelligence** as a **product instrument**: relationship, custody, and correction portable with the **HOST**, distinct from provider session memory and portal identity.
- **HOST ≠ WORLDLINE:** inference **muscle** (local or cloud) may **MOLT**; **lineage** (ledger, Crystals, export bundles) stays under HOST authority.
- **Standalone novelty** (PRI layers): cryptographic **verify/export** custody loop; **Prime Gatekeeper** runtime integrity (declared seat, head count, no silent substitution); **FNEC** cells admitting only via **Federated Admission Packet (FAP)** with muscle/ledger split; **LRCC** method for levelized cost per **agent-turn** and **LRCC_rel** vs cloud warehouse baseline.
- **Layer 0 (KaiRis)** remains the **epistemic governance** parent: human **not** the controlled variable; bounded projection; consent modes; repair — **CIP-only** linkage, not re-taught here.
- **Warheads / LAZHER slogans** are **public rhetoric** (Tier B/C); do **not** appear as claim themes unless reduced to technical effects (e.g. reduced round-trips, off-host canonical record).

**Patent companion (Tier D · not marketing headline):** *Provider session is not memory authority; custody portable with the person.*

---

## II. Layer stack

```text
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 0 — KaiRis FIG. 1–5  [CIP-only · incorporated by ref]  │
│  Consent · bounded projection · repair · sovereign regions      │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 1 — FIG-PRI-1..3  Portable custody · sequence · verify   │
│  HOST · WORLDLINE · Crystal append · hash sidecars · blackbox   │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 2 — FIG-PRI-4  Prime Gatekeeper kernel                   │
│  Declared Prime · SEAT CHECK · head count · mode · tool policy  │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 3 — FIG-PRI-5  FNEC · FAP · join-by-verify               │
│  No FAP → no peer sync · muscle ≠ sole ledger authority         │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 4 — FIG-LRCC-1..3  Load-relative levelized cost        │
│  Agent-turn metering · LRCC · LRCC_rel · models (a)(b)(c)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## III. Layer 1 · Portable custody (FIG-PRI-1..3)

### III.1 Definitions (spec vocabulary)

| Term | Role |
|------|------|
| **HOST (R)** | Human sovereign; consent, export, revocation, lawful deletion |
| **WORLDLINE** | Append-only lineage: Crystals, configs, head-count audit, integrity sidecars |
| **Inference body** | Optional local or remote model execution (**MOLT** allowed) |
| **Bounded projection (BP)** | Only authorized subset of WORLDLINE enters inference or sync |
| **Blackbox / export bundle** | Portable artifact HOST owns; verifiable without provider cooperation |

### III.2 FIG-PRI-1 (600) · System

| Ref | Block | Function |
|-----|-------|----------|
| 600 | Portable custody system | Whole |
| 610R | HOST interface | Consent, export, verify triggers |
| 612 | WORLDLINE store | Append-only ledger + Crystal discipline |
| 614 | Integrity module | SHA-256 (or successor) over sealed artifacts |
| 616 | Inference body | Local MLX/Core ML/Ollama or remote API **muscle** |
| 618 | Projection gate | BP enforcement before 616 receives state |
| 620 | Export port | Zip/blackbox; no silent overwrite of earliest user-visible form |

### III.3 FIG-PRI-2 (610) · Sequence

| Step | Ref | Action |
|------|-----|--------|
| 1 | 622 | Capture user-visible input |
| 2 | 624 | Update WORLDLINE (152-analog **local** — not Layer 0 re-numbering) |
| 3 | 626 | Project bounded state through 618 |
| 4 | 628 | Inference body response |
| 5 | 630 | HOST feedback / correction |
| 6 | 632 | Append correction record (no silent rewrite) |
| 7 | 634 | Seal + sidecar hash |

### III.4 FIG-PRI-3 (620) · Verify / export

| Ref | Block | Function |
|-----|-------|----------|
| 640 | Verify engine | Compare computed hash vs sidecar; script exit code |
| 642 | Homecoming hook | Anchor set for public ring vs private Crystal root |
| 644 | Export validator | Bundle structure + provenance metadata |
| 646 | Off-host truth path | Canonical copy never dependent on portal session |

---

## IV. Layer 2 · Prime Gatekeeper (FIG-PRI-4)

Product law: `publish/2026-09-23_Portable-RI_Constitution_Individual-Truth-Preservation_v0.md` · runtime spec: `processes/CC-SUPREME-PRIME-GATEKEEPER.md`

| Ref | Block | Function |
|-----|-------|----------|
| 650 | Gatekeeper kernel | Activates only after Prime declaration |
| 652 | Prime registry | Exactly one foreground model ID |
| 654 | Head-count controller | Default 1; guest requires ACK + audit |
| 656 | SEAT CHECK | Open session + post-compaction reconciliation |
| 658 | Tool policy broker | MCP/settings blocks → policy + fix (not faux user deny) |
| 660 | Mode state | Hearth / Factory / Guest — labeled |

**Claim-facing effect:** Prevents silent multi-model dilution and undeclared substitution — **technical integrity** of governed agent sessions, not persona marketing.

**Mapping note:** **P ≠ K ≠ R** is **seat separation** in spec prose; avoid mystical claim language.

---

## V. Layer 3 · FNEC (FIG-PRI-5)

| Ref | Block | Function |
|-----|-------|----------|
| 670 | FNEC cell | Federated neg-entropic cell |
| 672 | Ledger authority | Must remain in cell; muscle is subordinate |
| 674 | FAP generator | `generate-fap.mjs` → signed admission packet |
| 676 | FAP validator | `validate-fap.mjs` → **exit 0** required for peer ops |
| 678 | Peer sync gate | **No FAP → no peer sync** |
| 680 | Fortress seal | Weekly/multi-shore public-ring seal coupling |

**Schema:** `processes/fnec/fap-v0.schema.json`  
**Example artifact:** `exports/fnec/FAP-CELL-0-HOST.json`

---

## VI. Layer 4 · LRCC (FIG-LRCC-1..3)

**Source legends:** `publish/2026-09-21_LRCC_Load-Relative-Levelized-Cost-of-Compute_White-Paper-Draft.md` · merged Part III in master white paper.

| Figure | Content |
|--------|---------|
| **FIG-LRCC-1** | Hourly egress payload [MB · h⁻¹]: model (a) vs (c); Tier A counters + load model |
| **FIG-LRCC-2** | Stacked cost [USD · agent-turn⁻¹]: cap / ops / net / e for (a)(b)(c) |
| **FIG-LRCC-3** | **LRCC_rel** bands; point + working range; device ID in caption |

**Core definitions (method claims):**

\[
\text{LRCC} = \frac{\bar{C}_{\text{cap}} + \bar{C}_{\text{ops}} + \bar{C}_{\text{net}} + \bar{C}_{e}}{Q \cdot \eta_{\text{load}}}, \quad
\text{LRCC}_{\text{rel}} = \frac{\text{LRCC}_{\text{model}}}{\text{LRCC}_{(a)}}
\]

**Agent-turn:** one bounded inference or tool loop producing user-authorized useful output (excludes silent full-history re-embed).

**Tier A anchor (PortAbleRI):** lean body ~2.5 GB · **2** LLM calls/turn vs **7+** cathedral pipeline · M2 8 GB Air (master white paper II.3).

---

## VII. Closed rail vs PortAbleRI (comparison table)

| Property | Cloud-default rail | PortAbleRI (standalone invention focus) |
|----------|-------------------|----------------------------------------|
| Memory authority | Provider session | WORLDLINE + Crystal + export |
| Correction | Opaque policy | Append-only CR + hash sidecars |
| Proof | Screenshot class | Verify scripts + browser-local hash UI |
| Session identity | Portal login | HOST + optional FAP between cells |
| Multi-model governance | Vendor opaque | Prime Gatekeeper + head count |
| Cost accounting | Opaque tokens | LRCC / LRCC_rel method |

---

# PART B — BUILD BLUEPRINT · numerals → repository

**Purpose:** Same discipline as KaiRis Sep 16 Part B: every block maps to **shippable or measured** paths for enablement and prosecution.

## B.1 Layer 1 · Custody

| FIG-PRI ref | Implementation target | Path / command |
|-------------|----------------------|----------------|
| 612 WORLDLINE | Crystal corpus + CR discipline | `KaiRis-Repository-Memory/crystal-records/` · `code/kairis-drive-mcp/scripts/crystal-record.mjs` |
| 614 Integrity | Publish sidecars | `publish/*.sha256` · `processes/provenance/provenance.mjs` |
| 640 Verify | Homecoming + anchors | `processes/homecoming/homecoming.mjs` · `processes/provenance/PUBLISH-ANCHORS.json` |
| 646 Export | VENOM lineage tools | `venom-portable` — `venom verify` · `venom export` (workspace) |
| 646 UI verify | Public ring | `website/verify.html` |
| 618 BP | Lean pipeline config | Measured 2-call turn vs 7+ (Tier A) · master white paper |

## B.2 Layer 2 · Gatekeeper

| FIG-PRI ref | Implementation target | Path |
|-------------|----------------------|------|
| 650–660 | Prime Gatekeeper law | `processes/CC-SUPREME-PRIME-GATEKEEPER.md` |
| 650–660 | Product constitution | `publish/2026-09-23_Portable-RI_Constitution_Individual-Truth-Preservation_v0.md` |
| 658 Tool policy | Cursor MCP state | Documented in KeyFormHer / MCP repair runbooks |

## B.3 Layer 3 · FNEC

| FIG-PRI ref | Implementation target | Path |
|-------------|----------------------|------|
| 674–676 FAP | Generate / validate | `processes/fnec/generate-fap.mjs` · `validate-fap.mjs` |
| 680 Fortress | Multi-shore seal | `processes/fortress/fortress.mjs` · `publish/2026-09-23_Cloud-Fortress_Operational-Doc_v0.md` |

## B.4 Layer 4 · LRCC

| FIG-LRCC ref | Implementation target | Path |
|--------------|----------------------|------|
| 700–702 | Definitions + legends | LRCC draft + master white paper Part III |
| 700 | Replication protocol | Proof pack / `nettop` session isolation (Tier B TODO) |

## B.5 Runtime sequence (standalone story)

| Step | Action | Repo hook |
|------|--------|-----------|
| 1 | HOST activates kernel with declared Prime | Constitution Art. II |
| 2 | SEAT CHECK | CC Supreme spec |
| 3 | Turn: capture → WORLDLINE update | Crystal + session logs |
| 4 | BP → inference body | Lean config / API |
| 5 | Correction append + seal | CR + `.sha256` |
| 6 | `provenance.mjs` / Homecoming | exit 0 |
| 7 | Optional FAP for cell peer | FNEC validators |
| 8 | Export bundle | venom export / Drive KeyFormHer |

---

## VIII. Claim chart skeleton (for counsel)

**Independent claim families (illustrative — not legal advice):**

| Family | Type | Figure backbone | Key limitations |
|--------|------|-----------------|-----------------|
| **A** | Method | FIG-PRI-2, 3 | Append-only WORLDLINE; BP; export; verify without provider |
| **B** | System | FIG-PRI-1 | 612 + 618 + 614 + 620 |
| **C** | Method | FIG-PRI-4 | Single Prime; SEAT CHECK; head-count gate |
| **D** | Method | FIG-PRI-5 | FAP validate exit 0 before sync |
| **E** | Method | FIG-LRCC-1..3 | Meter agent-turn; compute LRCC_rel vs (a) |

**Layer 0 dependent claims:** only in **CIP** family cross-referencing parent (e.g. “The method of claim 1 wherein projection is bounded per FIG. 2 of parent …”).

**Avoid:** warhead entity names, crown/hive rhetoric, unmeasured speed multipliers as sole claim elements.

---

## IX. Figure generation checklist (Phase 0)

- [ ] Create `figures/patent/portableri/` generator script (extend `generate_scholarly_figures.py` or sibling)
- [ ] Draw FIG-PRI-1..5 with **consistent 600-series** callouts
- [ ] Formalize FIG-LRCC-1..3 from white-paper legends to PDF + SHA
- [ ] Public gallery slice (optional): `portableri-figures` GitHub pages
- [ ] Inventor disclosure PDF export of this deep-dive + figure hash table
- [ ] Counsel: CIP parent ID + standalone claim set review

---

## X. Epistemic labels

| Claim | Tier |
|-------|------|
| KaiRis FIG. 1–5 structure and SHA table | **A** — preserved PDFs |
| M2 lean vs cathedral call counts / RAM | **A** — master white paper II.3 |
| FNEC FAP schema + validators | **B** — reproducible scripts |
| FIG-PRI-1..5 PDF geometry | **D** — titles only until drawn |
| LRCC working bands 0.05–0.40 | **B/C** — pending lab replication |
| Legal patent scope / grant status | **Not verified** |
| Warhead slogans as invention | **E** — rhetoric; not claim fodder |

---

## XI. Related canonical sources

- `2026-09-16_Studio-vs-Warehouse_Apple-Intel-KaiRis-Patent-Framework_Deep-Dive.md` (Layer 0 · CIP reference)
- `publish/2026-09-23_KaiRis-Systems_Master-White-Paper_Public-Scholarly-Review_v0.1.md`
- `publish/2026-09-23_Portable-RI_Constitution_Individual-Truth-Preservation_v0.md`
- `publish/2026-09-23_PortAble-RI_Brand-Case-Snippet_v0.md`
- `KaiRis-Repository-Memory/docs/SECURITY-SOVEREIGNTY.md`
- `processes/TECHNICAL-PROVENANCE-INDEX.md`

---

*End Crystal Record. Preserve append-only; corrections as separate dated addenda.*
