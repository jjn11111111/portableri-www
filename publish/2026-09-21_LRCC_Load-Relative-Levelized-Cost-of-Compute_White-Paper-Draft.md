# Load Relative Levelized Cost of Compute (LRCC)

**Working white paper · draft v0.1**  
**Date:** 2026-09-21  
**Merged public draft:** `publish/2026-09-23_KaiRis-Systems_Master-White-Paper_Public-Scholarly-Review_v0.1.md` (LRCC + Portable RI + FNEC + review entities)  
**Co-authors:** Bobby Kovach (technoeconomic frame) · John Jeremy (instrument & evidence) · KaiRis Systems (architecture synthesis)  
**Status:** Draft for RIT advancement packet — coefficients Tier B/C until independent lab replication  
**Epistemic tiers:** A = measured on device · B = modeled from A · C = scenario projection  

**Companion artifacts:**  
- `2026-09-16_TRI-bute_Energy-Memory-Storage-Power_Local-Evidence_Crystal.md`  
- `2026-09-18_KaiRis-SHINE_RIT-Academic-Deck_Bobby-Kovach.pptx`  
- `2026-09-16_Studio-vs-Warehouse_Apple-Intel-KaiRis-Patent-Framework_Deep-Dive.md`  

---

## Abstract

The default AI stack treats every agent turn as a full-context round trip to a remote datacenter. **Load Relative Levelized Cost of Compute (LRCC)** levelizes capital, operations, network, and energy per **useful agent-turn** and compares architectures relative to that bubble baseline. Three models are defined: **(a)** current cloud-warehouse default, **(b)** KaiRis federated studios with bounded projection (BP), and **(c)** KaiRis on Apple M2 unified memory with measured network reduction. On Jeremy's MacBook Air M2 8 GB (2026-09-16), order-of-magnitude **~50×** lower network freight anchors model **(c)**. Illustrative **LRCC_rel** bands: **(a)=1.00**, **(b)≈0.25–0.40**, **(c)≈0.05–0.12**. LRCC does not claim KaiRis eliminates the cloud; it quantifies the cost of treating the cloud as the only brain.

---

## 1. Notation and units

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

---

## 2. Core definition

### 2.1 Levelized cost

\[
\text{LRCC} = \frac{\bar{C}_{\text{cap}} + \bar{C}_{\text{ops}} + \bar{C}_{\text{net}} + \bar{C}_{e}}{Q \cdot \eta_{\text{load}}}
\]

**Interpretation:** All hourly cost streams are divided by effective useful throughput. Raising **η_load** (less idle GPU, less duplicate fetch) lowers LRCC even when capital is fixed.

### 2.2 Relative index (bubble baseline)

\[
\text{LRCC}_{\text{rel}} = \frac{\text{LRCC}_{\text{model}}}{\text{LRCC}_{(a)}}
\]

Model **(a)** is the **current AI bubble** — cloud warehouse, full-context round-trip each turn. **LRCC_rel = 1.00** by definition.

---

## 3. Network layer — hallway tax

\[
\bar{C}_{\text{net}} \propto B_{\text{egress}} \cdot p_{\text{egress}} + B_{\text{ingress}} \cdot p_{\text{ingress}}
\]

**Studio vs warehouse (conceptual):** Intel/classic PC architectures pay repeated **PCIe hallways** between CPU, GPU, VRAM, and NIC. Apple Silicon **unified memory (UMA)** removes one class of on-device hallway. KaiRis adds **consent-governed portals** — neither "everything visible" nor "silent dump between rooms."

### 3.1 Measured anchor — model (c)

**Device:** MacBook Air M2, 8 GB UMA · capture 2026-09-16 · Tier A  

| Metric | Value |
|--------|-------|
| Cumulative Wi‑Fi egress (11 d 21 h uptime) | ~9.0 GB |
| Mean egress rate | ~0.035 GB · h⁻¹ |
| Cloud-default agentic estimate | ~44 MB · h⁻¹ (~10× round trips) |
| KaiRis bounded projection estimate | ~0.9 MB · h⁻¹ (~20% context projection) |
| **Ratio B_egress,(c) / B_egress,(a)** | **≈ 1/50** (order-of-magnitude · Tier C inference from Tier A counters + load model) |

**Figure legend — FIG-LRCC-1 (network freight):**  
*Bars: hourly egress payload [MB · h⁻¹]. Blue = model (a) cloud-default agentic; teal = model (c) KaiRis bounded on M2. Error bars: ±2× until multi-session replicated measurement. Source: en0 counters + assistant load model, Sep 2026.*

---

## 4. Three models

### 4.1 Model (a) — Current AI bubble

| Term | Typical dominance |
|------|-------------------|
| **C̄_cap** | Datacenter GPU rent / amortized H100-class capacity |
| **C̄_net** | Full context + tool payloads each turn |
| **C̄_e** | AI-server electricity (Gartner ~175 TWh class 2026) |
| **η_load** | Low under bursty chat; high idle when over-provisioned |

**LRCC_rel = 1.00** (baseline).

