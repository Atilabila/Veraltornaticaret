# Excel Toplu Ürün Şablonu (Son Kullanıcı)

Bu repo içinde `/admin/urunler` toplu ürün girişi için hazır bir Excel şablonu üreten araçlar vardır.

## Şablon Üretme (Son Kullanıcı)

1. `VeralTopluUrunExcel.exe` dosyasını aç.
1. Kaydedilecek Excel dosya adını seç.
1. Satır sayısını seç (1-500).
1. "Şablon Oluştur" de.

Oluşan Excel dosyasında sadece A-H kolonlarını doldur.

## Admin Panelde Kullanım

1. Admin’de `.../admin/urunler` sayfasına gir.
1. Kategori seç.
1. Excel’de başlık satırı hariç `A-H` aralığını kopyala.
1. Panelde "Excel/CSV Yapıştır" ile yapıştır.
1. "Toplu Kaydet".

## EXE Paketleme (Geliştirici)

Bu `.exe` dosyasını üretmek için Windows makinede:

1. Python kur (3.10+ önerilir). `py` komutu çalışmalı.
1. Repoda bu komutu çalıştır:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\build_bulk_excel_wizard_exe.ps1
```

Çıktı:
- `dist\VeralTopluUrunExcel.exe`

## Python ile Çalıştırma (Geliştirici)

Python üzerinden çalıştırmak istersen:

```bash
pip install openpyxl
python scripts/bulk_excel_wizard.py
```

