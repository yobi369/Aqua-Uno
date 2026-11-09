# Environment Variables

This project requires environment variables for local development and deployment. Do not commit real secret values to Git. Use a local `.env.local` file for development and secure secret storage in the deployment platform for production.

## Required development variables
- `GEMINI_API_KEY` — API key for Gemini/AI-related runtime functionality when the project uses AI-backed services
- `APP_URL` — Base URL used for app links and callback routing

## Recommended future commerce variables
- `DATABASE_URL` — Database connection string for persisted e-commerce data
- `JWT_SECRET` — Secret used for secure authentication tokens
- `SESSION_SECRET` — Secret for session management
- `M_PESA_CONSUMER_KEY` — Safaricom Daraja consumer key
- `M_PESA_CONSUMER_SECRET` — Safaricom Daraja consumer secret
- `M_PESA_SHORTCODE` — M-Pesa business shortcode
- `M_PESA_PASSKEY` — M-Pesa passkey
- `M_PESA_CALLBACK_URL` — Callback endpoint published for transaction confirmations
- `PESAPAL_CONSUMER_KEY` — Pesapal consumer key
- `PESAPAL_CONSUMER_SECRET` — Pesapal consumer secret
- `PESAPAL_CALLBACK_URL` — Card payment callback endpoint
- `VITE_API_BASE_URL` — Frontend API base URL for backend integration
- `VITE_GA_MEASUREMENT_ID` — Google Analytics measurement identifier

## Notes
- Keep all secrets out of source control.
- Use `.env.example` as a template only.
- Review and rotate keys according to the deployment platform and access policy.
- Only set live credentials in production after approval and sandbox verification.
