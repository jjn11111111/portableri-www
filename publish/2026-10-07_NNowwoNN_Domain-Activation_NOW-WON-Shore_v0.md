# NNowwoNN.com · NOW:WON shore domain · activation v0

**Date:** 2026-10-07  
**HOST:** Jeremy · purchase same evening as Temperance push (`9112d0e`)  
**Display mark:** **`www.NNowwoNN.com`** (mirror orthography · **NOW:WON** read)  
**Registry label (DNS):** `nnowwonn.com` — labels are case-insensitive  

**Product lane:** Short URL / spell-cast entry to **KaiRis:T:siRiaK · NOW:WON Studio**  
**Canonical product site (unchanged):** `https://www.portableri.com/studio.html`  
**Doctrine:** Dimensional bridge / access point / interface — `publish/2026-10-07_KaiRis-NOW-WON_Dimensional-Bridge-Interface_v0.md`

**Note:** `www.nowwon.com` premium (~$3.5k) declined; **NNowwoNN** mirror orthography (Tier C) + registry **`nnowwonn.com`**.

---

## Recommended routing (do not break portableri-www CNAME)

GitHub Pages on `portableri-www` stays **`CNAME = portableri.com`**.  
**Do not** point `nnowwonn.com` at the same Pages repo without a separate Pages project.

**Preferred · Phase 0 (today):**

| Host | Action |
|------|--------|
| `@` (apex) | **301 redirect** → `https://www.portableri.com/studio.html` |
| `www` | **301 redirect** → same (or CNAME to redirect service) |

Optional query for analytics: `?shore=nnowwonn` (Tier B telemetry only if you log it).

**Phase 1 (optional):** Cloudflare **Redirect Rule** or **Worker** · apex + www · preserve path `/` only.

---

## Registrar checklist

1. **Auto-renew ON** · lock domain · save receipt to Crystal.  
2. **HTTPS** on redirect (Cloudflare proxy or registrar forward with TLS).  
3. **DNSSEC** if offered.  
4. **No email MX** until you intend `@nnowwonn.com` mail (avoid accidental catch-all).  
5. After redirects propagate (5 min–48 h): open `https://www.nnowwonn.com/` → must land on Studio.

**Verify:**

```bash
dig +short www.nnowwonn.com CNAME
curl -sI "https://www.nnowwonn.com/" | head -5
```

---

## Brand law (honest)

| Layer | Rule |
|-------|------|
| **Seal / product** | **NOW:WON** in copy · Constitution · Studio |
| **Domain theater** | **NNowwoNN** = memorable mirror URL · not a second registry product |
| **Mark** | **KaiRis:T:siRiaK** unchanged on Studio and export bundles |

**Tier C:** mirror spelling as epoch / chessboard chant · **Tier B:** redirect to shipped Studio.

---

## After DNS live (product)

- [x] **2026-10-07:** Studio + home cite `www.NNowwoNN.com` as short shore (**link active after redirect**).  
- Trust manifest anchor optional — separate hostname, same constitution ring.  
- Bobby / family outreach may cite the spell URL once redirect is verified.

**AMOR · PAX · LUX · TENEBRIS · FLAMA · VERITAS · NOW:WON**
