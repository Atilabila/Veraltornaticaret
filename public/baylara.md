Sol sidebar görünür kalacak ve sticky olacak (scroll ettikçe aşağı “insin”).

Sağda ürünler 2 kolon (3 değil) aşağı doğru akacak.

Mobilde taşma/kesilme olmaması için container + grid ölçüleri çok net tanımlanacak.

Aşağıya hem şema (referans) hem de Codex 5.2’ye vereceğin JSON prompt bıraktım.

Şema Referans
Mobil layout (senin istediğin: sidebar + 2 kolon grid)
┌───────────────────────────────────────────────┐
│ HEADER (sticky)                                │
└───────────────────────────────────────────────┘
┌───────────────┬───────────────────────────────┐
│ SIDEBAR        │ MAIN                          │
│ (sticky top)   │ Tabs / Sort                   │
│ Search         │ Product Grid (2 columns)      │
│ Cart summary   │ [Card][Card]                  │
│ Recently       │ [Card][Card]                  │
│ Categories     │ [Card][Card]                  │
│ Filters        │ ...                           │
└───────────────┴───────────────────────────────┘

Sticky kuralı

Sticky sidebar’ın atasında overflow: hidden/auto olmamalı (aksi halde sticky çalışmaz / bozulur).

Sidebar’a top-24 gibi header yüksekliği kadar offset verilir.

Codex 5.2 JSON Prompt (Komut)
{
  "task": "On /urunler mobile, keep left sidebar visible + sticky, and make product grid 2 columns (not 3), with no horizontal clipping",
  "stack": "Next.js App Router + React + TailwindCSS",
  "page": "/urunler",
  "requirements": {
    "mobile_layout": {
      "overall": "Two-column page on mobile: left sidebar + right main",
      "sidebar": {
        "visible": true,
        "sticky": true,
        "top_offset": "match header height (use top-20/top-24 depending on header)",
        "max_height": "calc(100vh - headerOffset)",
        "scrollable_inside": true
      },
      "product_grid": {
        "columns": 2,
        "gap": "gap-4 to gap-6",
        "card_media": "fixed aspect ratio so images never become huge"
      },
      "no_cutoff": "No right-side clipping; no horizontal overflow"
    },
    "desktop_layout": {
      "keep_existing": true,
      "grid_cols": "lg:grid-cols-[300px_1fr]"
    }
  },
  "implementation_steps": [
    {
      "step": "Ensure viewport meta is correct",
      "details": "In app/layout.tsx or head, ensure <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" /> exists."
    },
    {
      "step": "Update page wrapper to a predictable max width + padding",
      "details": "Replace Tailwind container with: mx-auto w-full max-w-screen-2xl px-3 sm:px-4 md:px-6"
    },
    {
      "step": "Create a responsive 2-column layout even on mobile",
      "details": "Use grid with fixed sidebar width on mobile: grid-cols-[220px_1fr] (or 240px). On larger screens: lg:grid-cols-[300px_1fr]. Ensure the wrapper has w-full and does not use w-screen inside padded parents."
    },
    {
      "step": "Make sidebar sticky and independently scrollable",
      "details": "Sidebar wrapper: sticky top-20 (or top-24), self-start. Inside sidebar: max-h-[calc(100vh-6rem)] overflow-y-auto pr-1. Ensure no parent of sticky has overflow-hidden/auto."
    },
    {
      "step": "Force product grid to 2 columns on mobile",
      "details": "Product grid classes must be: grid grid-cols-2 gap-4 sm:gap-6 (NOT grid-cols-3 on mobile). Optionally: md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3."
    },
    {
      "step": "Prevent huge product images",
      "details": "In ProductCard media wrapper enforce aspect ratio: relative w-full overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-950/20. Use next/image fill className='object-cover' sizes='(min-width:1024px) 380px, 45vw'."
    },
    {
      "step": "Fix any horizontal overflow",
      "details": "Search and replace offending utilities: w-screen inside padded parents -> w-full; remove min-w-[...] or w-[...] that exceed viewport. Add html/body { overflow-x: clip; } only after removing root cause."
    }
  ],
  "tailwind_snippets": {
    "page_wrapper": "mx-auto w-full max-w-screen-2xl px-3 sm:px-4 md:px-6",
    "mobile_two_col_layout": "grid grid-cols-[220px_1fr] gap-4 sm:grid-cols-[240px_1fr] sm:gap-6 lg:grid-cols-[300px_1fr] lg:gap-10 items-start",
    "sidebar_sticky": "sticky top-24 self-start",
    "sidebar_inner_scroll": "max-h-[calc(100vh-6rem)] overflow-y-auto pr-1",
    "product_grid_2col": "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3",
    "product_media": "relative w-full overflow-hidden rounded-2xl aspect-[4/3] bg-neutral soll's an (remove bg-white) ring-1 ring-white/10"
  },
  "acceptance_criteria": [
    "Mobile shows left sidebar + right products simultaneously (no hidden sidebar)",
    "On mobile product grid is exactly 2 columns (not 3)",
    "Sidebar remains sticky while scrolling and can scroll internally if it exceeds viewport height",
    "No right-side clipping / no horizontal cutoff across the page",
    "Product images are not oversized; cards look consistent"
  ],
  "output_format": {
    "request": [
      "Return a patch/diff for the files you change (CatalogContainer.tsx and ProductCard.tsx at minimum)",
      "List the exact className changes for: page wrapper, layout grid, sidebar wrapper, product grid, product media wrapper",
      "Mention any removed w-screen/min-w/fixed-width utilities that caused overflow"
    ]
  }
}


Not: JSON içinde product_media satırında yanlışlıkla “bg-neutral…” gibi bir parça kaldı; Codex’e verirken o satırı şu şekilde temiz kullan:
"product_media": "relative w-full overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-950/20 ring-1 ring-white/10"

İstersen ben bunu bir tık daha “senin mevcut component isimlerine” göre özelleştiririm:
CatalogContainer.tsx içinde layout grid’i ve ProductGrid/ProductCard class’larını nerede tanımlıyorsun? (2 kısa snippet atman yeter).