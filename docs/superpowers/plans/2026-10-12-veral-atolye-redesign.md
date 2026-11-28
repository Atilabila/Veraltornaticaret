# Veral "Atölye" Yeniden Tasarımı — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Herkese açık sayfaları koyu antrasit + pirinç "atölye" tasarım diline geçirmek, perakende mağaza dilini kaldırmak, metinleri sade/doğrulanabilir hale getirmek.

**Architecture:** Renk/font token'ları Tailwind v4 `@theme` içinde tanımlanır (`bg-atl-bg`, `text-atl-brass` …). Ortak katman (Navigation, Footer, PageShell) ve ana sayfa elle yeniden yazılır; yeni tek-sorumluluklu bileşenler `src/components/atolye/` altında. Diğer sayfalardaki yüzlerce açık tema sınıfı, birim testli bir codemod (`scripts/atolye-codemod.mjs`) ile token'lara çevrilir, ardından ekran görüntüsüyle elle ince ayar yapılır.

**Tech Stack:** Next.js 16.1 (App Router, webpack build), React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), lucide-react, `node:test` (codemod testleri), Cursor tarayıcısı (görsel doğrulama).

Spec: `docs/superpowers/specs/2026-10-12-veral-atolye-redesign-design.md`

## Global Constraints

- Branch: `feat/veral-gercek-urun-gorselleri`; PR hedefi `feat/homepage-vision-cart-off`. Tüm müşteri commit'leri + bu iş tek PR.
- Hizmet kartı metinleri (title, badge, capacity, description, metric, specs) ve görselleri **değişmez**: `src/components/sections/ServicesHomeSection.tsx` ve `src/app/hizmetler/page.tsx` içindeki `serviceCards` dizileri, `defaultContent.services`.
- Blog yazı içerikleri (`content`, `excerpt`, `title`, `tags`) değişmez.
- `PR.md` §6 "Ek düzeltmeler" değerleri birebir korunur: adresler (`1471 Sokak No:12/A`, `1512 Sk. No:42/1`), telefonlar, `tel:` linkleri, `LOG@VERAL.COM`, harita linki, `Ti̇caret` (U+0307 içeren string, Navigation'da), footer `© 2024`, `veral-logo.png`, yazar fotoğrafı (`/hero-izmir-metal-poster.jpg` AuthorCard/yazar/hakkımızda).
- Mağaza kodu silinmez; sadece menü/ana sayfadan link kalkar ve `noindex`.
- Fontlar runtime `<link>` ile yüklenir (mevcut desen; build ortamında Google Fonts'a erişim yok). `next/font` kullanılmaz. **(Spec'ten bilinçli sapma: spec `next/font/google` diyordu.)**
- Giriş animasyonu CSS ile (`.atl-rise`), `prefers-reduced-motion` saygılı. **(Spec'ten sapma: framer-motion yerine CSS — sıfır JS, server component'lerde de çalışır.)**
- Renk değerleri:
  `--color-atl-bg #121110` · `--color-atl-surface #1b1a18` · `--color-atl-surface-2 #23211e` · `--color-atl-line #2e2b27` · `--color-atl-brass #c9a35c` · `--color-atl-brass-light #e3c78a` · `--color-atl-brass-tint #2a2318` · `--color-atl-text #ece6da` · `--color-atl-muted #a39b8c`
- Pirinç zeminde metin rengi `text-atl-bg` (beyaz değil).
- Commit mesajları Türkçe, ASCII (mevcut desen).

---

## File Structure

| Dosya | Durum | Sorumluluk |
|---|---|---|
| `src/app/globals.css` | Modify | Token'lar, shadcn HSL değişkenleri koyu, `.atl-grain`, `.atl-rise`, `.atl-prose` |
| `src/app/layout.tsx` | Modify | Font link'i, body sınıfları |
| `scripts/atolye-codemod.mjs` | Create | Açık sınıf → token dönüşümü + `--check` modu |
| `scripts/atolye-codemod.test.mjs` | Create | Codemod birim testleri (`node --test`) |
| `src/components/atolye/SectionHeading.tsx` | Create | Üst etiket + serif başlık + açıklama |
| `src/components/atolye/BrassRule.tsx` | Create | Pirinç ayırıcı |
| `src/components/atolye/ServiceCard.tsx` | Create | Ortak hizmet kartı (4:5 görsel, rozetler altta) |
| `src/components/atolye/ProcessSteps.tsx` | Create | 4 adımlı teklif süreci |
| `src/components/atolye/CtaBand.tsx` | Create | Teklif / iletişim bandı (telefon/adres içermez) |
| `src/components/atolye/AtolyeHero.tsx` | Create | Ana sayfa hero |
| `src/components/atolye/MetalBaskiBand.tsx` | Create | İkincil hizmet bandı |
| `src/components/atolye/LatestPosts.tsx` | Create | Son 3 blog yazısı |
| `src/lib/blog-posts.ts` | Create | `blogPosts` listesi (page dosyasından taşınır) |
| `src/components/layout/Navigation.tsx` | Rewrite | Koyu header, masaüstü menü, hesap/sepet yok |
| `src/components/layout/Footer.tsx` | Rewrite | Aynı içerik, yeni stil |
| `src/components/layout/PageShell.tsx` | Modify | Koyu zemin |
| `src/components/layout/MobileStickyBar.tsx` | Modify | Koyu stil |
| `src/components/sections/ServicesHomeSection.tsx` | Modify | `ServiceCard` kullanır, ISO satırı nötr |
| `src/app/(shop)/page.tsx` | Modify | Yeni bölüm sırası, metadata/FAQ metni |
| `src/app/hizmetler/page.tsx` | Modify | `ServiceCard`, hero metni, codemod |
| `src/app/blog/page.tsx` | Modify | `blogPosts` import'u |
| `src/app/{hesabim,siparis-sorgula,siparis,koleksiyon,urunler/[slug]}/layout.tsx` | Create | `noindex` |
| Diğer sayfalar | Modify | Codemod + metin düzeltmeleri |

---

### Task 1: Tasarım token'ları ve fontlar

**Files:**
- Modify: `src/app/globals.css` (`@theme` bloğu satır 14-57, `:root` satır 60-103, dosya sonu)
- Modify: `src/app/layout.tsx:71-80, 85`

**Interfaces:**
- Produces: Tailwind utility'leri `bg-|text-|border-|from-|to-|ring-|divide-` + `atl-bg|atl-surface|atl-surface-2|atl-line|atl-brass|atl-brass-light|atl-brass-tint|atl-text|atl-muted`; `font-display`, `font-sans` (Archivo), `font-mono`; CSS sınıfları `.atl-grain`, `.atl-rise`, `.atl-rise-2`, `.atl-rise-3`, `.atl-prose`.

- [ ] **Step 1: `@theme` bloğuna token ekle ve brand accent'i pirince çevir**

`src/app/globals.css` içinde `--color-brand-accent: #d97706;` ve `--color-brand-accent-muted: #b45309;` satırlarını şu şekilde değiştir:

```css
  --color-brand-accent: #c9a35c;
  --color-brand-accent-muted: #b8914a;
```

`--color-card-foreground: hsl(var(--card-foreground));` satırından sonra (`@theme` kapanmadan önce) ekle:

```css

  /* Atölye tasarım dili */
  --color-atl-bg: #121110;
  --color-atl-surface: #1b1a18;
  --color-atl-surface-2: #23211e;
  --color-atl-line: #2e2b27;
  --color-atl-brass: #c9a35c;
  --color-atl-brass-light: #e3c78a;
  --color-atl-brass-tint: #2a2318;
  --color-atl-text: #ece6da;
  --color-atl-muted: #a39b8c;

  --font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
  --font-sans: "Archivo", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

- [ ] **Step 2: `:root` değişkenlerini koyu temaya çek**

`:root { ... }` içindeki şu satırları değiştir (diğerleri aynı kalır):

```css
    --font-space-grotesk: "Archivo";
    --font-syne: "Archivo";

    --background: 30 6% 7%;
    --foreground: 40 30% 89%;

    --card: 40 6% 10%;
    --card-foreground: 40 30% 89%;

    --muted: 36 6% 13%;
    --muted-foreground: 39 9% 59%;

    --primary: 39 50% 57%;
    --primary-foreground: 30 6% 7%;

    --secondary: 36 6% 13%;
    --secondary-foreground: 40 30% 89%;

    --accent: 36 6% 13%;
    --accent-foreground: 40 30% 89%;

    --border: 35 6% 17%;
    --input: 35 6% 17%;
    --ring: 39 50% 57%;

    --popover: 40 6% 10%;
    --popover-foreground: 40 30% 89%;
```

- [ ] **Step 3: Dosya sonuna atölye yardımcı sınıflarını ekle**

```css
/* ===== Atölye dokusu, giriş animasyonu, uzun metin ===== */
.atl-grain {
  background-image:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.014) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse at 18% 0%, rgba(201, 163, 92, 0.09), transparent 55%),
    radial-gradient(ellipse at 100% 100%, rgba(201, 163, 92, 0.05), transparent 50%);
}

