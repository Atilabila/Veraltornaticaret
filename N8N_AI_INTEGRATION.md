# n8n AI Integration (Sanitized)

Bu dokuman bilerek **secret icermeyecek** sekilde tutulur. Tum API key / token degerleri n8n Credentials veya ortam degiskenlerinden okunmalidir.

## Gerekli Ortam Degiskenleri

- `SUPABASE_URL` (onerilen) veya `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (yalnizca server-side / n8n icin)
- `GOOGLE_API_KEY` (eger kullaniliyorsa)
- `FAL_KEY` (eger kullaniliyorsa)
- `RESEND_API_KEY` (eger kullaniliyorsa)

## Supabase (Server / n8n)

- `service_role` key **RLS'i bypass eder**. Bu sebeple:
  - Next.js tarafinda **browser/client koduna asla** sokulmaz.
  - n8n gibi backend otomasyonlari veya server action / API route gibi server runtime'larda kullanilir.

Supabase node / HTTP Request node icin ornek env referanslari (n8n expression):

- Base URL: `={{$env.SUPABASE_URL}}`
- Service role: `={{$env.SUPABASE_SERVICE_ROLE_KEY}}`

## Notlar

- Bu repo icindeki tum dokumanlar ve scriptler secret icermemelidir.
- Gercek key/token degerleri yalnizca:
  - Supabase Dashboard / Vercel Env / local `.env.local` (gitignore) veya
  - n8n Credentials / n8n env
  icinde tutulmalidir.

