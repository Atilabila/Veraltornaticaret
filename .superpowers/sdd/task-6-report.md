# Task 6 Report: ServicesHomeSection polish

**Branch:** `feat/homepage-vision-cart-off`  
**Status:** Complete  
**Commit:** `786ec6f` — `feat: quiet services section defaults and border rhythm`

## Scope

Quieter services section defaults and border-only card chrome aligned with Hero. Task 5 regression fix included in same store edit.

| File | Change |
|------|--------|
| `src/store/useContentStore.ts` | Updated `servicesPageHeader` defaults (title/subtitle/badge/CTA trim); restored minimal `resetToManufacturingDefaults` preserving `heroImage` |
| `src/components/sections/ServicesHomeSection.tsx` | Removed `shadow-sm hover:shadow-md`; border-only hover; aligned subtitle fallback |

## Defaults applied

```ts
servicesPageHeader: {
  title: "Üretim Hizmetlerimiz",
  subtitle: "Dosya teli, takvim tenekesi, tef zili ve metal poster — ölçüye göre.",
  badge: "Üretim hizmetleri",
  ctaTitle: "Toptan sipariş için teklif alın",
  ctaDescription: "Ölçü ve miktar bilgileriniz incelenir; 24 saat içinde fiyatlandırma iletilir.",
}
```

## Regression fix (Task 5)

`resetToManufacturingDefaults` re-added as narrow stub: resets `heroSubtitle`, `heroProductLine`, `servicesPageHeader`, `metalShowcaseTrustBadges` from `defaultContent`, keeps current `heroImage`, persists via `upsertAdminContent`. Admin "İmalat Default" button no longer throws.

## Self-review / scope check

- ✅ Only `useContentStore.ts` + `ServicesHomeSection.tsx` committed
- ✅ ProcessSection, Hero.tsx, Navigation untouched
- ✅ Card hover: `border-[#c6c6c6]` + accent left border only (no shadow stack)
- ✅ "Detaylı incele" + `shortDescription` retained

## Tests

- Linter: no new issues on edited files
- Manual smoke recommended: homepage Hero → services scroll — flat border rhythm, quieter header copy

## Concerns

1. **Persisted CMS/localStorage:** Users with old `servicesPageHeader` drama strings keep them until migrate or Admin reset; code defaults only affect fresh installs + reset button.
2. **Reset scope:** Stub does not reset full `defaultContent` (intentional — preserves admin CMS image and unrelated fields).

## Blocker fix: homepage wiring (2026-08-12)

**Problem:** `ServicesHomeSection.tsx` was committed in Task 6 polish (`786ec6f`) but `src/app/(shop)/page.tsx` in HEAD still rendered `OtherServices` after Hero — component was orphaned from the homepage.

**Fix commit:** `73a06ce` — `fix: wire ServicesHomeSection into homepage after Hero`

| File | Change |
|------|--------|
| `src/app/(shop)/page.tsx` | Dynamic import + render `ServicesHomeSection` immediately after Hero; removed `OtherServices`, `ShowcaseGrid`, `LiveFeedSection`; aligned section order and manufacturing metadata |

**HEAD verification (`git show HEAD:"src/app/(shop)/page.tsx"`):**
- ✅ `ServicesHomeSection` dynamically imported from `@/components/sections/ServicesHomeSection`
- ✅ Rendered in section after `<Hero />` (2nd screen)
- ✅ `OtherServices` no longer referenced

**Scope:** Only `src/app/(shop)/page.tsx` staged/committed; WIP dirty tree left untouched.
