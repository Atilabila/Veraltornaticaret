# -*- coding: utf-8 -*-
"""
Generate an Excel template for Metal Poster Pro bulk product upload (/admin/urunler).

What it produces:
- A single-sheet .xlsx file with the exact 8 columns expected by the admin paste UI.
- Helpful header styling and conditional formatting for common mistakes.

Requires:
  pip install openpyxl

Usage:
  python scripts/generate_bulk_urunler_template.py --out bulk-urunler.xlsx --rows 200
"""

from __future__ import annotations

import argparse
from _bulk_excel_template import build_workbook


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="bulk-urunler-template.xlsx")
    parser.add_argument("--rows", type=int, default=200, help="Row count to pre-format (max 500).")
    parser.add_argument(
        "--include-examples",
        action="store_true",
        help="Include 2 example rows to show formatting.",
    )
    args = parser.parse_args()

    max_rows = args.rows
    if max_rows < 1:
        raise SystemExit("--rows must be >= 1")
    if max_rows > 500:
        raise SystemExit("--rows cannot exceed 500 (matches admin bulk limit).")

    wb = build_workbook(max_rows=max_rows, include_examples=args.include_examples)
    wb.save(args.out)
    print(f"Wrote: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
