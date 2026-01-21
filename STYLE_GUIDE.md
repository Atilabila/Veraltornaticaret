# Metal Poster Pro - Style Guide & UI Reconstruction Rules

## 1. Typography
**Font Family:**
- Headings: `Inter`, `Montserrat`, or `Archivo Black` (Keep existing branding, but ensure legibility).
- Body: `Inter` or `Montserrat` (Monospace for technical specs only).

**Rules:**
- **Line-Height:** Minimum **140% (1.4)** for all body text to prevent crowding.
- **Headings:** Bold, clear hierarchy.
    - H1 (Product Title): 24px minimum, Bold (700).
    - H2 (Section Title): 32px minimum, Uppercase.
    - Price: 20px, Medium (500), Monospace allowed.
- **Body Text:** 16px, Light/Regular (300/400).

## 2. Spacing & Layout
**Grid & Flexbox:**
- Use **CSS Grid** for catalogs to ensure strict alignment.
- Use **Flexbox** for components (buttons, badges) to center content.
- **Gap:** Minimum **24px** between major elements.
- **Isolation:** Text blocks must be in their own standard flow (block), **NEVER** absolute positioned over an image unless it's a specific "Badge" or "Overlay" designed for interaction.

## 3. UI Components
**Buttons:**
- **Height:** Minimum **48px** (Touch target standard).
- **Style:** High contrast. distinct borders.
- **States:** Clear hover and active states.

**Navigation (Categories):**
- Must be scrollable horizontally on mobile if items exceed screen width. 
- No wrapping that causes layout brokenness.

## 4. Specific Refactoring Tasks (Correction Prompt)

### Catalog (ProductGallery)
- **Problem:** Category buttons are cramped.
- **Fix:** Convert to a horizontally scrollable bar (no-scrollbar utility) with ample padding.

### Product Detail (ConfigurationPanel)
- **Problem:** Size selectors overlap description text.
- **Fix:**
    - Separate the "Configuration" into a distinct vertical column on the right.
    - Size options should be a grid of distinct buttons, not text links.
    - Description should be in its own clear block below the title/price, with `line-height: 1.6`.

### Visual Hierarchy
- **Product Title:** Bold, 24px+, Margin Bottom 16px.
- **Price:** Medium, 20px, Safety Orange.
- **Description:** Regular, 16px, Zinc-600/Steel-Gray.
