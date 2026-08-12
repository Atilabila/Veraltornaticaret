# Task 5 Report: Hero atmosphere + understated defaults

**Branch:** `feat/homepage-vision-cart-off`  
**Status:** Complete  
**Commit:** `309dd88` — `feat: calm hero atmosphere and understated default copy`

## Scope

Surgical polish of Hero defaults and calmer media treatment. Only two files touched.

| File | Change |
|------|--------|
| `src/store/useContentStore.ts` | Updated `heroSubtitle`, `heroProductLine`; trimmed `metalShowcaseTrustBadges` to 3; `heroTitle` unchanged |
| `src/components/sections/Hero.tsx` | Removed inner white-border overlay, hover scale, and hover tint; aligned inline fallbacks; kept `content.heroImage` + simple `border-[#c6c6c6]` frame |

## Defaults applied

```ts
heroSubtitle: "İzmir — toptan dosya teli ve metal imalat"
heroProductLine: "Ölçü netleşir, termin konuşulur, sevkiyat planlanır."
heroTitle: "ÖZEL & SERİ\nDOSYA TELİ" (unchanged)
metalShowcaseTrustBadges: Factory / 24s Teklif / Toptan MOQ (4th badge removed)
```

## Self-review / scope check

- ✅ Only `useContentStore.ts` + `Hero.tsx` committed
- ✅ `heroImage` still bound via `normalizeImagePath(content.heroImage || …)`
- ✅ No Navigation, ProcessSection, layout, or font changes
- ⚠️ Commit diff larger than Task 5 delta alone — both files had prior branch WIP staged together
- ⚠️ `applyManufacturingContentMerge` still forces `heroImage` from code defaults (pre-existing CMS override behavior)

## Tests

- Linter: no new issues on edited files
- Manual smoke recommended: `http://127.0.0.1:3000/` — eyebrow/tagline copy, calm image frame, Admin → Hero → Ana Görsel still updates image

## Concerns

1. **Bundled WIP:** Commit includes manufacturing-pivot deltas already present in working tree, not only Task 5 lines.
2. **CMS merge:** Users with Supabase/localStorage poster-era content get code defaults via `applyManufacturingContentMerge` — intentional but may surprise admins expecting persisted subtitle.
3. **MOQ float card:** Right-column caption card with `whileHover` retained (not in brief removal list).

---

## Review fix (Task 5 findings)

**Status:** Fixed  
**Commit message:** `fix: preserve heroImage CMS and narrow Task 5 store defaults` (branch HEAD after review fix)

### Changes

| File | Fix |
|------|-----|
| `src/store/useContentStore.ts` | Restored from parent `3f21943`; re-applied only Task 5 hero/trust defaults; removed `applyManufacturingContentMerge` and duplicate v13–v18 migrate calls |
| `src/components/sections/Hero.tsx` | Removed unused `shouldReduceVisuals`; stripped UTF-8 BOM |

### heroImage preservation proof

`applyManufacturingContentMerge` **removed entirely**. Grep confirms `heroImage` appears only in:

1. `SiteContent` interface (`heroImage: string`)
2. `defaultContent.heroImage` (fallback for fresh installs only)

**Not** overwritten on merge/sync:

- `fetchContent` uses `{ ...state.content, ...data, services: mergedServices }` — Supabase/persisted `heroImage` wins over code default.
- `migrate` v19 uses `{ ...defaultContent, ...newState.content }` then explicitly restores `savedHeroImage` when present — no forced default assignment.

```ts
// fetchContent merge (heroImage from data/state preserved)
content: {
    ...state.content,
    ...data,
    services: mergedServices,
}

// migrate v19 (explicit save/restore — no defaultContent.heroImage override)
const savedHeroImage = newState.content?.heroImage;
newState.content = { ...defaultContent, ...newState.content, /* heroProductLine + badges only */ };
if (savedHeroImage) {
    newState.content.heroImage = savedHeroImage;
}
```

**Verification command:** `rg "applyManufacturingContentMerge|heroImage:" src/store/useContentStore.ts` → no merge function; `heroImage:` only on interface + defaults.
