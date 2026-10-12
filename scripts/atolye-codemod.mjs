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
