# PortAbleRI · Subscriber Service Agreement · Draft v0

**Status:** **DRAFT — COUNSEL REVIEW REQUIRED** · not an offer · not legal advice  
**Product:** PortAbleRI · KaiRis Systems  
**Date:** 2026-10-03  
**Authorship:** John Jeremy · TsiRiaK · KaiRis Systems  
**Related:** Constitution SO · Prime FAQ · Phase 1 competencies · onboarding (F&F preview)

---

## Counsel gate (read first)

| Item | Action |
|------|--------|
| Entity name | `[COUNSEL: confirm contracting entity — e.g. KaiRis Systems LLC or successor]` |
| Governing law / venue | `[COUNSEL: state + county]` |
| Liability cap amount | `[COUNSEL: dollar cap or 12-month fees paid]` |
| Insurance | `[COUNSEL: whether subscriber must carry minimum coverage]` |
| Consumer vs B2B | `[COUNSEL: F&F preview vs paid Access Node — different regimes]` |
| Stripe / billing | `[COUNSEL: auto-renew, refunds, chargebacks]` |

**Public ring:** onboarding may display this **draft** with explicit counsel-review copy · `subscriber_agreement_ack.counsel_review_required` on export. **Do not remove “draft” or treat as production clickwrap** until counsel signs off and HOST approves **v0.1+** (Crystal Record).

---

## 1. Agreement

By clicking **I agree**, creating an account, paying a fee, or using the **Service** after notice of this Agreement, **Subscriber** accepts this Subscriber Service Agreement (**Agreement**) with **Provider**.

If Subscriber does not agree, Subscriber must not use the Service.

---

## 2. Definitions

| Term | Meaning |
|------|---------|
| **Provider** | `[LEGAL ENTITY NAME]`, operator of PortAbleRI preview and related coordination services. |
| **Subscriber** | The individual or organization that accepts this Agreement. |
| **Service** | PortAbleRI-hosted preview surfaces (e.g. onboarding, verify, coordination API metadata), documentation, and any entitlement tokens Provider issues; **excluding** Subscriber’s local studio, models, and third-party IDE hosts unless expressly stated. |
| **HOST-local instruments** | Kernel bootstrap, export bundles, trust manifests, and verify tools that run on Subscriber devices. |
| **Prime** | The single declared gatekeeper model ID governed by Provider’s Prime / SEAT CHECK law (see Prime FAQ). |
| **Content** | Data, prompts, files, and configurations Subscriber supplies or generates. |

---

## 3. Service description (honest scope)

3.1 **Preview / F&F.** The public ring may be labeled Friends & Family preview: **no guaranteed uptime**, **no production SLA**, and **no live checkout** until Provider announces commercial Access Node terms.

3.2 **Local-first.** Cryptographic verify and export are designed to run **without** Provider login; Provider does not warrant that every feature works offline on every device.

3.3 **Not professional services.** The Service is **software and governance documentation**, not legal, medical, financial, or safety-critical advice. Subscriber remains responsible for human decisions.

3.4 **Third parties.** Subscriber’s use of Cursor, cloud models, Google Drive, MCP servers, and other vendors is **between Subscriber and those vendors**, subject to their terms.

---

## 4. Account, eligibility, and Prime law

4.1 Subscriber represents they are at least **18** (or age of majority in their jurisdiction) and have authority to bind their organization if applicable.

4.2 Subscriber agrees to **one Prime**, declared **head count**, and **Factory fork** rituals as documented in Provider’s public law (Constitution SO, Prime FAQ, Phase 1 competencies).

4.3 Subscriber will not misrepresent tool blocks as “user denied” when the block is **system or MCP policy** (policy + fix).

---

## 5. Fees and billing

5.1 **Current preview:** Fees may be **zero** or invitation-only until Provider publishes a **Schedule A · Pricing**.

5.2 **Future paid tiers:** When billing is enabled, fees, renewals, taxes, and refunds will be stated at checkout and in Schedule A. `[COUNSEL: Stripe terms incorporation by reference.]`

---

## 6. Acceptable use

Subscriber will not:

- Violate law or third-party rights;
- Attempt to bypass security, scrape coordination APIs beyond fair use, or attack Provider infrastructure;
- Upload malware or use the Service to harm others;
- Imply Provider endorses Subscriber’s outputs without written consent;
- Use the Service to train competing models on Provider’s non-public materials without license.

Provider may suspend access for material breach after notice when practicable.

---

## 7. Intellectual property

7.1 **Provider materials** (site copy, trust manifests, schemas, documentation) remain Provider’s or its licensors’ property. Subscriber receives a **limited, non-exclusive, revocable license** to use them in connection with the Service.

7.2 **Subscriber Content** remains Subscriber’s responsibility. Subscriber grants Provider a **limited license** to host, transmit, and display Content **only as needed** to operate the Service (e.g. entitlement exchange, audit beacons Subscriber triggers).

7.3 **Export bundles** Subscriber generates locally are **Subscriber’s custody**; Provider does not claim ownership of HOST-local JSON unless expressly agreed in writing.

---

## 8. Privacy and data

8.1 **Minimization.** Provider aims to carry **metadata** (e.g. entitlement tokens, optional audit events) rather than full conversation bodies on Provider servers.