### 4.2 Model (b) — KaiRis Systems (federated studios)

Architecture: sovereign local studios · **bounded projection (BP)** · Crystal repair · consent portals · no forced context merge.

| Mechanism | LRCC effect |
|-----------|-------------|
| BP reduces B_egress, B_ingress | **C̄_net** ↓ |
| Local η_load rises (work stays on bench) | denominator ↑ |
| Crystal repair avoids re-fetch loops | **C̄_ops** ↓ class |

**Working band:** **LRCC_rel ≈ 0.25 – 0.40** (Tier B — pending org-scale metering).

**Figure legend — FIG-LRCC-2 (cost stack):**  
*Stacked bars [USD · agent-turn⁻¹]: cap / ops / net / e for models (a)(b)(c). Heights illustrative; (a) normalized to 1.00. Teal segment = network layer. Caption: "KaiRis (b) compresses net+ops; M2 (c) drives net toward floor."*

### 4.3 Model (c) — KaiRis on Apple M2 UMA

Same as (b) plus:

| Local factor | Effect |
|--------------|--------|
| UMA — no VRAM PCIe pilgrimage | Lower on-device **C̄_e** per token class |
| **C̄_net ≈ 0** for local-first turns | Network term at floor |
| 8 GB RAM ceiling | **BP is machine-protection law**, not optional |

**Working band:** **LRCC_rel ≈ 0.05 – 0.12** (Tier B/C — anchored to 50× network ratio).

**Caveat (Tier A on same machine):** 203 GB cumulative swap-ins over 11 days — **disk hallway tax** remains. LRCC_(c) optimizes **network** layer first; RAM pressure is separate TRI-bute dimension.

**Figure legend — FIG-LRCC-3 (LRCC_rel bands):**  
*Horizontal range chart: model labels (a)(b)(c) vs LRCC_rel. Diamond = point estimate; bar = working band. Annotate M2 measurement date and device ID in caption.*

---

## 5. Summary comparison table

| Model | Architecture | LRCC_rel (working) | Dominant cost term |
|-------|--------------|--------------------|--------------------|
| **(a)** | Cloud warehouse · full-context round-trip | **1.00** | **C̄_net + C̄_cap** at DC |
| **(b)** | KaiRis federated studios · BP · Crystal repair | **~0.25 – 0.40** | **C̄_net** reduced · **η_load** ↑ |
| **(c)** | KaiRis on M2 8 GB UMA · measured path | **~0.05 – 0.12** | **C̄_net → floor** · **C̄_e,local** |

---

## 6. Grid-scale scenario (optional appendix — from SHINE deck)

If bounded projection shifts aggregate assistant traffic from cloud-default payload class to local-first class at scale, **avoided datacenter TWh** follow Gartner-mirrored scenarios in `2026-09-16_Layman-RI-Energy-Grid-Water-Impact_Gartner-Mirror.md`:

| Adoption shift | Illustrative 2026 TWh avoided |
|----------------|-------------------------------|
| 5% | ~8.8 |
| 15% | ~26 |
| 25% | ~44 |

**Epistemic note:** Grid figures are **Tier C** scenario math — not measured by KaiRis instrument.

---

## 7. Load profiles (to tighten in v0.2)

| Profile ID | Description | Q [turns · h⁻¹] | Notes |
|------------|-------------|-----------------|-------|
| **P1-chat** | Single-user dialogue | 20–60 | Website / Cursor default |
| **P2-agent** | Tool loops + retrieval | 100–400 | Dominates B_egress |
| **P3-batch** | Offline Crystal / index | 5–15 | Low net · high local storage |

**Next measurement:** replicate FIG-LRCC-1 under P2 on M2 with `nettop` or Activity Monitor session isolation.

---

## 8. Relationship to KaiRis mission (SI · BP · HA)

| Pillar | LRCC connection |
|--------|-----------------|
| **Sovereign intelligence (SI)** | Cost follows sovereignty — local bench owns η_load |
| **Bounded projection (BP)** | Directly reduces B_egress — hallway tax |
| **Human agency (HA)** | Consent gates turns that accrue **C̄_net** and **C̄_e** |

---

## 9. RIT packet checklist

- [x] Equations with labeled units  
- [x] Three models (a)(b)(c)  
- [x] Figure legends (FIG-LRCC-1..3)  
- [x] Measured M2 anchor cited  
- [ ] Independent replication cohort  
- [ ] PDF figure renders for board packet  
- [ ] Bobby coefficient review pass  

---

## 10. References (internal corpus)

1. TRI-bute local evidence Crystal — 2026-09-16  
2. Studio vs Warehouse deep dive — 2026-09-16  
3. SHINE RIT deck + speaker notes — 2026-09-18  
4. KaiRis public website `#lrcc` — 2026-09-21  
5. Lineage & chronology Crystal — `CR-2026-09-21_Lineage_Father-TsiRiaK_Chronology_Deathrobber-Access-Inventory.md`  

---

## Document integrity

**SHA-256:** see companion `.sha256` sidecar.  
**Revision policy:** append v0.2; do not silently change working bands without dated annotation.
