# -*- coding: utf-8 -*-
"""
GUI: End-user Excel template generator for /admin/urunler bulk upload.

Build to EXE:
  powershell -ExecutionPolicy Bypass -File scripts\\build_bulk_excel_wizard_exe.ps1
"""

from __future__ import annotations

import os
import sys
import traceback
import tkinter as tk
from tkinter import filedialog, messagebox

from _bulk_excel_template import build_workbook


APP_TITLE = "Toplu Ürün Excel Şablonu Oluşturucu"


def main() -> int:
    root = tk.Tk()
    root.title(APP_TITLE)
    root.geometry("660x320")
    root.resizable(False, False)

    out_var = tk.StringVar(value=os.path.abspath("bulk-urunler-template.xlsx"))
    rows_var = tk.StringVar(value="200")
    examples_var = tk.BooleanVar(value=True)

    def choose_out():
        path = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel Workbook", "*.xlsx")],
            initialfile=os.path.basename(out_var.get()),
            title="Kaydedilecek Excel dosyasını seçin",
        )
        if path:
            out_var.set(path)

    def generate():
        try:
            try:
                rows = int(rows_var.get().strip())
            except ValueError:
                messagebox.showerror("Hata", "Satır sayısı sayı olmalı.")
                return

            if rows < 1 or rows > 500:
                messagebox.showerror("Hata", "Satır sayısı 1 ile 500 arasında olmalı.")
                return

            out_path = out_var.get().strip()
            if not out_path:
                messagebox.showerror("Hata", "Dosya adı boş olamaz.")
                return

            if not out_path.lower().endswith(".xlsx"):
                out_path = out_path + ".xlsx"
                out_var.set(out_path)

            wb = build_workbook(max_rows=rows, include_examples=bool(examples_var.get()))
            wb.save(out_path)

            messagebox.showinfo(
                "Tamam",
                "Şablon oluşturuldu:\n"
                f"{out_path}\n\n"
                "Doldurduktan sonra /admin/urunler sayfasına kopyala-yapıştır yapabilirsiniz.",
            )

            # Try to open the file on Windows.
            if sys.platform.startswith("win"):
                try:
                    os.startfile(out_path)  # type: ignore[attr-defined]
                except Exception:
                    pass
        except ModuleNotFoundError as e:
            if e.name == "openpyxl":
                messagebox.showerror(
                    "Eksik Paket",
                    "openpyxl yüklü değil.\n\nKomut:\n  pip install openpyxl",
                )
                return
            messagebox.showerror("Hata", f"Modül bulunamadı: {e.name}")
        except Exception:
            traceback.print_exc()
            messagebox.showerror("Hata", "Beklenmeyen hata oluştu. Konsol çıktısına bakın.")

    pad = 12
    frm = tk.Frame(root, padx=pad, pady=pad)
    frm.pack(fill="both", expand=True)

    title = tk.Label(frm, text="Excel Toplu Ürün Şablonu", font=("Segoe UI", 16, "bold"))
    title.pack(anchor="w", pady=(0, 8))

    desc = tk.Label(
        frm,
        text="Bu araç /admin/urunler toplu ürün girişi için hazır Excel şablonu üretir.",
        font=("Segoe UI", 10),
    )
    desc.pack(anchor="w", pady=(0, 14))

    row1 = tk.Frame(frm)
    row1.pack(fill="x", pady=6)
    tk.Label(row1, text="Kaydedilecek dosya:", width=18, anchor="w").pack(side="left")
    tk.Entry(row1, textvariable=out_var).pack(side="left", fill="x", expand=True, padx=(0, 8))
    tk.Button(row1, text="Seç...", command=choose_out, width=10).pack(side="left")

    row2 = tk.Frame(frm)
    row2.pack(fill="x", pady=6)
    tk.Label(row2, text="Satır sayısı (1-500):", width=18, anchor="w").pack(side="left")
    tk.Entry(row2, textvariable=rows_var, width=10).pack(side="left")
    tk.Checkbutton(row2, text="Örnek satırlar ekle", variable=examples_var).pack(side="left", padx=(12, 0))

    row3 = tk.Frame(frm)
    row3.pack(fill="x", pady=(18, 6))
    tk.Button(row3, text="Şablon Oluştur", command=generate, height=2, width=18).pack(side="left")

    footer = tk.Label(
        frm,
        text="Not: Bu şablondaki 8 kolon (A-H) admin panelde birebir yapıştırılacak şekilde tasarlanmıştır.",
        font=("Segoe UI", 9),
        fg="#334155",
        wraplength=630,
        justify="left",
    )
    footer.pack(anchor="w", pady=(16, 0))

    root.mainloop()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

