# Public projections · hollows · graft contract · v0 · 2026-10-08

**Tier A · SOUL REAP ring · P3 bounded projection**

---

## What a hollow is

A **public projection** is a page or route users can open **before** the back end is finished. It must:

1. Say **hollow vs partial vs live** in plain language.
2. Name the **graft id** (stable string, e.g. `soul-reap.drop.ingest`).
3. Point to **coord route** and **module path** implementers will fill.
4. Never pretend bytes or auth succeeded when they did not.

Manifest: `website/.well-known/portableri-public-projections-v0.json`  
Human index: https://www.portableri.com/projections.html

---

## SOUL REAP drop box (partial)

| Slot | v0 | Graft |
|------|-----|--------|
| Local SHA-256 | **Filled** | Browser · Web Crypto |
| RETRACE copy | **Filled** | `soul-reap-drop.html` |
| Metadata beacon | **Filled** | `POST /v1/soul-reap/drop-beacon` → `data/soul-reap-drop-beacon.jsonl` |
| Byte ingest | **Hollow** | `POST /v1/soul-reap/drop-ingest` + object store + gate secret |

**Until byte graft:** Drive upload + link-only mail (`soul-reap-portal.html`).

---

## Adding a hollow (checklist)

1. Append entry to manifest JSON (`id`, `public_path`, `status`, `filled[]`, `graft{}`).
2. Ship HTML or document the external URL (honest disabled UI if needed).
3. Add coord stub or live handler under `infra/coordination/lib/`.
4. Register route in `server.mjs` · log on startup.
5. Publish site · optional crystal in Repository-Memory.

---

## Coord

- `GET /v1/soul-reap/projections` — manifest + drop beacon notice  
- `POST /v1/soul-reap/drop-beacon` — `{ file_name, sha256?, byte_length?, visitor_label? }`

---

**Two cups · one string · hollows are not lies — they are named room for grafts · AMOR · NOW**