@keyframes atl-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}

.atl-rise { animation: atl-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.atl-rise-2 { animation-delay: 0.12s; }
.atl-rise-3 { animation-delay: 0.24s; }

@media (prefers-reduced-motion: reduce) {
  .atl-rise { animation: none; }
}

.atl-prose {
  max-width: 68ch;
  line-height: 1.7;
  color: var(--color-atl-muted);
}

.atl-prose h2, .atl-prose h3 {
  font-family: var(--font-display);
  color: var(--color-atl-text);
  font-weight: 400;
}

.atl-prose strong { color: var(--color-atl-text); }
.atl-prose a { color: var(--color-atl-brass-light); text-decoration: underline; text-underline-offset: 3px; }
```

- [ ] **Step 4: Font link'ini ve body sınıfını güncelle**

`src/app/layout.tsx` içinde `href="https://fonts.googleapis.com/css2?family=Space+Grotesk...` değerini şu olsun:

```tsx
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
```

`<body className=...>` satırı:

```tsx
      <body className="antialiased bg-atl-bg text-atl-text font-sans selection:bg-atl-brass selection:text-atl-bg">
```

- [ ] **Step 5: Build ile doğrula**

Run: `npm run build 2>&1 | Select-String "Compiled|Failed to compile|44/44"`
Expected: `✓ Compiled successfully` ve `(44/44)`.

Ardından `npx next start -p 3100` (arka planda), `http://127.0.0.1:3100/kvkk` aç; `Runtime.evaluate` ile `getComputedStyle(document.body).backgroundColor` → `rgb(18, 17, 16)`; `getComputedStyle(document.body).fontFamily` `Archivo` ile başlamalı.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(tasarim): atolye renk ve font tokenlari"
```

---

### Task 2: Sınıf codemod'u (TDD)

**Files:**
- Create: `scripts/atolye-codemod.mjs`
- Test: `scripts/atolye-codemod.test.mjs`

**Interfaces:**
- Produces: `transform(source: string): string`, `findLeftovers(source: string): string[]` (named export'lar); CLI `node scripts/atolye-codemod.mjs [--check] <dosya...>`.

- [ ] **Step 1: Başarısız testleri yaz**

`scripts/atolye-codemod.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { transform, findLeftovers } from "./atolye-codemod.mjs";

test("zemin, metin ve kenarlık sınıflarını token'a çevirir", () => {
  const src = `<div className="bg-white text-[#161616] border border-zinc-200">`;
  assert.equal(transform(src), `<div className="bg-atl-surface text-atl-text border border-atl-line">`);
});

test("varyant öneklerini ve opaklık son ekini korur", () => {
  const src = `className="hover:bg-zinc-50 md:text-zinc-600 bg-white/95 group-hover:text-amber-700"`;
  assert.equal(
    transform(src),
    `className="hover:bg-atl-surface-2 md:text-atl-muted bg-atl-surface/95 group-hover:text-atl-brass"`
  );
});

test("pirinç zemindeki beyaz metni koyu yapar", () => {
  const src = `className="bg-amber-600 hover:bg-amber-700 text-white"`;
  assert.equal(transform(src), `className="bg-atl-brass hover:bg-atl-brass-light text-atl-bg"`);
});

test("brand-accent hover zemini için hover:text-white da koyulaşır", () => {
  const src = `className="border text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-white"`;
  assert.equal(
    transform(src),
    `className="border text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-atl-bg"`
  );
});

test("pirinç zemin olmayan text-white'a dokunmaz", () => {
  const src = `className="bg-black/75 text-white"`;
  assert.equal(transform(src), src);
});

test("amber-50 tint'e, amber kenarlık pirince döner", () => {
  const src = `className="bg-amber-50 border-amber-600/20 text-amber-900"`;
  assert.equal(transform(src), `className="bg-atl-brass-tint border-atl-brass/20 text-atl-brass"`);
});

test("template literal içinde de çalışır", () => {
  const src = "className={`${a} bg-[#fafafa] text-zinc-500`}";
  assert.equal(transform(src), "className={`${a} bg-atl-bg text-atl-muted`}");
});

test("benzer isimli sınıfları yanlış eşlemez", () => {
  const src = `className="bg-white-smoke text-zinc-9000 border-zinc-200x"`;
  assert.equal(transform(src), src);
});

test("kontrast düzeltmesi JSX metnindeki kesme işaretlerinden etkilenmez", () => {
  const src = `<p>İzmir'in <span className="bg-atl-brass">x</span> Alsancak'ta</p><b className="text-white">y</b>`;
  assert.equal(transform(src), src);
});

test("findLeftovers dönüştürülmemiş açık sınıfları listeler", () => {
  assert.deepEqual(findLeftovers(`className="bg-gray-100 text-slate-700 bg-atl-bg"`), ["bg-gray-100", "text-slate-700"]);
});
```

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `node --test scripts/atolye-codemod.test.mjs`
Expected: FAIL — `Cannot find module ... atolye-codemod.mjs`.

- [ ] **Step 3: Codemod'u yaz**

`scripts/atolye-codemod.mjs`:

```js
#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const MAP = {
  bg: {
    white: "atl-surface",
    "[#fafafa]": "atl-bg", "[#f8f9fa]": "atl-bg", "[#f4f4f4]": "atl-bg", "[#fdfbf7]": "atl-bg", "[#fcfcfc]": "atl-surface",
    "zinc-50": "atl-surface-2", "zinc-100": "atl-surface-2", "zinc-200": "atl-line",
    "amber-50": "atl-brass-tint", "amber-100": "atl-brass-tint",
    "amber-500": "atl-brass", "amber-600": "atl-brass", "amber-700": "atl-brass-light",
    "[#b45309]": "atl-brass-light", "[#d97706]": "atl-brass",
  },
  text: {
    "[#161616]": "atl-text", "zinc-950": "atl-text", "zinc-900": "atl-text", "zinc-800": "atl-text",
    "[#525252]": "atl-muted", "[#4b5563]": "atl-muted", "zinc-700": "atl-muted", "zinc-600": "atl-muted", "zinc-500": "atl-muted",
    "zinc-400": "atl-muted",
    "amber-600": "atl-brass", "amber-700": "atl-brass", "amber-800": "atl-brass", "amber-900": "atl-brass",
    "amber-500": "atl-brass-light", "amber-400": "atl-brass-light", "amber-300": "atl-brass-light",
    "[#b45309]": "atl-brass", "[#d97706]": "atl-brass",
  },
  border: {
    "zinc-100": "atl-line", "zinc-200": "atl-line", "zinc-300": "atl-line",
    "[#c6c6c6]": "atl-line", "[#e5e7eb]": "atl-line",
    "amber-500": "atl-brass", "amber-600": "atl-brass", "amber-700": "atl-brass",
  },
  divide: { "zinc-100": "atl-line", "zinc-200": "atl-line", "[#c6c6c6]": "atl-line" },
  ring: { "amber-500": "atl-brass", "amber-600": "atl-brass" },
  from: { "amber-500": "atl-brass", "amber-600": "atl-brass", "amber-700": "atl-brass" },
  via: { "amber-600": "atl-brass", "amber-700": "atl-brass" },
  to: { "amber-700": "atl-brass-light", "amber-800": "atl-brass", "amber-900": "atl-brass" },
  shadow: { "amber-600": "black" },
};

