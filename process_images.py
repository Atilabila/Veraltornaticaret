import os
import sys
from PIL import Image
import json

# Set standard output encoding to utf-8
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def process_images():
    base_path = r"c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\public"
    output_base = os.path.join(base_path, "catalog")
    
    mapping = {
        "ARABALAR PLAKA": ("cars", "ARABA_PLAKA", "KLASİK OTOMOBİL SERİSİ."),
        "ATATÜRK PLAKA": ("ataturk", "ATATURK_PLAKA", "ATATÜRK ÖZEL KOLEKSİYONU."),
        "KARAKTERLER  PLAKA": ("characters", "CHARACTER_PLAKA", "İKONİK KARAKTER SERİSİ."),
        "MOTOR PLAKA": ("motors", "MOTOR_PLAKA", "ENDÜSTRİYEL MOTOR VE MOTO SERİSİ."),
        "YAPAY CİTY": ("city", "CITY_PLAKA", "SİBER ŞEHİR VE GELECEK TEMASI.")
    }

    products_js = []
    
    for folder_name, (subfolder, cat_id, desc_tr) in mapping.items():
        folder_path = os.path.join(base_path, folder_name)
        if not os.path.exists(folder_path):
            continue
            
        files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.jfif', '.webp'))]
        
        for i, filename in enumerate(files, 1):
            new_filename = f"{subfolder}_{i:02d}.webp"
            
            product_id = f"{subfolder.upper()}_{i:02d}"
            product_name = f"{folder_name.split()[0]} PLAKASI #{i:02d}"
            
            products_js.append({
                "id": product_id,
                "name": product_name,
                "description": f"ENDÜSTRİYEL SINIF {desc_tr}",
                "price": 350,
                "image": f"/catalog/{subfolder}/{new_filename}",
                "category": cat_id,
                "specs": {
                    "material": "ALÜMİNYUM",
                    "thickness": "1.5MM",
                    "process": "UV_STATİK",
                    "print": "ENDÜSTRİYEL_GEN_3"
                }
            })

    with open("new_products.json", "w", encoding="utf-8") as f:
        json.dump(products_js, f, indent=4, ensure_ascii=False)
    print(f"Successfully updated metadata for {len(products_js)} products.")

if __name__ == "__main__":
    process_images()
