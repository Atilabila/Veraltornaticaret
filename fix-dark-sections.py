#!/usr/bin/env python3
"""
Siyah section'lardaki component'lerde text-[#0A0A0A] (siyah metin) 
renklerini text-white'a çevir.

Ana sayfadaki siyah section'lar:
- ShowcaseGrid (✅ manuel yapıldı)
- ProductGallery
- CustomerReviews
- OtherServices
"""

import re
from pathlib import Path

# Değiştirilecek dosyalar
files_to_fix = [
    "src/components/sections/ProductGallery.tsx",
    "src/components/sections/CustomerReviews.tsx",
    "src/components/sections/OtherServices.tsx",
]

def fix_text_colors(file_path):
    """text-[#0A0A0A] -> text-white değiştir"""
    path = Path(file_path)
    
    if not path.exists():
        print(f"❌ Dosya bulunamadı: {file_path}")
        return False
    
    content = path.read_text(encoding='utf-8')
    original = content
    
    # text-[#0A0A0A] -> text-white
    content = content.replace('text-[#0A0A0A]', 'text-white')
    
    # border-[#0A0A0A] -> border-white/20
    content = content.replace('border-[#0A0A0A]', 'border-white/20')
    
    # bg-[#0A0A0A] butonlarda -> bg-white text-black
    # (Dikkatli olmalıyız, bazı yerler olduğu gibi kalmalı)
    
    if content != original:
        path.write_text(content, encoding='utf-8')
        print(f"✅ Düzeltildi: {file_path}")
        return True
    else:
        print(f"⚠️  Değişiklik yok: {file_path}")
        return False

if __name__ == "__main__":
    print("🔧 Siyah section metin renkleri düzeltiliyor...\n")
    
    fixed_count = 0
    for file_path in files_to_fix:
        if fix_text_colors(file_path):
            fixed_count += 1
    
    print(f"\n✅ {fixed_count}/{len(files_to_fix)} dosya düzeltildi!")