const CLASS_RE = /(?<=^|[\s"'`{])((?:[a-z0-9-]+:)*)(bg|text|border|divide|ring|from|via|to|shadow)-(\[#[0-9a-fA-F]{6}\]|white|[a-z]+-\d{2,3})(\/\d{1,3})?(?=$|[\s"'`}])/g;

function mapClasses(source) {
  return source.replace(CLASS_RE, (whole, variants, prop, color, opacity = "") => {
    const target = MAP[prop]?.[color];
    return target ? `${variants}${prop}-${target}${opacity}` : whole;
  });
}

const BRASS_BG = (prefix) =>
  new RegExp(`(?<=^|[\\s"'\`])${prefix.replace(/[-:]/g, "\\$&")}bg-(atl-brass|\\[var\\(--color-brand-accent\\)\\])(?=$|[\\s"'\`])`);

// Only className values: Turkish apostrophes in JSX text must not pair up as quotes.
function fixContrast(source) {
  return source.replace(/(className=\{?\s*)(["'`])([^"'`]*)\2/g, (literal, head, quote, body) => {
    let next = body;
    for (const prefix of ["", "hover:", "group-hover:"]) {
      if (BRASS_BG(prefix).test(next)) {
        const white = new RegExp(`(?<=^|\\s)${prefix.replace(/[-:]/g, "\\$&")}text-white(?=$|\\s)`, "g");
        next = next.replace(white, `${prefix}text-atl-bg`);
      }
    }
    return `${head}${quote}${next}${quote}`;
  });
}

export function transform(source) {
  return fixContrast(mapClasses(source));
}

const LEFTOVER_RE = /(?<=^|[\s"'`{])(?:[a-z0-9-]+:)*(?:bg|text|border)-(?:white|gray-\d{2,3}|slate-\d{2,3}|zinc-\d{2,3}|neutral-[1-4]\d{2}|stone-\d{2,3}|amber-\d{2,3}|\[#[ef][0-9a-fA-F]{5}\])(?:\/\d{1,3})?(?=$|[\s"'`}])/g;

export function findLeftovers(source) {
  return [...source.matchAll(LEFTOVER_RE)].map((m) => m[0]).filter((c) => !c.endsWith("text-white"));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const args = process.argv.slice(2);
  const check = args[0] === "--check";
  const files = check ? args.slice(1) : args;
  let leftoverTotal = 0;
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    if (check) {
      const left = findLeftovers(src);
      leftoverTotal += left.length;
      if (left.length) console.log(`${file}: ${[...new Set(left)].join(" ")}`);
    } else {
      const out = transform(src);
      if (out !== src) writeFileSync(file, out);
      console.log(`${out === src ? "unchanged" : "updated  "} ${file}`);
    }
  }
  if (check) console.log(`leftovers: ${leftoverTotal}`);
}
```

- [ ] **Step 4: Testlerin geçtiğini gör**

Run: `node --test scripts/atolye-codemod.test.mjs`
Expected: `# pass 10`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add scripts/atolye-codemod.mjs scripts/atolye-codemod.test.mjs
git commit -m "chore(tasarim): acik tema siniflarini atolye tokenlarina ceviren codemod"
```

---

### Task 3: Ortak katman — Navigation, Footer, PageShell, MobileStickyBar

**Files:**
- Rewrite: `src/components/layout/Navigation.tsx`
- Rewrite: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/PageShell.tsx`
- Modify: `src/components/layout/MobileStickyBar.tsx`

**Interfaces:**
- Consumes: Task 1 token'ları.
- Produces: `Navigation` (props yok), `Footer` (props yok), `PageShell({ children, className?, padded?, showFooter?, variant?: "light" | "muted" })` — imza değişmez.

Not: Navigation menüsü artık `content.menuItems` yerine sabit listedir (spec §5). Admin panelindeki menü düzenleyicisi header'ı etkilemez — PR'da belirtilecek.

- [ ] **Step 1: Navigation'ı yeniden yaz**

`src/components/layout/Navigation.tsx` tam içerik:

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { m, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '@/store/useAdminStore';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Üretim Hatları', href: '/hizmetler' },
    { label: 'Metal Baskı', href: '/hizmetler/miknatisli-magnet' },
    { label: 'Blog', href: '/blog' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
];

const SEARCH_GROUPS = [
    {
        title: 'Üretim hatları',
        links: [
            { label: 'Dosya Teli', href: '/hizmetler/dosya-teli' },
            { label: 'Takvim Tenekesi', href: '/hizmetler/takvim-tenekesi' },
            { label: 'Tef Zili', href: '/hizmetler/tef-zili' },
        ],
    },
    {
        title: 'Diğer hizmetler',
        links: [
            { label: 'Giyotin Kesim & Rulo Dilimleme', href: '/hizmetler' },
            { label: 'UV Baskılı Metal Levha', href: '/hizmetler/miknatisli-magnet' },
            { label: 'Teklif Al', href: '/teklif-al' },
        ],
    },
];

export const Navigation = () => {
    const { content } = useContentStore();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const setAdmin = useAdminStore((state) => state.setAdmin);
    const isAdmin = useAdminStore((state) => state.isAdmin);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const checkAuth = async () => {
            if (isAdmin) return;
            const supabase = createBrowserSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setAdmin(true);
        };
        checkAuth();

        const initSync = async () => {
            try {
                if (isAdmin) return;
                const { startBackgroundSync } = await import('@/lib/sync/syncService');
                startBackgroundSync();
            } catch (error) {
                console.error('[SYNC] Failed to initialize sync service:', error);
            }
        };
        initSync();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAdmin, setAdmin]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const ctaText = content.headerConfig?.ctaText || "TEKLİF AL";
    const ctaLink = content.headerConfig?.ctaLink || "/teklif-al";
    const isActive = (href: string) => pathname === href || (href !== '/hizmetler' && pathname?.startsWith(href));

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-[100] w-full border-b transition-colors duration-500",
                    isScrolled ? "border-atl-line bg-atl-bg/95 backdrop-blur" : "border-transparent bg-atl-bg/70 backdrop-blur-sm"
                )}
            >
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-12">
                    <Link href="/" className="group flex min-w-0 items-center gap-3">
                        <span className="relative h-10 w-10 flex-shrink-0 md:h-11 md:w-11">
                            <Image
                                src="/veral-logo.png"
                                alt={content.siteName || "VERAL"}
                                fill
                                sizes="44px"
                                className="rounded-full object-contain"
                                priority
                                quality={95}
                            />
                        </span>
                        <div className="flex flex-col leading-none">
                            <h2 className="font-display text-xl tracking-wide text-atl-text transition-colors group-hover:text-atl-brass-light md:text-2xl">
                                {content.siteName || "VERAL"}
                            </h2>
                            <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-atl-muted md:text-[9px]">Torna & Teneke Ti̇caret</span>
                        </div>
                    </Link>

                    <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive(link.href) ? "text-atl-brass-light" : "text-atl-muted hover:text-atl-text"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Arama aç"
                            className="p-2 text-atl-muted transition-colors hover:text-atl-text"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <Link
                            href={ctaLink}
                            className="hidden h-10 items-center bg-atl-brass px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light sm:inline-flex"
                        >
                            {ctaText}
                        </Link>
                        <button
                            className="p-2 text-atl-text lg:hidden"
                            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isSearchOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] flex items-start justify-center px-6 pt-[10vh]"
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
                        <m.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="relative z-10 w-full max-w-2xl border border-atl-line bg-atl-surface p-8 md:p-12"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-atl-brass">Arama</span>
                                <button onClick={() => setIsSearchOpen(false)} aria-label="Aramayı kapat" className="text-atl-muted hover:text-atl-text">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Ürün veya hizmet adı…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            window.location.href = `/urunler?search=${encodeURIComponent(searchQuery)}`;
                                        }
                                    }}
                                    className="w-full border border-atl-line bg-atl-bg px-6 py-5 font-display text-2xl text-atl-text placeholder:text-atl-muted/60 focus:border-atl-brass focus:outline-none md:text-3xl"
                                />
                                <Search className="absolute right-6 top-1/2 h-7 w-7 -translate-y-1/2 text-atl-brass" />
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-10 border-t border-atl-line pt-8 md:grid-cols-2">
                                {SEARCH_GROUPS.map((group) => (
                                    <div key={group.title}>
                                        <h4 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">{group.title}</h4>
                                        <div className="flex flex-col gap-3">
                                            {group.links.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="text-lg text-atl-text transition-colors hover:text-atl-brass-light"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="atl-grain fixed inset-0 z-[100000] flex flex-col overflow-y-auto bg-atl-bg p-8 text-atl-text"
                    >
                        <div className="mb-14 flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-[0.4em] text-atl-brass">Menü</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-atl-muted hover:text-atl-text" aria-label="Menüyü kapat">
                                <X className="h-9 w-9" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6 pb-24">
                            {[{ label: 'Ana Sayfa', href: '/' }, ...NAV_LINKS].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-display text-4xl text-atl-text transition-colors hover:text-atl-brass-light"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={ctaLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-8 flex h-14 items-center justify-center bg-atl-brass font-mono text-sm font-semibold uppercase tracking-[0.25em] text-atl-bg"
                            >
                                {ctaText}
                            </Link>
                        </nav>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
```

- [ ] **Step 2: Footer'ı yeniden yaz**

`src/components/layout/Footer.tsx` tam içerik (içerik alanları ve `© 2024` metni aynen):

```tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { DirectEdit } from "@/components/admin/DirectEdit";
import { PageContainer } from '@/components/layout/PageContainer';
import { BrassRule } from '@/components/atolye/BrassRule';

const NAV = [
    { label: 'İmalat Hatlarımız', href: '/hizmetler' },
    { label: 'Sıkça Sorulanlar (SSS)', href: '/sss' },
    { label: 'Teknik Raporlar & Blog', href: '/blog' },
    { label: 'Atölye ve Editör Biyografisi', href: '/yazar/oguzcan-veral' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Hızlı Teklif Al', href: '/teklif-al' },
    { label: 'İletişim', href: '/iletisim' },
];

const LEGAL = [
    { label: 'Mesafeli Satış', href: '/mesafeli-satis' },
    { label: 'Gizlilik', href: '/gizlilik' },
    { label: 'KVKK', href: '/kvkk' },
];

export const Footer = () => {
    const { content } = useContentStore();
    const siteName = content.siteName || "VERAL";
    const instagramHandle = (content.footerInstagram || "").replace('@', '').trim();
    const socialLinks = [
        instagramHandle ? { icon: Instagram, href: `https://instagram.com/${instagramHandle}`, label: "Instagram" } : null,
        { icon: Facebook, href: '#', label: "Facebook" },
        { icon: Twitter, href: '#', label: "Twitter" }
    ].filter(Boolean) as { icon: typeof Instagram; href: string; label: string }[];

    return (
        <DirectEdit tab="contact">
            <footer className="atl-grain border-t border-atl-line bg-atl-bg pb-10 pt-20 text-atl-text">
                <PageContainer>
                    <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
                        <div className="flex flex-col gap-6 lg:col-span-12 xl:col-span-4">
                            <Link href="/" className="group flex items-center gap-4">
                                <span className="relative h-14 w-14 flex-shrink-0">
                                    <Image src="/veral-logo.png" alt={siteName} fill sizes="56px" className="rounded-full object-contain" quality={95} />
                                </span>
                                <span className="flex flex-col">
                                    <span className="font-display text-2xl tracking-wide">{siteName}</span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-muted">Torna & Teneke Ticaret</span>
                                </span>
                            </Link>
                            <p className="max-w-sm text-base leading-relaxed text-atl-muted">
                                İzmir merkezli toptan dosya teli imalatı, takvim tenekesi seri üretimi ve özel metal imalat.
                            </p>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">Merkez & Atölye</span>
                                <span className="whitespace-pre-line text-sm text-atl-text">{content.footerAddress}</span>
                            </div>
                            <div className="flex gap-3">
                                {socialLinks.map((item, i) => (
                                    <Link key={i} href={item.href} target="_blank" aria-label={`${item.label} sayfamız`}
                                        className="flex h-10 w-10 items-center justify-center border border-atl-line text-atl-muted transition-colors hover:border-atl-brass hover:text-atl-brass-light">
                                        <item.icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-3">
                            <h4 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">Navigasyon</h4>
                            <ul className="flex flex-col gap-3">
                                {NAV.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="group inline-flex items-center gap-2 text-sm text-atl-text transition-colors hover:text-atl-brass-light">
                                            {item.label}
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 lg:col-span-6 xl:col-span-5">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-atl-brass">İletişim</h4>
                            <div className="space-y-1">
                                <div className="font-display text-2xl">{content.footerPhone}</div>
                                <div className="text-sm text-atl-muted">{content.footerEmail}</div>
                            </div>
                            <a href={content.footerMapLink || `https://www.google.com/maps/dir/?api=1&destination=${content.footerMapLat},${content.footerMapLng}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 w-fit items-center gap-2 border border-atl-brass px-5 text-sm font-semibold text-atl-brass-light transition-colors hover:bg-atl-brass hover:text-atl-bg">
                                Yol Tarifi Al <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <BrassRule className="mb-8" />
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-atl-muted">© 2024 {content.footerCompanyName} — Tüm hakları saklıdır.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {LEGAL.map((item) => (
                                <Link key={item.label} href={item.href} className="text-xs text-atl-muted hover:text-atl-brass-light">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </PageContainer>
            </footer>
        </DirectEdit>
    );
};
```

Bu adım `BrassRule`'a bağlı: Step 3'ü Step 2'den önce veya aynı commit'te yap.

- [ ] **Step 3: BrassRule'u oluştur**

`src/components/atolye/BrassRule.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function BrassRule({ className }: { className?: string }) {
    return (
        <div aria-hidden className={cn("flex items-center gap-3", className)}>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-atl-brass/50" />
            <span className="h-1.5 w-1.5 rotate-45 border border-atl-brass" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-atl-brass/50" />
        </div>
    );
}
```

- [ ] **Step 4: PageShell ve MobileStickyBar**

`src/components/layout/PageShell.tsx` içindeki `<main className={cn(...)}>` bloğu:

```tsx
                className={cn(
                    "min-h-screen text-atl-text selection:bg-atl-brass selection:text-atl-bg",
                    variant === "light" ? "bg-atl-bg" : "atl-grain bg-atl-bg",
                    padded && "pt-28 lg:pt-32 pb-16 lg:pb-24",
                    className
                )}
```

Dosya üstündeki yorum: `/** Unified public page chrome - dark atelier shell */`

`src/components/layout/MobileStickyBar.tsx` iki className:

```tsx
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] p-3 bg-atl-bg/95 backdrop-blur border-t border-atl-line">
```

```tsx
                className="flex items-center justify-center gap-2 w-full h-12 bg-atl-brass text-atl-bg font-semibold text-sm tracking-wide"
```

- [ ] **Step 5: Lint + build**

Run: `npx eslint src/components/layout/Navigation.tsx src/components/layout/Footer.tsx src/components/layout/PageShell.tsx src/components/layout/MobileStickyBar.tsx src/components/atolye/BrassRule.tsx`
Expected: 0 error.

Run: `npm run build 2>&1 | Select-String "Compiled|Failed to compile|44/44"`
Expected: başarı.

- [ ] **Step 6: Görsel kontrol**

`/kvkk` sayfasını 1280px ve 375px genişlikte aç. Beklenen: koyu header, masaüstünde 5 menü linki + pirinç "TEKLİF AL", hesap/sepet ikonu yok; mobil menü açılıyor ve "Ana Sayfa…İletişim" + "TEKLİF AL" gösteriyor; footer'da `© 2024` duruyor. Ekran görüntüsü al.

Doğrula: `git grep -n "Ti̇caret" -- src/components/layout/Navigation.tsx` → 1 sonuç (U+0307'li string korunmuş).

- [ ] **Step 7: Commit**

```bash
git add src/components/layout src/components/atolye/BrassRule.tsx
git commit -m "feat(tasarim): koyu header, footer ve sayfa iskeleti; hesap linki kaldirildi"
```

---

### Task 4: Atölye bileşenleri

**Files:**
- Create: `src/components/atolye/SectionHeading.tsx`
- Create: `src/components/atolye/ServiceCard.tsx`
- Create: `src/components/atolye/ProcessSteps.tsx`
- Create: `src/components/atolye/CtaBand.tsx`

**Interfaces:**
- Consumes: `serviceImageAlt(src, fallback)`, `serviceImageFit(src)` from `@/lib/service-stock-images`.
- Produces:
  - `SectionHeading({ eyebrow: string; title: string; description?: string; align?: "left" | "center"; as?: "h1" | "h2"; className?: string })`
  - `ServiceCard({ slug: string; title: string; badge: string; capacity: string; image: string; description: string; metric?: string | null; specs?: { label: string; val: string }[]; icon?: LucideIcon; ctaLabel: string; priority?: boolean })`
  - `ProcessSteps()` (props yok)
  - `CtaBand({ title?: string; description?: string })`

- [ ] **Step 1: SectionHeading**

```tsx
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    as?: "h1" | "h2";
    className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", className }: SectionHeadingProps) {
    return (
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">{eyebrow}</span>
            <Tag className="mt-3 font-display text-4xl leading-[1.05] text-atl-text md:text-5xl">{title}</Tag>
            {description && <p className="mt-4 text-base leading-relaxed text-atl-muted md:text-lg">{description}</p>}
        </div>
    );
}
```

- [ ] **Step 2: ServiceCard**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";

type ServiceCardProps = {
    slug: string;
    title: string;
    badge: string;
    capacity: string;
    image: string;
    description: string;
    metric?: string | null;
    specs?: { label: string; val: string }[];
    icon?: LucideIcon;
    ctaLabel: string;
    priority?: boolean;
};

export function ServiceCard({ slug, title, badge, capacity, image, description, metric, specs, icon: Icon, ctaLabel, priority }: ServiceCardProps) {
    return (
        <article className="group flex flex-col border border-atl-line bg-atl-surface transition-colors duration-300 hover:border-atl-brass/70">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <Image
                    src={image}
                    alt={serviceImageAlt(image, title)}
                    fill
                    priority={priority}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
                    className={serviceImageFit(image)}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-atl-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-atl-muted">{badge}</span>
                <span aria-hidden className="text-atl-line">/</span>
                <span className="text-atl-brass">{capacity}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-start gap-2 font-display text-2xl leading-tight text-atl-text">
                    {Icon && <Icon className="mt-1 h-5 w-5 shrink-0 text-atl-brass" />}
                    {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-atl-muted">{description}</p>
                {metric && (
                    <span className="mt-4 inline-flex w-fit items-center gap-1.5 border border-atl-brass/40 bg-atl-brass-tint px-2.5 py-1 font-mono text-[11px] text-atl-brass-light">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {metric}
                    </span>
                )}
                {specs && specs.length > 0 && (
                    <dl className="mt-5 space-y-2 border-t border-atl-line pt-4 font-mono text-xs">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex justify-between gap-4">
                                <dt className="text-atl-muted">{spec.label}:</dt>
                                <dd className="text-right text-atl-text">{spec.val}</dd>
                            </div>
                        ))}
                    </dl>
                )}
                <div className="mt-auto pt-6">
                    <Link
                        href={`/teklif-al?hizmet=${slug}`}
                        className="flex h-11 w-full items-center justify-between border border-atl-line px-4 text-xs font-semibold text-atl-text transition-colors group-hover:border-atl-brass group-hover:bg-atl-brass group-hover:text-atl-bg"
                    >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
```

- [ ] **Step 3: ProcessSteps**

```tsx
import { SectionHeading } from "@/components/atolye/SectionHeading";

const STEPS = [
    { title: "Ölçü veya çizim gönderin", text: "Teknik resim, numune ya da ölçü bilgisini teklif formundan veya WhatsApp üzerinden iletin." },
    { title: "Numune ve fiyat", text: "Malzeme ve kalınlığı birlikte netleştirip numune ve fiyat teklifi hazırlıyoruz." },
    { title: "Seri üretim", text: "Onaylanan numuneye göre atölyemizde seri üretime geçiyoruz." },
    { title: "Paketleme ve sevkiyat", text: "Koli veya palet halinde paketleyip kargo ya da ambar ile gönderiyoruz." },
];

export function ProcessSteps() {
    return (
        <section className="border-b border-atl-line bg-atl-bg py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <SectionHeading eyebrow="Nasıl çalışıyoruz" title="Teklif usulüyle seri üretim" />
                <ol className="mt-14 grid grid-cols-1 border-l border-t border-atl-line sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className="border-b border-r border-atl-line p-8">
                            <span className="font-mono text-xs text-atl-brass">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-6 font-display text-2xl leading-tight text-atl-text">{step.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-atl-muted">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
```

- [ ] **Step 4: CtaBand**

Telefon/adres içermez (Ek düzeltmeler'deki çelişkili değerleri seçmemek için); iletişim sayfasına yönlendirir.

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrassRule } from "@/components/atolye/BrassRule";

type CtaBandProps = { title?: string; description?: string };

export function CtaBand({
    title = "Projeniz için teklif alın",
    description = "Teknik çizim, numune veya ölçü bilgisini gönderin; malzeme, adet ve termin bilgisiyle dönüş yapalım.",
}: CtaBandProps) {
    return (
        <section className="atl-grain border-b border-atl-line bg-atl-surface py-20 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <BrassRule className="mb-12" />
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl leading-tight text-atl-text md:text-5xl">{title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-atl-muted md:text-lg">{description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/teklif-al" className="inline-flex h-14 items-center gap-2 bg-atl-brass px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Teklif formu <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/iletisim" className="inline-flex h-14 items-center border border-atl-line px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            İletişim
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 5: Lint**

Run: `npx eslint src/components/atolye`
Expected: 0 error, 0 warning.

- [ ] **Step 6: Commit**

```bash
git add src/components/atolye
git commit -m "feat(tasarim): atolye bilesenleri (baslik, hizmet karti, surec, cta)"
```

---

### Task 5: Ana sayfa

**Files:**
- Create: `src/lib/blog-posts.ts`
- Modify: `src/app/blog/page.tsx` (satır 21-88: `blogPosts` dizisi taşınır)
- Create: `src/components/atolye/AtolyeHero.tsx`, `MetalBaskiBand.tsx`, `LatestPosts.tsx`
- Modify: `src/components/sections/ServicesHomeSection.tsx` (render kısmı; `serviceCards` dizisi aynen)
- Modify: `src/app/(shop)/page.tsx`

**Interfaces:**
- Consumes: Task 4 bileşenleri; `SERVICE_IMAGES` yok — görsel yolları string.
- Produces: `blogPosts: BlogPostSummary[]` ve `type BlogPostSummary = { id: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; featured: boolean; tags: string[] }` from `@/lib/blog-posts`.

- [ ] **Step 1: blogPosts'u lib'e taşı**

`src/lib/blog-posts.ts` oluştur: üstte

```ts
export type BlogPostSummary = {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured: boolean;
    tags: string[];
};

export const blogPosts: BlogPostSummary[] = [
```

ardından `src/app/blog/page.tsx` satır 22-87 arasındaki 6 nesneyi **birebir** kopyala ve `];` ile kapat. `src/app/blog/page.tsx` içinde `export const blogPosts = [ ... ];` bloğunu sil ve import ekle:

```ts
import { blogPosts } from "@/lib/blog-posts";
```

Bu, mevcut `.next/types/app/blog/page.ts` "Property 'blogPosts' is incompatible" tip hatasını da giderir.

Doğrula: `git diff --stat src/app/blog/page.tsx src/lib/blog-posts.ts` — metin değişikliği yok, sadece taşıma.

- [ ] **Step 2: AtolyeHero**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FACTS = ["ETP teneke · DIN EN 10202", "0.15 – 3.00 mm sac", "Toptan / seri üretim"];

export function AtolyeHero() {
    return (
        <section className="atl-grain relative overflow-hidden border-b border-atl-line bg-atl-bg">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pb-20 pt-32 lg:grid-cols-12 lg:items-center lg:px-12 lg:pb-28 lg:pt-40">
                <div className="lg:col-span-6">
                    <span className="atl-rise font-mono text-[11px] uppercase tracking-[0.3em] text-atl-brass">İzmir · Alsancak atölyesi</span>
                    <h1 className="atl-rise atl-rise-2 mt-5 font-display text-5xl leading-[1.02] text-atl-text sm:text-6xl xl:text-7xl">
                        İzmir Alsancak&apos;ta <span className="text-atl-brass-light">teneke ve tel</span> imalatı
                    </h1>
                    <p className="atl-rise atl-rise-3 mt-6 max-w-xl text-lg leading-relaxed text-atl-muted">
                        Dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve rulo dilimleme. Toptan ve seri üretim; teknik çizim veya numuneyle teklif.
                    </p>
                    <div className="atl-rise atl-rise-3 mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link href="/teklif-al" className="inline-flex h-14 items-center justify-center gap-2 bg-atl-brass px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Teklif al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler" className="inline-flex h-14 items-center justify-center border border-atl-line px-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            Üretim hatları
                        </Link>
                    </div>
                    <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-atl-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-atl-muted">
                        {FACTS.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                </div>
                <figure className="atl-rise atl-rise-2 relative lg:col-span-6">
                    <div className="relative aspect-[4/3] overflow-hidden border border-atl-line bg-atl-surface">
                        <Image
                            src="/images/services/giyotin-kesim.webp"
                            alt="Veral Alsancak atölyesinde giyotin sac kesim hattı"
                            fill
                            priority
                            sizes="(min-width: 1024px) 640px, 92vw"
                            className="object-cover"
                        />
                        <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l border-t border-atl-brass" />
                        <span aria-hidden className="absolute right-3 top-3 h-5 w-5 border-r border-t border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-atl-brass" />
                        <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-atl-brass" />
                    </div>
                    <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-atl-muted">Alsancak atölyesi · giyotin hattı</figcaption>
                </figure>
            </div>
        </section>
    );
}
```

İkincil CTA spec'te "WhatsApp"tı; WhatsApp numarası Ek düzeltmeler'deki çelişkili telefonlardan birini seçmeyi gerektirdiği için `/hizmetler`'e yönlendirildi (sayfada global yüzen WhatsApp butonu zaten var). PR'da belirtilecek.

- [ ] **Step 3: MetalBaskiBand**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceImageAlt } from "@/lib/service-stock-images";

const IMAGE = "/images/services/metal-tabelalar.webp";

export function MetalBaskiBand() {
    return (
        <section className="border-b border-atl-line bg-atl-surface">
            <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                    <Image src={IMAGE} alt={serviceImageAlt(IMAGE, "UV baskılı metal tabelalar")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center px-6 py-16 lg:px-16">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">İkincil hizmet · UV baskı</span>
                    <h2 className="mt-3 font-display text-4xl leading-tight text-atl-text md:text-5xl">Metal tabela ve mıknatıslı poster baskısı</h2>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-atl-muted">
                        Kafe, restoran, atölye ve kurumsal promosyon için UV baskılı metal levha. Seri ve özel tasarım siparişleri teklif usulüyle alınır.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/teklif-al?hizmet=miknatisli-magnet" className="inline-flex h-12 items-center gap-2 bg-atl-brass px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-bg transition-colors hover:bg-atl-brass-light">
                            Baskı teklifi al <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/hizmetler/miknatisli-magnet" className="inline-flex h-12 items-center border border-atl-line px-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-atl-text transition-colors hover:border-atl-brass">
                            Detaylar
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 4: LatestPosts**

```tsx
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";
import { SectionHeading } from "@/components/atolye/SectionHeading";

export function LatestPosts() {
    const posts = blogPosts.slice(0, 3);
    return (
        <section className="border-b border-atl-line bg-atl-bg py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading eyebrow="Teknik raporlar" title="Atölyeden yazılar" />
                    <Link href="/blog" className="font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light hover:text-atl-text">Tüm yazılar →</Link>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col border border-atl-line bg-atl-surface transition-colors hover:border-atl-brass/70">
                            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                                <Image src={post.image} alt={serviceImageAlt(post.image, post.title)} fill sizes="(min-width: 768px) 30vw, 92vw" className={serviceImageFit(post.image)} />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-atl-brass">{post.category} · {post.readTime}</span>
                                <h3 className="mt-3 font-display text-xl leading-snug text-atl-text group-hover:text-atl-brass-light">{post.title}</h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-atl-muted">{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 5: ServicesHomeSection render'ını ServiceCard'a çevir**

`serviceCards` dizisine dokunma. Import satırlarını şu olsun:

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DirectEdit } from "@/components/admin/DirectEdit";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { ServiceCard } from "@/components/atolye/ServiceCard";
```

`export const ServicesHomeSection = ...` bloğunun tamamı:

```tsx
export const ServicesHomeSection = () => {
    return (
        <DirectEdit tab="other-services">
            <section id="hizmetler" className="scroll-mt-24 border-b border-atl-line bg-atl-bg py-20 lg:py-28">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Üretim hatlarımız"
                            title="Hassas Metal İşleme & Toptan İmalat"
                            description="İzmir Alsancak atölyemizde dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve UV baskılı metal levha üretiyoruz."
                        />
                        <Link href="/hizmetler" className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light hover:text-atl-text md:self-auto">
                            Tüm hatlar ve spekler <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {serviceCards.map((service) => (
                            <ServiceCard key={service.id} {...service} ctaLabel="Fiyat Teklifi Al" />
                        ))}
                    </div>
                    <p className="mt-10 border-t border-atl-line pt-6 font-mono text-xs text-atl-muted">
                        Hammadde: DIN EN 10202 normlu elektrolitik teneke (ETP). Ölçü ve kalınlık, numune üzerinden birlikte doğrulanır.
                    </p>
                </div>
            </section>
        </DirectEdit>
    );
};
```

(Kaldırılan: "ISO 9001:2015 kalite yönetim sistemine uygundur" iddiası ve "Hızlı Teklif Formu" butonu — CtaBand aynı işi görüyor.)

- [ ] **Step 6: Ana sayfayı yeniden kur**

`src/app/(shop)/page.tsx`: import'lar

```tsx
import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AtolyeHero } from "@/components/atolye/AtolyeHero";
import { ProcessSteps } from "@/components/atolye/ProcessSteps";
import { MetalBaskiBand } from "@/components/atolye/MetalBaskiBand";
import { LatestPosts } from "@/components/atolye/LatestPosts";
import { CtaBand } from "@/components/atolye/CtaBand";
import { ServicesHomeSection } from "@/components/sections/ServicesHomeSection";
```

`metadata.description`:

```ts
    description: "İzmir Alsancak'ta toptan dosya teli, takvim tenekesi, tef zili, giyotin sac kesim ve UV baskılı metal levha imalatı. Teknik çizim veya numuneyle teklif.",
```

`homeFaqs[0].answer`:

```ts
        answer: "Üretim tesisimiz İzmir Alsancak'tadır (1471 Sokak No:12/A).",
```

Default export:

```tsx
export default function ShopHomePage() {
    return (
        <main className="home-page min-h-screen bg-atl-bg pb-24 text-atl-text lg:pb-0">
            <FAQSchema items={homeFaqs} />
            <Navigation />
            <AtolyeHero />
            <ServicesHomeSection />
            <ProcessSteps />
            <MetalBaskiBand />
            <LatestPosts />
            <CtaBand />
            <Footer />
            <MobileStickyBar />
        </main>
    );
}
```

`StitchHero`, `StitchAssurance`, `ProcessSection`, `CustomerReviews` dosyaları silinmez.

- [ ] **Step 7: Lint + build**

Run: `npx eslint "src/app/(shop)/page.tsx" src/components/sections/ServicesHomeSection.tsx src/components/atolye src/lib/blog-posts.ts src/app/blog/page.tsx`
Expected: 0 error.
Run: `npm run build 2>&1 | Select-String "Compiled|Failed to compile|44/44"` → başarı.

- [ ] **Step 8: Görsel kontrol**

`/` 1280px + 375px, tam sayfa ekran görüntüsü. Beklenen sıra: hero → 6 kart (rozetler görselin altında, poster başlıkları açık) → 4 adım → metal baskı bandı → 3 blog kartı → CTA → footer. `Runtime.evaluate`: `[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)` → `[]`.

- [ ] **Step 9: Commit**

```bash
git add src/lib/blog-posts.ts src/app/blog/page.tsx src/components/atolye "src/app/(shop)/page.tsx" src/components/sections/ServicesHomeSection.tsx
git commit -m "feat(anasayfa): atolye tasarimiyla yeni ana sayfa; perakende bolumleri cikarildi"
```

---

### Task 6: Hizmetler ve hizmet detay sayfaları

**Files:**
- Modify: `src/app/hizmetler/page.tsx`
- Modify: `src/app/hizmetler/[slug]/page.tsx`

**Interfaces:**
- Consumes: `ServiceCard`, `SectionHeading`, `CtaBand`; codemod.

- [ ] **Step 1: /hizmetler kart grid'ini ServiceCard'a çevir**

`serviceCards` ve `dinSpecs` dizilerine dokunma. "6 BENTO CARDS" bölümündeki `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{serviceCards.map(...)}</div>` bloğunu şununla değiştir:

```tsx
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCards.map((service) => (
                        <ServiceCard key={service.id} {...service} ctaLabel="Fiyat / Numune Teklifi İste" />
                    ))}
                </div>
```

Import ekle: `import { ServiceCard } from "@/components/atolye/ServiceCard";`. Artık kullanılmayan `serviceImageAlt, serviceImageFit` import'unu kaldır.

- [ ] **Step 2: /hizmetler metin düzeltmeleri (kart dışı)**

| Yer | Eski | Yeni |
|---|---|---|
| `openGraph.description` | `1980'den bu yana İzmir Alsancak'ta mikron toleranslı metal presleme, giyotin kesim ve toptan tel imalatı.` | `İzmir Alsancak'ta metal presleme, giyotin kesim ve toptan tel imalatı.` |
| Hero rozeti | `İzmir Alsancak Fabrikası • 1980&apos;den Günümüze` | `İzmir Alsancak Atölyesi` |
| H1 | `Yarım Asırlık Zanaat, Mikron Hassasiyetinde Seri Üretim` | `Alsancak Atölyesinde Toptan Metal İmalatı` |

- [ ] **Step 3: Codemod'u iki dosyaya uygula**

Run: `node scripts/atolye-codemod.mjs src/app/hizmetler/page.tsx "src/app/hizmetler/[slug]/page.tsx"`
Expected: iki satır `updated`.
Run: `node scripts/atolye-codemod.mjs --check src/app/hizmetler/page.tsx "src/app/hizmetler/[slug]/page.tsx"`
Expected: `leftovers: 0` (varsa elle eşle: zemin → `atl-surface`/`atl-bg`, metin → `atl-text`/`atl-muted`).

- [ ] **Step 4: /hizmetler ana `<main>` ve hero fotoğrafı**

`<main className="min-h-screen bg-atl-bg text-atl-text">` (codemod sonrası `bg-atl-bg` olmalı; değilse düzelt). Hero görsel üstündeki `bg-gradient-to-t from-black/85` aynı kalır.

- [ ] **Step 5: Detay sayfası metni**

`src/app/hizmetler/[slug]/page.tsx` sağ sütundaki `Kurumsal üretim garantisi` → `Kurumsal seri üretim`. Hero ve iç başlıklara `font-display` ekle: `<h1 className="text-4xl md:text-5xl font-bold ...">` → `className="font-display text-4xl md:text-5xl text-atl-text leading-tight mb-4"`; "ile seri üretim" `<h3>` ve "Diğer hizmetler" `<h2>` için `font-bold` → `font-display`.

`service.slaText` değerlerine ("Ömür Boyu Renk Garantisi" vb.) dokunma — hizmet içeriği; PR'da listelenecek.

- [ ] **Step 6: Build + görsel kontrol**

Build başarılı. `/hizmetler`, `/hizmetler/dosya-teli`, `/hizmetler/takvim-tenekesi` (galeride sade poster görünür), `/hizmetler/tef-zili`, `/hizmetler/miknatisli-magnet` — 1280 + 375 ekran görüntüsü. Kontrol: DIN tablosu koyu zeminde okunur, kart metinleri değişmemiş (`git diff feat/homepage-vision-cart-off -- src/app/hizmetler/page.tsx | Select-String 'description:|title:|val:'` çıktısında sadece müşteri commit'lerindeki değişiklikler).

- [ ] **Step 7: Commit**

```bash
git add src/app/hizmetler
git commit -m "feat(hizmetler): atolye tasarimi, ortak hizmet karti ve sade metinler"
```

---

### Task 7: Blog ve yazar sayfaları

**Files:**
- Modify: `src/components/blog/BlogListClient.tsx`, `src/components/blog/BlogPostClient.tsx`, `src/components/blog/AuthorCard.tsx`
- Modify: `src/app/yazar/oguzcan-veral/page.tsx`, `src/app/yazar/atila-bila/page.tsx`

- [ ] **Step 1: Codemod**

Run: `node scripts/atolye-codemod.mjs src/components/blog/BlogListClient.tsx src/components/blog/BlogPostClient.tsx src/components/blog/AuthorCard.tsx src/app/yazar/oguzcan-veral/page.tsx src/app/yazar/atila-bila/page.tsx`
Run: `node scripts/atolye-codemod.mjs --check` (aynı dosyalar) → `leftovers: 0`, kalanları elle eşle.

- [ ] **Step 2: Yazı gövdesine `atl-prose`**

`BlogPostClient.tsx` içinde makale içeriğini saran `<div className="text-zinc-800 text-base md:text-lg leading-relaxed space-y-6"` (codemod sonrası `text-atl-text ...`) className'ine `atl-prose` ekle ve rengi bıraktır: `className="atl-prose text-base md:text-lg space-y-6"`. H1 başlıklarına (`BlogPostClient` ve `BlogListClient` öne çıkan başlık) `font-display` ekle, `font-black`/`font-extrabold` kaldır.

- [ ] **Step 3: Metin düzeltmeleri (iddia)**

| Dosya | Eski | Yeni |
|---|---|---|
| `AuthorCard.tsx:35` | `… 4K endüstriyel UV baskı hatlarına kadar 35.000+ siparişin üretim kalitesini, …` | `… 4K endüstriyel UV baskı hatlarına kadar siparişlerin üretim kalitesini, …` |
| `yazar/oguzcan-veral/page.tsx:149` | `… 1471 Sokak atölyemizde 1980 yılından bu yana süregelen torna, …` | `… 1471 Sokak atölyemizde süregelen torna, …` |
| `yazar/oguzcan-veral/page.tsx:155-159` | `1980` ve `35.000+` istatistik kutuları | İki kutu kaldırılır (kalan kutular grid'de kalır); grid kolon sayısını kalan kutu sayısına eşitle |

`/hero-izmir-metal-poster.jpg` yazar fotoğrafı kullanımına dokunma (Ek düzeltmeler).

- [ ] **Step 4: Build + görsel kontrol**

`/blog`, `/blog/dosya-teli-ve-arsiv-sistemleri`, `/blog/takvim-tenekesi-imalati-izmir`, `/blog/miknatisli-magnet-ve-metal-poster-estetigi`, `/yazar/oguzcan-veral` — 1280 + 375. Uzun metin satır uzunluğu ≤ ~68ch, kontrast okunur.

- [ ] **Step 5: Commit**

```bash
git add src/components/blog src/app/yazar
git commit -m "feat(blog): atolye tasarimi, okunur yazi govdesi, dogrulanamayan sayilar kaldirildi"
```

---

### Task 8: Kurumsal sayfalar — hakkımızda, iletişim, teklif, SSS, üretim

**Files:**
- Modify: `src/app/hakkimizda/page.tsx`, `src/app/iletisim/page.tsx`, `src/app/teklif-al/page.tsx`, `src/app/teklif-al/basarili/page.tsx`, `src/components/contact/QuoteForm.tsx`, `src/app/sss/page.tsx`, `src/app/uretim/page.tsx`, `src/app/uretim/[hizmet]/page.tsx`, `src/components/seo/Breadcrumb.tsx`
- Modify: `src/components/seo/LocalBusinessSchema.tsx:13`

- [ ] **Step 1: Codemod**

Run: `node scripts/atolye-codemod.mjs src/app/hakkimizda/page.tsx src/app/iletisim/page.tsx src/app/teklif-al/page.tsx src/app/teklif-al/basarili/page.tsx src/components/contact/QuoteForm.tsx src/app/sss/page.tsx src/app/uretim/page.tsx "src/app/uretim/[hizmet]/page.tsx" src/components/seo/Breadcrumb.tsx`
Run: `--check` aynı listeyle → `leftovers: 0`; kalanları elle eşle. Form `input`/`textarea`/`select` zeminleri `bg-atl-bg`, kenarlık `border-atl-line`, focus `focus:border-atl-brass`, placeholder `placeholder:text-atl-muted/60` olmalı — QuoteForm'da kontrol et.

- [ ] **Step 2: Sayfa H1/H2'lerine `font-display`**

Her dosyadaki `<h1` ve bölüm `<h2` elemanlarında `font-black`/`font-extrabold`/`font-bold` → `font-display` (ağırlık sınıfı kaldırılır; DM Serif Display tek ağırlık).

- [ ] **Step 3: Metin düzeltmeleri (iddia)**

| Dosya | Eski | Yeni |
|---|---|---|
| `hakkimizda/page.tsx:25` title | `Hakkımızda \| Veral Teneke Ticaret \| İzmir Alsancak 1980` | `Hakkımızda \| Veral Teneke Ticaret \| İzmir Alsancak` |
| `hakkimizda/page.tsx:26` description | `1980'den bu yana İzmir Alsancak 1471 Sokak'ta … imalatı. Yarım asırlık torna ve metal şekillendirme hafızası.` | `İzmir Alsancak 1471 Sokak'ta toptan dosya teli, takvim tenekesi, giyotin sac kesim ve 4K UV mıknatıslı metal poster imalatı.` |
| `hakkimizda/page.tsx:32` og description | `İzmir Alsancak'ta 40 yılı aşkın süredir toptan …` | `İzmir Alsancak'ta toptan …` |
| `hakkimizda/page.tsx:93` | `"foundingDate": "1980",` | satır silinir |
| `hakkimizda/page.tsx:135` | `İZMİR ALSANCAK · 1980&apos;DEN BUGÜNE` | `İZMİR ALSANCAK ATÖLYESİ` |
| `hakkimizda/page.tsx:139` | `Yarım Asırlık Metal Hafızası ve Zanaat Tutkusu` | `Alsancak'ta Metal ve Teneke Zanaatı` |
| `hakkimizda/page.tsx:143` | `… Alsancak&apos;ta 1980 yılında kurulmuş, Türkiye&apos;nin en köklü metal kırtasiye, sac işleme ve teneke kalıplama atölyelerinden biridir.` | `… Alsancak&apos;ta faaliyet gösteren bir metal kırtasiye, sac işleme ve teneke kalıplama atölyesidir.` |
| `hakkimizda/page.tsx:179` | `1471 Sokak No:12/A Konak / İzmir · 1980&apos;den Günümüze` | `1471 Sokak No:12/A Konak / İzmir` |
| `hakkimizda/page.tsx:194` | `35.000+` istatistik kutusu | kutu kaldırılır, grid kolonu kalan sayıya eşitlenir |
| `hakkimizda/page.tsx:215` | `Alsancak&apos;ta Başlayan Yarım Asırlık Zanaat` | `Alsancak&apos;ta Başlayan Zanaat` |
| `hakkimizda/page.tsx:39` timeline `year: "1980"` | — | **dokunma**, PR'da sor (zaman çizelgesinin ilk adımı; kaldırmak yapıyı bozar) |
| `sss/page.tsx:42` | `… ±0.08 mm tolerans garantisi verilmektedir.` | `… ±0.08 mm toleransla çalışılmaktadır.` |
| `sss/page.tsx:52` | `… tablolarımız doğrudan güneş ışığına, neme ve çizilmelere karşı 10 yıl renk canlılığı garantilidir.` | `… tablolarımız güneş ışığına, neme ve çizilmelere karşı dayanıklıdır.` |
| `LocalBusinessSchema.tsx:13` | `VERAL Torna & Teneke Ticaret, Türkiye'nin lider toptan dosya teli üreticisi ve takvim tenekesi imalatçısıdır. … 40 yılı aşkın tecrübe ile en uygun fiyatlı toptan metal imalat çözümleri sunuyoruz.` | `VERAL Torna & Teneke Ticaret, İzmir Alsancak merkezli toptan dosya teli ve takvim tenekesi imalatçısıdır. Tesisimizde ayrıca UV baskılı teneke posterler, mıknatıslı magnet ve tef zili üretimi yapmaktayız.` |

Adres/telefon/e-posta değerlerine dokunma (`iletisim`, `teklif-al`, `hakkimizda` içindeki `tel:`, `wa.me`, `LOG@VERAL.COM`, harita linki).

- [ ] **Step 4: Build + görsel kontrol**

`/hakkimizda`, `/iletisim`, `/teklif-al` (formu doldurup göndermeden alan focus durumlarını kontrol et), `/sss`, `/uretim` — 1280 + 375.

Doğrula: `git diff feat/homepage-vision-cart-off -- src/app/iletisim src/app/teklif-al src/app/hakkimizda | Select-String '^[-+].*(tel:|wa\.me|@VERAL|maps\.app|1512 Sk|1471 Sokak No:12/A)'` → sadece `hakkimizda:179`'daki "· 1980'den Günümüze" kısaltmasından kaynaklanan eşleşmeler (adres değeri aynı).

- [ ] **Step 5: Commit**

```bash
git add src/app/hakkimizda src/app/iletisim src/app/teklif-al src/components/contact src/app/sss src/app/uretim src/components/seo
git commit -m "feat(kurumsal): atolye tasarimi ve dogrulanabilir metinler"
```

---

### Task 9: Yasal sayfalar, yardımcı bileşenler ve mağaza noindex

**Files:**
- Modify: `src/components/layout/LegalPageLayout.tsx`
- Modify (codemod): 8 yasal sayfa + `src/components/layout/CookieConsent.tsx`, `src/components/layout/WhatsAppButton.tsx`, `src/components/layout/ScrollToTop.tsx`
- Create: `src/app/hesabim/layout.tsx`, `src/app/siparis-sorgula/layout.tsx`, `src/app/siparis/layout.tsx`, `src/app/koleksiyon/layout.tsx`, `src/app/urunler/[slug]/layout.tsx`

- [ ] **Step 1: LegalPageLayout**

```tsx
import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { PageContainer } from "@/components/layout/PageContainer";

type LegalPageLayoutProps = {
    title: string;
    eyebrow?: string;
    updatedAt?: string;
    children: React.ReactNode;
};

export function LegalPageLayout({ title, eyebrow = "Yasal metin", updatedAt, children }: LegalPageLayoutProps) {
    return (
        <PageShell variant="muted">
            <PageContainer className="max-w-3xl">
                <header className="mb-10 space-y-3 border-b border-atl-line pb-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">{eyebrow}</p>
                    <h1 className="font-display text-4xl leading-tight text-atl-text md:text-5xl">{title}</h1>
                    {updatedAt && <p className="text-sm text-atl-muted">Son güncelleme: {updatedAt}</p>}
                </header>
                <div className="atl-prose space-y-8 text-sm">{children}</div>
            </PageContainer>
        </PageShell>
    );
}
```

- [ ] **Step 2: Codemod**

Run: `node scripts/atolye-codemod.mjs src/app/kvkk/page.tsx src/app/gizlilik/page.tsx src/app/cerez/page.tsx src/app/kosullar/page.tsx src/app/sartlar/page.tsx src/app/mesafeli-satis/page.tsx src/app/on-bilgilendirme/page.tsx src/app/iade-iptal/page.tsx src/components/layout/CookieConsent.tsx src/components/layout/WhatsAppButton.tsx src/components/layout/ScrollToTop.tsx`
`--check` → `leftovers: 0`.

- [ ] **Step 3: noindex layout'ları**

Beş dosyanın her biri aynı içerik:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function NoIndexLayout({ children }: { children: React.ReactNode }) {
    return children;
}
```

Konumlar: `src/app/hesabim/layout.tsx`, `src/app/siparis-sorgula/layout.tsx`, `src/app/siparis/layout.tsx`, `src/app/koleksiyon/layout.tsx`, `src/app/urunler/[slug]/layout.tsx`.

- [ ] **Step 4: Build + doğrulama**

Build başarılı. `npx next start -p 3100` sonrası:
Run: `(Invoke-WebRequest http://127.0.0.1:3100/siparis-sorgula -UseBasicParsing).Content -match 'name="robots" content="noindex, nofollow"'` → `True`.
Aynısı `/hesabim` için `True`; `/hizmetler` için `False`.
`/kvkk` 1280 + 375 ekran görüntüsü; çerez bandı ve WhatsApp butonu koyu temada okunur.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout src/app/kvkk src/app/gizlilik src/app/cerez src/app/kosullar src/app/sartlar src/app/mesafeli-satis src/app/on-bilgilendirme src/app/iade-iptal src/app/hesabim/layout.tsx src/app/siparis-sorgula/layout.tsx src/app/siparis/layout.tsx src/app/koleksiyon/layout.tsx "src/app/urunler/[slug]/layout.tsx"
git commit -m "feat(yasal): atolye tasarimi; magaza sayfalari noindex"
```

---

### Task 10: Son doğrulama ve PR

**Files:** yok (doğrulama + PR açıklaması)

- [ ] **Step 1: Codemod testleri + lint + build**

Run: `node --test scripts/atolye-codemod.test.mjs` → `# fail 0`.
Run: `git diff --name-only feat/homepage-vision-cart-off -- src | ForEach-Object { npx eslint $_ }` → yeni error yok (dokunulmamış satırlardaki önceden var olan `no-explicit-any` hataları hariç; `git stash` ile taban karşılaştırması yap).
Run: `npm run build` → başarılı.

- [ ] **Step 2: Kalan açık sınıf taraması**

Run: `node scripts/atolye-codemod.mjs --check (git ls-files "src/app/*.tsx" "src/components/**/*.tsx" | Where-Object { $_ -notmatch 'admin|product|cart|checkout|interactive|test|ui-playground|koleksiyon|urunler|hesabim|siparis' })`
Expected: `leftovers: 0` veya sadece kasıtlı istisnalar (rapora yaz).

- [ ] **Step 3: Ek düzeltmeler korundu mu**

Run: `git diff feat/homepage-vision-cart-off -- src | Select-String '^-.*(Ti̇caret|© 2024|LOG@VERAL|maps\.app\.goo\.gl/VERAL|tel:\+90|wa\.me/90|1512 Sk)'`
Expected: Her `-` satırının karşılığında aynı değeri içeren bir `+` satırı var (Navigation/Footer yeniden yazımı); değer kaybı yok.

- [ ] **Step 4: Tam ekran görüntüsü turu**

1280 ve 375px: `/`, `/hizmetler`, `/hizmetler/dosya-teli`, `/hizmetler/takvim-tenekesi`, `/hizmetler/tef-zili`, `/hizmetler/miknatisli-magnet`, `/blog`, `/blog/dosya-teli-ve-arsiv-sistemleri`, `/blog/takvim-tenekesi-imalati-izmir`, `/blog/miknatisli-magnet-ve-metal-poster-estetigi`, `/hakkimizda`, `/iletisim`, `/teklif-al`, `/kvkk`. Her sayfada `[...document.images].filter(i=>!i.complete||i.naturalWidth===0)` → boş.

- [ ] **Step 5: Push + PR**

```bash
git push -u origin feat/veral-gercek-urun-gorselleri
gh pr create --base feat/homepage-vision-cart-off --title "Müşteri talepleri: gerçek ürün görselleri + atölye yeniden tasarımı" --body-file <PR açıklaması>
```

PR açıklaması bölümleri: (1) müşteri değişiklikleri (PR.md §4) ve değiştirilen dosyalar; (2) metinlerin kaynağı — koddaki `defaultContent`; Supabase `.env.local` adresi `ENOTFOUND`, admin'de kayıtlı farklı metin varsa bağlantı dönünce detay metinleri değişebilir, görseller koddan; (3) yeniden tasarım özeti + spec/plan linkleri; (4) metin değişiklikleri eski → yeni tablosu (Task 5/6/7/8); (5) spec'ten sapmalar (runtime font, CSS animasyon, hero ikincil CTA, sabit menü); (6) Belirsizlikler: PR.md §5 maddeleri + posterlerin render/AI görünümü + metal tabela fotoğrafındaki turuncu şerit ve marka logoları + hizmet kartlarındaki "%100 uyumludur" / "10 Yıl Güneş Işığında Solmama" / `slaText` garantileri + blog içindeki "10 yıllık renk canlılığı garantisi" ve "1980" + hakkımızda "1983" vs "1980" + arama Enter'ı `/urunler` yönlendirmesine düşüyor; (7) önce/sonra ekran görüntüleri.

## Self-review notları

- Spec §2 kapsam: ortak katman (T1, T3), ana sayfa (T5), hizmetler (T6), blog/yazar (T7), kurumsal (T8), yasal + noindex (T9). ✓
- Spec §3 token/font/doku/hareket: T1 (sapmalar Global Constraints'te). ✓
- Spec §4 bileşenler: SectionHeading, BrassRule, ServiceCard, ProcessSteps, CtaBand (T3/T4). ✓
- Spec §5 ana sayfa sırası ve kaldırılanlar: T5 Step 6. ✓ Header menü ve sepet/hesap: T3. ✓
- Spec §6 metin kuralları: T5/T6/T7/T8 tabloları; dokunulmayan hizmet/blog iddiaları PR'da. ✓
- Spec §8 test: T10. ✓
