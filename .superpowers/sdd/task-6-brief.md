### Task 6: ServicesHomeSection polish

**Files:**
- Modify: `src/store/useContentStore.ts` (`servicesPageHeader` defaults)
- Modify: `src/components/sections/ServicesHomeSection.tsx`

**Interfaces:**
- Consumes: `content.services`, `content.servicesPageHeader`
- Produces: quieter section aligned with Hero borders/spacing

- [ ] **Step 1: Update `servicesPageHeader` defaults**

```ts
servicesPageHeader: {
  title: "Ãœretim Hizmetlerimiz",
  subtitle: "Dosya teli, takvim tenekesi, tef zili ve metal poster â€” Ã¶lÃ§Ã¼ye gÃ¶re.",
  badge: "Ãœretim hizmetleri",
  // keep other CTA fields factual; trim drama if present
  ...
}
```

- [ ] **Step 2: Align section chrome with Hero**

In `ServicesHomeSection.tsx`:

- Reduce heavy `shadow-sm hover:shadow-md` to border-only hover (match Heroâ€™s flat border language)
- Keep `border border-[#c6c6c6]` + accent left border on hover
- No new card system, no dark skin, no stats strip
- Keep â€œDetaylÄ± inceleâ€ + shortDescription

- [ ] **Step 3: Visual check first scroll**

Homepage: Hero then services â€” same quiet industrial language; Process section untouched.

- [ ] **Step 4: Commit**

```bash
git add src/store/useContentStore.ts src/components/sections/ServicesHomeSection.tsx
git commit -m "feat: quiet services section defaults and border rhythm"
```

---
