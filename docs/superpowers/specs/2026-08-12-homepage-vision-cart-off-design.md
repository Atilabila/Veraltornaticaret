# Homepage Atmosphere + Cart Off Design

**Date:** 2026-08-12  
**Status:** Draft for user review  
**Scope:** Homepage Hero + `ServicesHomeSection`; site-wide cart/payment disable

## Problem

The homepage reads as a generic catalog shell: stock-feeling composition, flat white atmosphere, and weak “local manufacturer” presence. Separately, ecommerce checkout is no longer the business model — orders go by phone/WhatsApp.

## Goals

1. Give Hero + first-scroll services a quiet, local-craftsman presence without dramatic industrial theatre.
2. Keep all hero/service imagery and copy editable from Admin CMS.
3. Fully disable cart and payment; make call + WhatsApp the order path.

## Non-Goals

- Full site redesign / dark industrial skin / new design system
- Touching `ProcessSection`, reviews, showcase, blog, admin product CRUD
- Removing `/teklif-al` lead form
- Building a new CMS — reuse existing `heroImage` and content fields

## Decisions (approved)

| Topic | Choice |
|-------|--------|
| Visual approach | **A — Atmosphere polish** (typography, spacing, understated copy, calmer hero media treatment) |
| Brand tone | Local craftsman (İzmir), **no hype / no drama** |
| Imagery | Stock OK for now; must stay admin-replaceable |
| First-scroll scope | Hero + `ServicesHomeSection` only |
| Cart mode | **1 — Full hide** (no cart UI, no `/sepet` `/odeme` flow) |
| Order phone | `+90 507 165 13 15` (`905071651315`) via existing content fields |

## Architecture / data wiring (existing)

```
Admin `/admin` → Site Content → Hero → Ana Görsel
  → ImageUploader folder `hero`
  → `content.heroImage` (useContentStore)
  → `Hero.tsx` (`normalizeImagePath(content.heroImage)`)

WhatsApp / phone defaults already:
  `content.whatsappNumber` = `905071651315`
  `content.footerPhone` ≈ `+90 507 165 13 15`
```

Do not hardcode a second phone source. Prefer store fields with the above defaults.

## Design — Hero

### Keep

- CMS fields: `heroTitle`, `heroSubtitle`, `heroProductLine`, `heroImage`, CTA text/URL, trust badges
- Left copy / right media grid structure
- Primary CTA → `/teklif-al`; secondary → `/#hizmetler`

### Change

- Reduce “inset product card” feel on the media: calmer frame, less decorative overlay theatre
- Strengthen type hierarchy and spacing so brand + headline read first
- Default copy (overridable in CMS), understated examples:
  - Eyebrow: `İzmir — toptan dosya teli ve metal imalat`
  - Support line: `Ölçü netleşir, termin konuşulur, sevkiyat planlanır.`
  - Trust (max 3, short): `Seri imalat · 24s teklif · Toptan MOQ`
- Hero image remains `content.heroImage` only (admin path above)

### Avoid

- Full-bleed dark hero, floating badges, promo chips, exaggerated motion

## Design — ServicesHomeSection

### Keep

- Data from `content.services` + `content.servicesPageHeader`
- Link to `/hizmetler/[slug]`
- Admin editability

### Change

- Default header copy stays factual, e.g.:
  - Title: `Üretim Hizmetlerimiz`
  - Subtitle: `Dosya teli, takvim tenekesi, tef zili ve metal poster — ölçüye göre.`
- Visual rhythm aligned with Hero (same border/spacing language)
- Prefer one short description + “Detaylı incele”; no extra badge clusters

### Avoid

- New card system, heavy shadows, dark section skin, extra stats strip

## Design — Cart & payment off (site-wide)

### Hide / disable

- Navigation cart icon and “Sepetim”
- `CartDrawer` open triggers
- Product “add to cart” / checkout CTAs
- Routes `/sepet` and `/odeme`: soft redirect to `/teklif-al` (or home) — do not leave a broken checkout UX

### Replace with

- Product/catalog primary actions: **Ara** (`tel:+905071651315`) and **WhatsApp** (`wa.me/905071651315` with short context message when product-known)
- Keep mobile sticky **Teklif Al** as lead CTA

### Single source of truth

- Display/call: `content.footerPhone`
- WhatsApp: `content.whatsappNumber` + `content.whatsappMessage`
- Defaults must match `+90 507 165 13 15` / `905071651315`

### Explicitly keep

- `/teklif-al` quote form
- Floating WhatsApp button
- Admin historical order views (read-only legacy OK); no new online payment path

## Implementation packages (order)

1. **P1 — Cart off:** feature flag or clear code paths to remove cart UI + redirect payment/cart routes; swap product CTAs to tel/WhatsApp
2. **P2 — Hero atmosphere:** copy defaults + layout/visual polish bound to CMS image
3. **P3 — ServicesHomeSection polish:** header defaults + spacing/border alignment with Hero

Skill for visual execution after plan: `frontend-design` (atmosphere only). Planning skill next: `writing-plans`.

## Success criteria

- [ ] First viewport does not feel like a generic white template; brand + understated manufacturer voice clear
- [ ] Hero image changeable from Admin → Site Content → Hero → Ana Görsel
- [ ] No user-facing path to cart or payment
- [ ] Phone/WhatsApp order path works with `507 165 13 15`
- [ ] Process / reviews / showcase unchanged
- [ ] Copy has no hype (“lider”, “efsane”, drama)

## Risks

- Half-disabled cart (icon gone but “Sepete ekle” remains) — mitigate with a single checklist pass across Navigation, ProductDetail, Catalog, CartDrawer, `/sepet`, `/odeme`
- Hardcoded phone drift — mitigate by using content store fields only
- Scope creep into full redesign — hard stop at Hero + ServicesHomeSection for visual work

## Out of scope follow-ups (later)

- Replacing stock photos with real production shots (still via same admin field)
- Deeper catalog IA changes
- Removing payment provider code entirely from repo (can stay dead; UI must not expose it)
