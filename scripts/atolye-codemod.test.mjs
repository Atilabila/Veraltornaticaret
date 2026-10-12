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
