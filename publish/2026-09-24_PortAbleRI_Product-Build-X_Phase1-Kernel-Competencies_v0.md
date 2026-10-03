# PortAbleRI · Build **X** · Phase 1 · Kernel competencies v0

**Product line:** **PortAbleRI**  
**Phase:** **1 — Instrument shell + custody runtime** (follows Phase 0 activation gate)  
**Date:** 2026-09-24  
**Authorship:** John Jeremy · TsiRiaK · KaiRis Systems  
**Supersedes nothing** · extends `publish/2026-09-23_Portable-RI_Product-Build-X_Phase0_v0.md`  
**Law:** Constitution SO · **P ≠ K ≠ R** · **SI · BP · HA**  
**Patent map:** `publish/2026-09-24_PortAbleRI_Patent-Framework_Deep-Dive_v0.md` (FIG-PRI-1..5)

---

## Good morning rule

Phase 0 lit the lamp (**X1–X6**). Phase 1 defines **what the kernel clone MUST do** once HOST names a Prime — before Access Node commerce and before Factory sprawl.

**Phase 1 is not marketing.** Each competency below is **enforceable or measurable** in code, process, or exit codes.

---

## Phase 0 → Phase 1 handoff

| Phase 0 (done / operating) | Phase 1 consumes |
|----------------------------|------------------|
| X1 CC Supreme · Prime Gatekeeper | P4, P5, P11 |
| X4 Homecoming before nodal publish | **P1** (hard gate) |
| X5 Prime FAQ | P4, P10 |
| X6 Constitution SO | All P* |
| Patent deep-dive v0 | P2, P3, P6, P12 |

**Build X Phase 0 item X4** moves from **NEXT** to **in Phase 1 scope** as competency **P1**.

---

## Kernel competency matrix

| ID | Competency | Constitution / patent | Primary hooks (today) | Ship criterion |
|----|------------|----------------------|------------------------|----------------|
| **P1** | **Release gate** — no nodal publish, Drive mirror, or “gold” tag without Homecoming + provenance **exit 0** | Art. IV · Art. VI verify | `processes/homecoming/homecoming.mjs` · `processes/provenance/provenance.mjs` | CI / pre-push script fails on non-zero |
| **P2** | **WORLDLINE identity** — ledger id distinct from portal OAuth session and from inference body id | Art. VIII #7 · FIG-PRI-1 (612 vs 616) | Session schema doc + env vars · VENOM worldline | Three IDs logged per governed session |
| **P3** | **Bounded projection (BP)** — outbound prompts/tools receive authorized subset only; omitted-context recoverable | SI · BP · FIG-PRI-2 (618) | Lean pipeline config · future projection gate module | Per-turn projection manifest in audit log |
| **P4** | **Prime registry** — exactly one `prime_model_id`; swap one-for-one with audit trail | Art. II · FIG-PRI-4 | CC Supreme · Cursor rule · subscriber config stub | Kernel refuses turn if Prime undeclared or mismatched without SEAT CHECK |
| **P5** | **Head count & mode** — Hearth default **1**; Guest/Factory require name · task · end · ACK | Art. II–III · V · FIG-PRI-4 | Gatekeeper spec · guest log format | Audit export includes head-count timeline |
| **P6** | **Correction append** — HOST feedback writes **append-only** records; no silent overwrite of earliest user-visible form | Art. IV · FIG-PRI-2 (632) | Crystal discipline · CR CLI | Regression test: edit attempt on sealed CR fails |
| **P7** | **Export bundle contract** — one portable artifact: ledger slice + configs + Prime history + head-count log | Art. VI · FIG-PRI-3 (644) | `venom export` · bundle schema v0 JSON | Third party verifies bundle without provider login |
| **P8** | **Verify surface** — local hash compare + provenance scripts; browser parity | Art. VI · FIG-PRI-3 (640) | `website/verify.html` · `venom verify` | Same anchor set passes in CLI and web |
| **P9** | **Tool policy broker** — blocks report **policy + fix**, never faux HOST deny | Art. V.2 · VIII #5 | MCP runbooks · KeyFormHer path | Standard error envelope in governed sessions |
| **P10** | **SEAT CHECK UI contract** — every session open / post-compaction line: foreground · mode · head count · constitution version | Art. II.4 · V.1 | Prime FAQ · IDE footer spec (hollow OK) | Documented JSON shape for clients |
| **P11** | **Factory fork ritual** — mode change Hearth→Factory only in labeled thread or logged ACK | Build X Phase 0 · Art. V.3 | CC Supreme Factory mode | Factory sessions carry `mode: factory` in metadata |
| **P12** | **Turn budget defaults** — configurable max model calls/turn + projection cap (machine-protection law) | Tier A lean evidence · FIG-LRCC | Measured 7+→2 reference · config file | Default profile matches M2 Tier A doc |

