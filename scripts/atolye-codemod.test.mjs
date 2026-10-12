import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as codemod from "./atolye-codemod.mjs";

const { transform, findLeftovers, findContrastRisks } = codemod;

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

test("opaklıklı pirinç zeminde beyaz metin koyulaşır", () => {
  assert.equal(transform(`className="bg-amber-600/90 text-white"`), `className="bg-atl-brass/90 text-atl-bg"`);
});

test("hover pirinç-açık zemininde hover:text-white koyulaşır", () => {
  assert.equal(
    transform(`className="bg-amber-500 hover:bg-amber-700 hover:text-white"`),
    `className="bg-atl-brass hover:bg-atl-brass-light hover:text-atl-bg"`
  );
});

test("aynı varyant önekli pirinç zemin, yığılmış önekler dahil", () => {
  assert.equal(
    transform(`className="md:bg-amber-600 md:text-white md:hover:bg-amber-700 md:hover:text-white"`),
    `className="md:bg-atl-brass md:text-atl-bg md:hover:bg-atl-brass-light md:hover:text-atl-bg"`
  );
});

test("beyaz metnin opaklığı korunur", () => {
  assert.equal(transform(`className="bg-amber-600 text-white/90"`), `className="bg-atl-brass text-atl-bg/90"`);
});

test("pirinç olmayan zeminlerdeki text-white'a dokunmaz", () => {
  const src = `className="bg-amber-50 text-white"`;
  assert.equal(transform(src), `className="bg-atl-brass-tint text-white"`);
  const other = `className="bg-black text-white md:bg-zinc-900 md:text-white"`;
  assert.equal(transform(other), other);
  const prefixMismatch = `className="hover:bg-amber-600 text-white"`;
  assert.equal(transform(prefixMismatch), `className="hover:bg-atl-brass text-white"`);
});

test("transform idempotenttir", () => {
  const src = `className="bg-amber-600/90 hover:bg-amber-700 text-white hover:text-white/80 md:bg-white"`;
  const once = transform(src);
  assert.equal(once, `className="bg-atl-brass/90 hover:bg-atl-brass-light text-atl-bg hover:text-atl-bg/80 md:bg-atl-surface"`);
  assert.equal(transform(once), once);
});

test("findContrastRisks pirinç zemin + text-white satırlarını bulur", () => {
  const src = [
    `cn("bg-atl-brass text-white")`,
    `cn("bg-black text-white")`,
    `<a className="bg-atl-brass text-atl-bg">`,
    `cn("md:bg-atl-brass-light/90", "hover:text-white/80")`,
    `cn("bg-[var(--color-brand-accent)] text-white")`,
    `cn("bg-atl-brass-tint text-white")`,
  ].join("\n");
  assert.deepEqual(findContrastRisks(src), [1, 4, 5]);
});

test("findLeftovers koyu temada geçerli beyaz metin/kenarlığı raporlamaz, beyaz zemini raporlar", () => {
  const src = `className="text-white hover:text-white/80 text-white/5 border-white/10 md:border-white/100 bg-white bg-white/90 hover:bg-white/5 border-white"`;
  assert.deepEqual(findLeftovers(src), ["bg-white", "bg-white/90", "hover:bg-white/5", "border-white"]);
});

const CLI = fileURLToPath(new URL("./atolye-codemod.mjs", import.meta.url));
const runCli = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8" });

test("CLI: dosya argümanı yoksa kullanım mesajı ve çıkış kodu 1", () => {
  for (const args of [[], ["--check"]]) {
    const r = runCli(...args);
    assert.equal(r.status, 1);
    assert.match(r.stderr, /usage/i);
  }
});

test("CLI --check: sorun varsa çıkış kodu 1 ve contrast satırı, yoksa 0", () => {
  const dir = mkdtempSync(join(tmpdir(), "atolye-"));
  try {
    const bad = join(dir, "bad.tsx");
    const good = join(dir, "good.tsx");
    writeFileSync(bad, `x\ncn("bg-atl-brass text-white")\n`);
    writeFileSync(good, `<a className="bg-atl-brass text-atl-bg">`);
    const r = runCli("--check", bad);
    assert.equal(r.status, 1);
    assert.match(r.stdout, new RegExp(`${bad.replace(/[\\.]/g, "\\$&")}:2 contrast`));
    assert.match(r.stdout, /contrast risks: 1/);
    const ok = runCli("--check", good);
    assert.equal(ok.status, 0);
    assert.match(ok.stdout, /leftovers: 0/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("CLI: eksik dosya stderr'e missing yazar, kod 1, diğer dosyalar işlenir", () => {
  const dir = mkdtempSync(join(tmpdir(), "atolye-"));
  try {
    const missing = join(dir, "yok.tsx");
    const real = join(dir, "var.tsx");
    writeFileSync(real, `<a className="bg-white">`);
    const r = runCli(real, missing);
    assert.equal(r.status, 1);
    assert.ok(r.stderr.includes(`missing: ${missing}`), r.stderr);
    assert.doesNotMatch(r.stderr, /ENOENT|at /);
    assert.equal(readFileSync(real, "utf8"), `<a className="bg-atl-surface">`);
    const c = runCli("--check", missing, real);
    assert.equal(c.status, 1);
    assert.ok(c.stderr.includes(`missing: ${missing}`), c.stderr);
    assert.match(c.stdout, /leftovers: 0/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
