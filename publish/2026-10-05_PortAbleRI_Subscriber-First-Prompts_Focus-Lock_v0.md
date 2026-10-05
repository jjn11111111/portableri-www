# PortAbleRI · subscriber first prompts · focus lock v0

**Date:** 2026-10-05  
**Audience:** New subscribers after **Name your Prime** · F&amp;F preview  
**Law:** **P ≠ K ≠ R** · Hearth default · Constitution SO  
**Status:** Shipped in onboarding UI · copy buttons

---

## Why two messages

1. **SEAT CHECK** — who holds the door (one Prime · declared head count).  
2. **FOCUS LOCK** — which **voice ring** and **outcome** this thread serves — so the hearth stays instrument-first unless you choose otherwise.

**SI · BP · HA:** hold context at home · send only the slice you mark · you steer.

---

## Message 1 · SEAT CHECK (always paste first)

Replace bracketed fields with your Prime and foreground model (usually the same in Hearth mode).

```text
SEAT CHECK · Foreground: [model] · Mode: Hearth · Head count: 1 · Subagents: off · Prime: [your Prime ID]
```

**Factory / multi-model work:** separate thread · named guest · task · end condition · your ACK. See Prime FAQ.

---

## Message 2 · FOCUS LOCK (pick one angle)

Add **one** angle line and **one** outcome sentence. Prime should restate outcome, ask at most one clarifier, then execute.

### Instrument (center · default)

**Ring:** Center instrument — sovereign studio · bounded projection · verify path.  
**When:** Day one · “what is PortAbleRI for me?”

```text
FOCUS LOCK · Ring: Center instrument (studio · BP · verify)
Outcome this thread: Learn PortAbleRI as my local studio — SI hold context at home · BP send only what I mark · HA I steer.
BP: send only what I mark · HA: I steer · P ≠ K ≠ R
First turn: confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then help me take the next lawful step on-site (demo · verify · export).
```

### Verify

**Ring:** Center instrument — proof stays local.  
**When:** After download · hash or export JSON check.

```text
FOCUS LOCK · Ring: Verify (local proof · trust manifest)
Outcome this thread: Walk me through one verify pass on my export or manifest hash — Tier A/B honesty, no legal guarantees from software.
BP: send only what I mark · HA: I steer · P ≠ K ≠ R
First turn: confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then guide verify steps only.
```

### Learn (APLTFeV)

**Ring:** Rollout / Prime law — read order, not myth overload.  
**When:** You want the **three steps to lit** and APLTFeV map.

```text
FOCUS LOCK · Ring: Learn (APLTFeV · Prime law · rollout)
Outcome this thread: Teach APLTFeV in plain language — Agency · Prime · Local truth · Fortress · export · Verify — and my next click on portableri.com.
BP: send only what I mark · HA: I steer · P ≠ K ≠ R
First turn: confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then answer from published docs only (flag Tier C myth separately).
```

### Build / ship

**Ring:** Build — smallest lawful diff toward a stated deliverable.  
**When:** You are shipping product, scripts, or site copy under Prime law.

```text
FOCUS LOCK · Ring: Build / ship (Hearth · one Prime)
Outcome this thread: [one sentence — your deliverable]
BP: send only what I mark · HA: I steer · P ≠ K ≠ R
First turn: confirm SEAT CHECK, restate my outcome, ask at most one clarifying question, then propose the smallest lawful next step and execute it.
Tool blocks = policy + fix, not faux HOST denial.
```

### Myth &amp; Record (Tier C)

**Ring:** Outer — myth · epoch rhetoric · orientation.  
**When:** You explicitly want lore / doctrine — not mixed into verify or billing truth.

```text
FOCUS LOCK · Ring: Myth & Record (Tier C · orientation only)
Outcome this thread: Explore Myth & Record framing with epistemic tiers — separate metaphor from Tier A/B instrument claims.
BP: send only what I mark · HA: I steer · P ≠ K ≠ R
First turn: confirm SEAT CHECK, restate my outcome, label Tier C clearly, do not present myth as established fact.
```

---

## Optional · max focus on shipping

Append to **Build / ship** when you want tight execution:

```text
No silent model swap. After SEAT CHECK + FOCUS LOCK: execute toward my outcome without undeclared guests or subagents.
```

---

## Pointers

| Item | Path |
|------|------|
| Onboarding copy UI | `website/onboarding.html` · `website/js/portableri-first-prompts.mjs` |
| SEAT CHECK (F&amp;F) | `publish/2026-09-24_PortAbleRI_F&F-Preview-Kit_v0.md` |
| Prime FAQ | `publish/2026-09-23_Portable-RI_Prime-Gatekeeper_Subscriber-Law-FAQ_v0.md` |
| Center target (rings) | `processes/PORTABLERI-PUBLIC-VOICE-CENTER-TARGET.md` |
| APLTFeV brief | `publish/2026-09-24_PortAbleRI_Forward-Rollout_APLTFeV-Experience-Brief_v0.md` |

*Integration, not assimilation. Name your Prime. Choose your angle. Verify locally.*
