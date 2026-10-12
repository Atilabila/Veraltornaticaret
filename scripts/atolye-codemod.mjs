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

const BRASS = String.raw`bg-(?:atl-brass(?:-light)?|\[var\(--color-brand-accent\)\])(?:\/\d{1,3})?`;
const WHITE = String.raw`text-white(\/\d{1,3})?`;
const BRASS_TOKEN = new RegExp(String.raw`^((?:[a-z0-9-]+:)*)${BRASS}$`);
const WHITE_TOKEN = new RegExp(String.raw`^((?:[a-z0-9-]+:)*)${WHITE}$`);

// Only className values: Turkish apostrophes in JSX text must not pair up as quotes.
function fixContrast(source) {
  return source.replace(/(className=\{?\s*)(["'`])([^"'`]*)\2/g, (literal, head, quote, body) => {
    const tokens = body.split(/(\s+)/);
    const brassPrefixes = new Set(tokens.map((t) => t.match(BRASS_TOKEN)?.[1]).filter((p) => p !== undefined));
    const next = tokens
      .map((t) => {
        const m = t.match(WHITE_TOKEN);
        return m && brassPrefixes.has(m[1]) ? `${m[1]}text-atl-bg${m[2] ?? ""}` : t;
      })
      .join("");
    return `${head}${quote}${next}${quote}`;
  });
}

const EDGE_L = String.raw`(?<=^|[\s"'\`{:])`;
const EDGE_R = String.raw`(?=$|[\s"'\`}])`;
const BRASS_ANY = new RegExp(`${EDGE_L}${BRASS}${EDGE_R}`);
const WHITE_ANY = new RegExp(`${EDGE_L}${WHITE}${EDGE_R}`);

export function findContrastRisks(source) {
  return source
    .split("\n")
    .flatMap((line, i) => (BRASS_ANY.test(line) && WHITE_ANY.test(line) ? [i + 1] : []));
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
  if (!files.length) {
    console.error("usage: node scripts/atolye-codemod.mjs [--check] <file...>");
    process.exit(1);
  }
  let leftoverTotal = 0;
  let riskTotal = 0;
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    if (check) {
      const left = findLeftovers(src);
      leftoverTotal += left.length;
      if (left.length) console.log(`${file}: ${[...new Set(left)].join(" ")}`);
      const risks = findContrastRisks(src);
      riskTotal += risks.length;
      for (const line of risks) console.log(`${file}:${line} contrast`);
    } else {
      const out = transform(src);
      if (out !== src) writeFileSync(file, out);
      console.log(`${out === src ? "unchanged" : "updated  "} ${file}`);
    }
  }
  if (check) {
    console.log(`leftovers: ${leftoverTotal}`);
    console.log(`contrast risks: ${riskTotal}`);
    if (leftoverTotal + riskTotal > 0) process.exitCode = 1;
  }
}
