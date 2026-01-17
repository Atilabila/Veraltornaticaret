## 🛠️ n8n Workflow Kurulum Rehberi

Aşağıdaki adımları sırasıyla takip ederek ilk otomasyonunuzu hayata geçirebilirsiniz:

1.  Paylaştığınız n8n ekranında **"Start from scratch"** butonuna tıklayın.
2.  Aşağıdaki JSON kodunun tamamını kopyalayın.
3.  n8n editör sayfasında herhangi bir yere tıklayın ve **CTRL + V** (Yapıştır) yapın. Tüm yapı otomatik olarak oluşacaktır.

### Gelişmiş Workflow Şablonu (Supabase Uyumlu)

Bu şablon, veritabanımızın zorunlu kıldığı tüm alanları (material, process, seo_title vb.) dolduracak şekilde yapılandırılmıştır:

```json
{
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{ "field": "cronExpression", "expression": "0 9 * * *" }]
        }
      },
      "id": "trigger",
      "name": "Her Sabah 9",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.openai.com/v1/chat/completions",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            { "name": "model", "value": "gpt-4o" },
            {
              "name": "messages",
              "value": "=[{role: 'system', content: 'Sen profesyonel bir e-ticaret tasarımcısısın. Metal posterler için viral trendleri analiz ediyorsun.'}, {role: 'user', content: 'Bugün popüler olan bir konu hakkında şu detayları JSON formatında üret: name, description, story, seo_title, seo_description.'}]"
            }
          ]
        }
      },
      "id": "gpt-logic",
      "name": "GPT-4 Viral Analiz",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [420, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://[PROJE_ID].supabase.co/rest/v1/products",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            { "name": "apikey", "value": "YOUR_SUPABASE_SERVICE_ROLE_KEY" },
            { "name": "Authorization", "value": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" },
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Prefer", "value": "return=minimal" }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            { "name": "name", "value": "={{$json.name}}" },
            { "name": "slug", "value": "={{$json.name.toLowerCase().replace(/ /g, '-')}}" },
            { "name": "price", "value": "450" },
            { "name": "category", "value": "TREND_LAB" },
            { "name": "material", "value": "1.5mm Alüminyum" },
            { "name": "process", "value": "UV Baskı" },
            { "name": "print", "value": "Yüksek Çözünürlük" },
            { "name": "thickness", "value": "1.5mm" },
            { "name": "dims", "value": "30x45cm" },
            { "name": "mounting", "value": "Mıknatıs Sistemi" },
            { "name": "is_active", "value": "true" }
          ]
        }
      },
      "id": "supabase-write",
      "name": "Sisteme Kaydet",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [640, 300]
    }
  ],
  "connections": {
    "trigger": { "main": [[{ "node": "gpt-logic", "type": "main", "index": 0 }]] },
    "gpt-logic": { "main": [[{ "node": "supabase-write", "type": "main", "index": 0 }]] }
  }
}
```

## 🔑 Önemli Ayarlar

1.  **OpenAI API:** GPT Node'u için `OpenAI API Key` tanımlamanız gerekir.
2.  **Supabase:** `[PROJE_ID]` kısmını kendi projelerinizle değiştirin.
3.  **Service Role Key:** Supabase Dashboard > Settings > API kısmından `service_role` key'ini alın. Bu key, güvenlik duvarını (RLS) aşarak n8n'in ürün eklemesini sağlar.

---

### Bir Sonraki Adım:
n8n içinde bu düğümleri (node) bağladıktan sonra, **DALL-E 3** düğümünü ekleyerek görsel üretimini de bu akışa dahil edeceğiz. Hazır olduğunuzda devam edebiliriz!
