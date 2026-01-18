# n8n Workflow - Kopyala Yapıştır

Aşağıdaki JSON'u kopyala, n8n'de yeni workflow oluştur ve CTRL+V ile yapıştır:

```json
{
  "name": "Metal Poster Viral Trend",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 21 * * 0"
            }
          ]
        }
      },
      "id": "cron",
      "name": "Her Pazar 21:00",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.1,
      "position": [100, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "X-goog-api-key",
              "value": "AIzaSyDGwDyOLuYPT3SgMAWUwadUDR1bUbBrSZ8"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\"contents\":[{\"parts\":[{\"text\":\"Sen trend analistisin. Bu hafta viral olan 2 konu bul. Metal poster icin uygun olmali. Gorseller genc odasi icin. Siyasi konular olmasin. JSON formatinda yaz: {\\\"trends\\\":[{\\\"name\\\":\\\"URUN ADI\\\",\\\"description\\\":\\\"Aciklama\\\",\\\"story\\\":\\\"Hikaye\\\",\\\"image_prompt\\\":\\\"English prompt for image, photorealistic, 4K, vibrant\\\",\\\"seo_title\\\":\\\"SEO\\\",\\\"seo_description\\\":\\\"SEO desc\\\"}]}\"}]}]}"
      },
      "id": "gemini",
      "name": "Gemini",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [320, 300]
    },
    {
      "parameters": {
        "jsCode": "const txt = $input.first().json.candidates[0].content.parts[0].text;\nlet j = txt;\nif(txt.includes('```json')) j = txt.split('```json')[1].split('```')[0];\nelse if(txt.includes('```')) j = txt.split('```')[1].split('```')[0];\nconst d = JSON.parse(j.trim());\nreturn d.trends.slice(0,2).map(t=>({json:t}));"
      },
      "id": "parse",
      "name": "Parse",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [540, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://queue.fal.run/fal-ai/flux/schnell",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Key d6a55a29-3299-4af4-8fa7-8098f2bfe798:84d51fb398efbecd66795d2dc1c9f09a"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"prompt\":\"{{ $json.image_prompt }}, metal poster art, 4K\",\"image_size\":\"portrait_4_3\",\"num_inference_steps\":4,\"num_images\":1}"
      },
      "id": "flux",
      "name": "Flux",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [760, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "={{ $json.response_url }}",
        "options": {"timeout": 120000}
      },
      "id": "wait",
      "name": "Wait",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [980, 300]
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all();\nconst p = $('Parse').all();\nreturn items.map((it,i)=>{\nconst d = p[i]?.json || p[0]?.json;\nconst img = it.json.images?.[0]?.url || '';\nconst slug = d.name.toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-');\nreturn {json:{name:d.name,slug,price:450,category:'TREND_LAB',image:img,description:d.description,story:d.story,material:'1.5mm Aluminyum',process:'UV Baski',print:'4K',thickness:'1.5mm',dims:'30x45cm',mounting:'Miknatıs',is_active:false,seo_title:d.seo_title,seo_description:d.seo_description,seo_keywords:['metal poster','trend']}};\n});"
      },
      "id": "prep",
      "name": "Prep",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1200, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://lzftwahuudyyudkwspzd.supabase.co/rest/v1/products",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {"name": "apikey", "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZnR3YWh1dWR5eXVka3dzcHpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODYyNDkzOCwiZXhwIjoyMDg0MjAwOTM4fQ.sO16V9xNWhvUdBEUU7E3UfvEe_EXpNtAOoFgZ2Y1R7g"},
            {"name": "Authorization", "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZnR3YWh1dWR5eXVka3dzcHpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODYyNDkzOCwiZXhwIjoyMDg0MjAwOTM4fQ.sO16V9xNWhvUdBEUU7E3UfvEe_EXpNtAOoFgZ2Y1R7g"},
            {"name": "Content-Type", "value": "application/json"},
            {"name": "Prefer", "value": "return=representation"}
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json) }}"
      },
      "id": "supa",
      "name": "Supabase",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1420, 300]
    }
  ],
  "connections": {
    "Her Pazar 21:00": {"main": [[{"node": "Gemini", "type": "main", "index": 0}]]},
    "Gemini": {"main": [[{"node": "Parse", "type": "main", "index": 0}]]},
    "Parse": {"main": [[{"node": "Flux", "type": "main", "index": 0}]]},
    "Flux": {"main": [[{"node": "Wait", "type": "main", "index": 0}]]},
    "Wait": {"main": [[{"node": "Prep", "type": "main", "index": 0}]]},
    "Prep": {"main": [[{"node": "Supabase", "type": "main", "index": 0}]]}
  },
  "settings": {"executionOrder": "v1"}
}
```

---

## Kurulum

1. n8n'de **+ Add Workflow**
2. Yukarıdaki JSON'u kopyala
3. n8n'de **CTRL + V**
4. **Save**
5. **Execute workflow** ile test et
