# Aqua Uno Premium Water Platform

This repository contains a Vite + React storefront for Aqua Uno, designed for a premium Kenya-focused bottled-water business. The project currently serves as a front-end foundation with product browsing, cart interactions, delivery logic, and WhatsApp-driven ordering.

## Project status
The project is in Stage 1 technical audit and documentation. The frontend is functional, but the full production commerce stack described in the broader brief has not yet been implemented. See [PROJECT_STATUS.md](./PROJECT_STATUS.md) and [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md) for the roadmap and current architecture assessment.

## Local development

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Environment variables
Copy the sample file and set required values:
```bash
cp .env.example .env.local
```

The project currently expects:
- `GEMINI_API_KEY`
- `APP_URL`

See [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for the complete variable list and future production requirements.

### Run locally
```bash
npm run dev
```

The app runs on the default Vite development server, typically at:
- http://localhost:3000

### Production build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Site structure
- `/` — Home page and marketing sections
- `/products` — Product catalogue
- `/about` — Company story and quality messaging
- `/delivery` — Delivery coverage and order support
- `/contact` — Contact details and inquiry handling

## Notes
- The current shopping flow is front-end driven and uses WhatsApp order capture rather than a secure backend checkout.
- Payment processing, customer accounts, admin dashboards, inventory controls, and database-backed order management are still pending implementation.
- Do not activate live payments or production deployment without sandbox verification and business approval.