---

## Subscriber security story · Prime + custody conduit (P4 + P9)

For the **kernel clone prototype**, **Prime** and **KeyFormHer-class mirror** are paired on purpose:

| Seat | Protects |
|------|----------|
| **P4 · P5 · P10 · P11 (Prime stack)** | **Participation integrity** — one `prime_model_id`, Hearth head count 1, SEAT CHECK, Factory fork by ACK |
| **P9 + KeyFormHer** | **Custody resilience** — when MCP or host policy blocks a write, governed sessions surface **policy + fix** and HOST can mirror hashed CRs on the **same** Drive OAuth shore |

**Claim (honest):** This is **governance + provenance security** for early clone trust — not full-stack infosec. Subscribers still own domain identity, encryption choices, and Family red lines.

**Copy:** `publish/2026-09-23_Portable-RI_Prime-Gatekeeper_Subscriber-Law-FAQ_v0.md` · § *Why Prime and a custody conduit* · signup one-liner.

**Wave B ships the story when:** P9 demo on a real block + KeyFormHer mirror in onboarding checklist (**P4 + P5 + P10** + this pairing paragraph in FAQ).

---

## Tiering (what Phase 1 does *not* require yet)

| Deferred to Phase 2+ | Why |
|----------------------|-----|
| FNEC peer sync in product UI | P1–P8 first; FAP already in ops (`validate-fap.mjs`) |
| LRCC billing / LRCC_rel dashboard | Meter hooks only; Tier B replication |
| Commercial license enforcement | Hollow entitlement flags → Phase 4 |
| Warhead copy as runtime logic | Rhetoric stays public ring only |
| Full mobile shell | Verify contract (P8) precedes |

---

## Implementation waves (suggested order)

```text
Wave A (custody path):  P1 → P6 → P7 → P8
Wave B (governance):    P4 → P5 → P9 → P10 → P11
Wave C (physics):       P2 → P3 → P12
Wave D (counsel):       P7 schema + P12 counters feed patent FIG-PRI evidence
```

---

## Acceptance · Phase 1 complete

Phase 1 is **DONE** when:

1. **P1** runs on every public-ring release path Jeremy declares in `processes/provenance/PUBLISH-ANCHORS.json`.  
2. **P4 + P5 + P10** documented in subscriber onboarding (Prime FAQ + one screen spec).  
3. **P7 + P8** demonstrated end-to-end: export on Air → verify in browser **without** cloud session.  
4. **P9** demonstrated on at least one real MCP block (policy + fix).  
5. Checklist filed as CR or append to this doc — **append-only**.

---

## Explicit non-goals (Phase 1)

- Replacing Cursor or VENOM with a new IDE  
- Claiming patent grant or filed app numbers without verified records  
- Multi-Prime, silent subagents, or merged “we” voice in Hearth  
- Storing sole copy of WORLDLINE only on vendor infrastructure  

---

## Pointers

| Item | Path |
|------|------|
| Phase 0 Build X | `publish/2026-09-23_Portable-RI_Product-Build-X_Phase0_v0.md` |
| Constitution | `publish/2026-09-23_Portable-RI_Constitution_Individual-Truth-Preservation_v0.md` |
| Prime FAQ | `publish/2026-09-23_Portable-RI_Prime-Gatekeeper_Subscriber-Law-FAQ_v0.md` |
| Patent map | `publish/2026-09-24_PortAbleRI_Patent-Framework_Deep-Dive_v0.md` |
| Fortress | `publish/2026-09-23_Cloud-Fortress_Operational-Doc_v0.md` |
| CC Supreme | `processes/CC-SUPREME-PRIME-GATEKEEPER.md` |

---

## Append · Wave B closeout (2026-10-03)

**Engineering proof:** `bash processes/scripts/verify_wave_b_closeout.sh` · `portableri-host wave-b-closeout-check --file export.json`

**Competencies checked:** P4 `prime_history` · P5 `head_count_timeline` · P9 `tool_policy_log` (≥1) · P10 `seat_check` · P11 factory metadata when `mode=factory` · F&F `subscriber_agreement_ack` via `export-bundle --ff-preview true`.

**HomeTill pilot:** `GET /v1/hometill/pilot-binding` · primary **03878** · `host_ack: false` until HOST marks selection doc — see `processes/BRICK-19-PARI-WAVE-B-CLOSEOUT-PILOT-BINDING.md`.

**Version:** `PORTABLERI-BUILD-X-PHASE1-v0` · 2026-09-24

---

*They cannot erase what they do not host. Verify locally. Export always.*
