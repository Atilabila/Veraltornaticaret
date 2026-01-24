# Task: Hero Section Visual & Functional Fixes

## 📋 Overview
The user requested visual adjustments to the Hero section to remove a boxed "YENİ" tag and ensure the image slider is automatically rotating.

## 🛠️ Task Breakdown

### Phase 1: Analysis
- Analyze `src/components/sections/Hero.tsx` for the "YENİ" styling.
- Analyze the slider implementation in `Hero.tsx`.
- Review `src/store/useContentStore.ts` for `heroImages` data.

### Phase 2: Implementation
- **Visual Fix**: Remove the `border-4 border-black` and padding from the "YENİ" span in the `h1` tag. Ensure it remains solid black and matches the surrounding font/size.
- **Slider Fix**: Ensure the `setInterval` logic is correctly cycling through images and that `heroImages` are correctly populated.
- **Aesthetic Check**: Verify the overall hero layout satisfies the "Premium Industrial" goal without looking "weird".

### Phase 3: Verification
- Run `checklist.py` to ensure no regressions (though this is purely UI).
- Manual visual check (simulated via thought/screenshots if possible).

## 🔗 Affected Files
- `src/components/sections/Hero.tsx`
- `src/store/useContentStore.ts`
