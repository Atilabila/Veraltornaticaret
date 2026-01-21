# FRONTEND ARCHITECTURE — METAL POSTER UI

## Amaç
Bu doküman:
- Layout’un nasıl kurulacağını
- CSS/utility yaklaşımını
- Responsive stratejiyi

tanımlar.

---

## Layout Strategy

### Container
- Her ana section bir `container` içinde olmalı.
- max-width: 1200–1280px
- Yatay padding:
  - Mobile: 16px
  - Desktop: 24px

Container dışına TAŞMA YASAK.

---

### Grid System
- 12 kolon grid veya eşdeğeri
- Hero, katalog, galeri gibi alanlar grid ile kurulur
- Absolute positioning sadece:
  - badge
  - overlay
  - decorative element

için kullanılır.

---

## Spacing System
Rastgele margin yok.

### Önerilen spacing scale
- xs: 8px
- sm: 16px
- md: 24px
- lg: 48px
- xl: 64px
- xxl: 96px

Section’lar bu scale dışına çıkmaz.

---

## Typography System

### Zorunlu scale
```css
H1: clamp(32px, 4vw, 56px)
H2: clamp(24px, 3vw, 40px)
H3: clamp(20px, 2.5vw, 28px)
Body: clamp(16px, 1.2vw, 18px)
Caption: 12–14px
