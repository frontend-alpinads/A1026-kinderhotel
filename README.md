# Hotel Landing Page Template

Config-driven Next.js landing page for hotel marketing campaigns.

## How it works

**Everything is controlled by `config.json`** – the template code never changes.

The n8n pipeline:
1. Duplicates this repo → `A0001-Hotelname`
2. Generates a `config.json` with AI (colors, fonts, texts, images)
3. Commits it to the new repo
4. Vercel auto-deploys

## config.json structure

```json
{
  "hotel": { "name", "id", "url", "phone", "email", "bookingUrl" },
  "theme": {
    "colors": { "primary", "secondary", "accent", "text", "textLight", "background", "backgroundAlt" },
    "fonts": { "heading", "body" }
  },
  "hero": { "text", "description", "image", "ctaText", "ctaUrl" },
  "sections": {
    "about": { "enabled", "title", "text", "image" },
    "gallery": { "enabled", "title", "images[]" },
    "cta": { "enabled", "title", "text", "buttonText", "buttonUrl" }
  },
  "footer": { "text" }
}
```

## Local development

```bash
npm install
npm run dev
```

Edit `config.json` to see changes instantly.
