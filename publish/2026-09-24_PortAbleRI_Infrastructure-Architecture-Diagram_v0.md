# PortAbleRI · Infrastructure architecture diagram v0

**Date:** 2026-09-24  
**Companion:** `publish/2026-09-24_PortAbleRI_Infrastructure-Doctrine_500M-Scenario_v0.md`  
**Use:** Board · Bobby · counsel · engineering — HOST cell vs relay vs muscle

---

## Diagram · Mermaid source of truth

```mermaid
flowchart TB
  subgraph HOST["HOST sovereign cell (each subscriber)"]
    R["HOST (R)"]
    WL["WORLDLINE"]
    P["Prime Gatekeeper"]
    BP["Bounded projection"]
    LOC["Local inference"]
    V["Verify · export"]
    R --> WL
    P --> BP
    BP --> LOC
    WL --> V
  end

  subgraph CENTRAL["PortAbleRI coordination"]
    CDN["CDN · signed releases"]
    ENT["Entitlement"]
    MAN["Trust manifests"]
  end

  subgraph RELAY["Optional sync relay"]
    SYNC["Encrypted blobs · HOST keys"]
  end

  subgraph MUSCLE["Optional third-party muscle"]
    API["Portal / API"]
    DC["Vendor compute"]
    API --> DC
  end

  subgraph FNEC["Optional FNEC · FAM"]
    FAM["FAM map · verify exit 0"]
    PEER["Peer cells"]
    FAM --> PEER
  end

  HOST --> CENTRAL
  HOST --> RELAY
  BP --> MUSCLE
  WL --> FNEC
```

---

## Legend

| Node | Meaning |
|------|---------|
| **HOST** | Legal and moral authority; not a datacenter |
| **WORLDLINE** | Append-only lineage; exportable |
| **BP** | Only authorized state crosses the boundary |
| **CENTRAL** | No sole memory authority |
| **MUSCLE** | Inference may live here; ledger may not |
| **FNEC / FAM** | No valid map → no peer sync · Improve the map |

---

*End diagram extract.*
