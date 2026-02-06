# Viewport Desktop Forcing (Backup)

Previous meta viewport used for “desktop-only” scaling:

```ts
export const viewport = {
  width: 1600,
  initialScale: 0.25,
  minimumScale: 0.25,
  maximumScale: 0.25,
  userScalable: true,
};
```

This file is a reference so we can restore the old behaviour if needed after switching to mobile-first/device-width.