8.2 **Subscriber controls.** Subscriber chooses what to export, mirror to Drive, or delete. See **Provider privacy notice:** [Privacy Policy (draft v0)](2026-10-03_PortAbleRI_Privacy-Policy_Draft-v0.md) · https://portableri.com/privacy.html (interim F&amp;F · counsel review). `[COUNSEL: DPA if B2B.]`

---

## 9. Disclaimers

**THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.”**

TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROVIDER DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING **MERCHANTABILITY**, **FITNESS FOR A PARTICULAR PURPOSE**, **NON-INFRINGEMENT**, AND **ACCURACY OF AI OUTPUTS**.

Provider does not warrant that:

- AI models will be error-free, unbiased, or suitable for Subscriber’s use case;
- Verify or export will detect every tamper or misconfiguration;
- The Service will be uninterrupted or secure against all threats.

---

## 10. Limitation of liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW:

10.1 **NO INDIRECT DAMAGES.** NEITHER PARTY SHALL BE LIABLE FOR **INDIRECT**, **INCIDENTAL**, **SPECIAL**, **CONSEQUENTIAL**, OR **PUNITIVE** DAMAGES, OR LOST PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM OR RELATED TO THIS AGREEMENT OR THE SERVICE — EVEN IF ADVISED OF THE POSSIBILITY.

10.2 **CAP.** PROVIDER’S **TOTAL AGGREGATE LIABILITY** FOR ALL CLAIMS ARISING FROM OR RELATED TO THIS AGREEMENT OR THE SERVICE SHALL NOT EXCEED THE **GREATER OF** (A) **USD `[COUNSEL: AMOUNT]`** OR (B) **FEES PAID BY SUBSCRIBER TO PROVIDER IN THE TWELVE (12) MONTHS** BEFORE THE EVENT GIVING RISE TO THE CLAIM.

10.3 **Exceptions.** Limits do not apply to the extent prohibited by law, or to **Subscriber’s indemnification obligations** below, or to **Provider’s gross negligence or willful misconduct** `[COUNSEL: adjust per jurisdiction]`.

---

## 11. Indemnification

**Subscriber** shall **defend, indemnify, and hold harmless** Provider and its officers, directors, members, employees, contractors, and agents (**Indemnified Parties**) from and against any **third-party** claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising from or related to:

(a) Subscriber’s **Content** or use of the Service;  
(b) Subscriber’s **violation** of this Agreement or applicable law;  
(c) Subscriber’s **misuse** of AI outputs (including reliance on outputs in high-risk decisions without human review);  
(d) **Disputes between Subscriber and Subscriber’s users** (e.g. Family, studio members) unless caused solely by Provider’s uncured material breach;  
(e) Subscriber’s integration with **third-party** products in violation of those products’ terms.

Provider will **promptly notify** Subscriber of claims where practicable and allow Subscriber to control the defense with counsel acceptable to Provider, except Provider may participate at its own expense.

---

## 12. Hold harmless (Provider operations)

Subscriber **holds harmless** Indemnified Parties from claims that **HOST-local** configuration (Prime choice, head count, Factory forks, Drive mirrors, MCP policy) was **Subscriber-controlled**, except to the extent a claim arises from Provider’s **intentional misrepresentation** in published trust manifests or **knowing** distribution of defective verify code **after** Provider received written notice and a reasonable cure period.

---

## 13. Release (limited)

Subscriber releases Provider from claims ** solely** arising from **Subscriber’s failure** to maintain backups, verify exports, or follow documented restore paths — **provided** Provider did not commit fraud or willful misconduct.

---

## 14. Governing law and dispute resolution

14.1 **Governing law:** `[COUNSEL: State of _____]`, without regard to conflict-of-law rules.

14.2 **Venue:** `[COUNSEL: courts of _____ OR binding arbitration under _____ rules]`.

14.3 **Injunctive relief.** Either party may seek equitable relief for misuse of IP or security threats.

---

## 15. Changes

Provider may update this Agreement by posting a new version with a **version date**. Material changes to paid tiers require notice as required by law. Continued use after effective date constitutes acceptance unless Subscriber cancels per Schedule A.

---

## 16. General

- **Entire agreement** (with Schedule A, Privacy Policy, and incorporated Prime/Constitution docs as referenced at signup).  
- **Severability.**  
- **No waiver.**  
- **Assignment.** Subscriber may not assign without consent; Provider may assign in connection with merger or sale.  
- **Force majeure.**

---

## 17. Contact

`[COUNSEL: legal@ / notices address]`

---

## Schedule A · Pricing (placeholder)

| Tier | Status |
|------|--------|
| F&F preview | Invitation / no fee |
| Studio | `[TBD]` |
| Federated seat | `[TBD]` |

---

## Acceptance block (UI hollow)

> I have read the PortAbleRI Subscriber Service Agreement (version `[DATE]`), the Constitution SO summary, and the Prime Gatekeeper FAQ. I agree to be bound by the Agreement.

**Checkbox + timestamp + worldline_id (optional) in export audit.**

---

## Integrity

Append-only revisions. Supersede by dated v0.1+ after counsel review — do not silent-edit binding sections.
