### Task 5: Hero atmosphere + understated defaults

**Files:**
- Modify: `src/store/useContentStore.ts` (defaultContent hero + trust badges)
- Modify: `src/components/sections/Hero.tsx`
- Test: manual + content still binds `content.heroImage`

**Interfaces:**
- Consumes: existing CMS fields; image still `content.heroImage`
- Produces: calmer media frame; updated default copy strings

- [ ] **Step 1: Update default copy in `useContentStore.ts`**

Set defaults (exact):

```ts
heroSubtitle: "Ä°zmir â€” toptan dosya teli ve metal imalat",
heroProductLine: "Ã–lÃ§Ã¼ netleÅŸir, termin konuÅŸulur, sevkiyat planlanÄ±r.",
// keep heroTitle unless it reads as hype; prefer:
heroTitle: "Ã–ZEL & SERÄ°\nDOSYA TELÄ°",
metalShowcaseTrustBadges: [
  { icon: "Factory", text: "Seri Ä°malat" },
  { icon: "Clock", text: "24s Teklif" },
  { icon: "PackageCheck", text: "Toptan MOQ" },
],
```

Remove the 4th badge from defaults (max 3). Do not change `heroImage` admin wiring.

Also update `resetToManufacturingDefaults` / merge fallbacks if they hardcode old subtitle strings.

- [ ] **Step 2: Calm Hero media treatment in `Hero.tsx`**

Keep left/right structure and `content.heroImage`. Adjust classes:

- Drop decorative inner white border motion overlay (or reduce opacity to unused)
- Soften hover scale (`group-hover:scale-[1.01]` â†’ remove scale or keep 1.0)
- Keep simple `border border-[#c6c6c6]` frame â€” no card shadow stack
- Ensure `Image` still uses `normalizeImagePath(content.heroImage || â€¦)`

Eyebrow already uses `heroSubtitle`; tagline uses `heroProductLine` â€” confirm they render the new defaults.

- [ ] **Step 3: Visual check**

Open `http://127.0.0.1:3000/` â€” first viewport: understated copy, no cart icon, CMS image path intact. Confirm Admin â†’ Hero â†’ Ana GÃ¶rsel still updates `heroImage`.

- [ ] **Step 4: Commit**

```bash
git add src/store/useContentStore.ts src/components/sections/Hero.tsx
git commit -m "feat: calm hero atmosphere and understated default copy"
```

---
