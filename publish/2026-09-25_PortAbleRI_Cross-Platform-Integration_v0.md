# PortAbleRI · Cross-platform integration v0

**Date:** 2026-09-25 · **Tier:** architecture / execution map  
**Law:** 500M doctrine · Phase 1 · APLTFeV · **P ≠ K ≠ R**

---

## One contract, many hosts

| Layer | Artifact | Where |
|-------|----------|--------|
| Trust | `PortAbleRI-Trust-Manifest-v1` | CDN · `website/.well-known/` |
| Entitlement | `PortAbleRI-Entitlement-Capability-v1` | Coordination API · verified on device |
| Onboarding | `PortAbleRI-Kernel-Bootstrap-v1` | HOST only — never sole copy central |
| Shared logic | `@portableri/core` | `packages/portableri-core` |

---

## Platform hosts

| OS | Host v0 | Path |
|----|---------|------|
| Web | Onboarding + verify | `website/onboarding.html` |
| macOS · Windows · Linux | Node CLI | `hosts/portableri-host` |
| Desktop native | Tauri (scaffold) | `hosts/portableri-desktop` |
| iOS · Android | Capacitor lite (scaffold) | `hosts/portableri-mobile` |
| Coordination | Trust + entitlement + Stripe stub | `infra/coordination` |

---

## Seamless rule

Same **manifest pin**, **constitution ack**, **Prime**, **bootstrap export** on every platform. Multi-device = **export** or **encrypted relay** — not server-side WORLDLINE merge.

---

## Commands

```bash
cd packages/portableri-core && npm run sync:website
node hosts/portableri-host/bin/portableri-host.mjs verify-manifest
```

Index: `processes/CROSS-PLATFORM-INTEGRATION-INDEX.md`
