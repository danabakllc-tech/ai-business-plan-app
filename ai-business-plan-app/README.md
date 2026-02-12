# AI Business Plan Advisor - Web App

Complete web application for app.danabak.com

## Features

- ✅ Landing page with pricing
- ✅ 9-stage questionnaire
- ✅ Real-time AI analysis
- ✅ Conservative success probability score (1-100%)
- ✅ Risk level indicators (75%+, 50-74%, <50%)
- ✅ Improvement recommendations
- ✅ Business plan generation
- ✅ Mobile responsive
- ✅ Dark theme

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Your Railway API URL |
| `VITE_STRIPE_KEY` | Optional | Stripe publishable key |

## Deploy to Vercel (Recommended)

### Option 1: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL

# Deploy to production
vercel --prod
```

## Connect to GoDaddy Domain (app.danabak.com)

After deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `app.danabak.com`
3. Vercel will give you DNS records to add

In GoDaddy:

1. Go to DNS Management for danabak.com
2. Add CNAME record:
   - Type: CNAME
   - Name: app
   - Value: cname.vercel-dns.com
   - TTL: 600

Wait 5-10 minutes for DNS propagation.

## Deploy to Netlify (Alternative)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Project Structure

```
ai-business-plan-app/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/
│   │   ├── LandingPage.jsx    # Home + Pricing
│   │   ├── Questionnaire.jsx  # 9-stage form
│   │   ├── Results.jsx        # Score + Plan
│   │   └── Success.jsx        # Payment success
│   ├── App.jsx           # Router
│   ├── main.jsx          # Entry point
│   └── index.css         # Tailwind styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json           # Vercel config
└── netlify.toml          # Netlify config
```

## API Integration

The app connects to your Railway API:

```javascript
// In src/App.jsx
export const API_URL = import.meta.env.VITE_API_URL

// Endpoints used:
// POST /analyze - Run business analysis
// POST /improve - Get improvement suggestions
// POST /generate-plan - Generate business plan
```

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: { ... },  // Gold/Amber
  dark: { ... }      // Dark theme
}
```

### Pricing

Edit pricing in `src/pages/LandingPage.jsx`:

```jsx
// Standard: $149
// Pro: $199
```

## Support

Email: support@danabak.com
