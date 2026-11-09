# Technical Documentation

## 1. Project overview
Aqua Uno is a premium bottled-water brand site for Kenya. The repository currently contains a polished front-end storefront that is designed to promote the brand, display product options, and capture orders through a WhatsApp-driven purchase flow. It does not yet represent the full online commerce platform described in the project brief.

## 2. Current architecture
### Frontend stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

### Application structure
- `src/App.tsx`: root page state, navigation routing, cart state, and homepage composition
- `src/components/`: reusable sections such as navbar, hero, product cards, cart drawer, FAQ, reviews, and footer
- `src/data/waterData.ts`: product catalogue, brand info, mineral specifications, service coverage data, and facility assets
- `src/types.ts`: shared types used throughout the app
- `src/index.css`: styling layer and global design tokens
- `public/` and `src/assets/images/`: static branding and photography assets

### Deployment configuration
- `vite.config.ts`: Vite app configuration with React and Tailwind support
- `vercel.json`: SPA rewrite configuration for client-side routing

## 3. Existing functionality preserved
- Premium homepage for Aqua Uno
- Navigation between landing, product, about, delivery, and contact pages
- Product catalogue with category filters and add-to-cart controls
- Cart drawer with quantity adjustment and total calculation
- Delivery pricing rules and order form
- WhatsApp integration for customer order capture
- Real product imagery and Kenya-centric content

## 4. What is not yet implemented
The repository does not include a full operational commerce backend. The following production requirements are still outstanding:
- Database schema and migrations
- Customer registration and login flow
- Secure password hashing and auth sessions
- Order persistence and snapshots
- Payment gateway integration for M-Pesa and card payments
- Payment callback verification and idempotency controls
- Inventory stock management with transactions and audit trail
- Admin dashboards for products, orders, customers, deliveries, and finance
- Role-based access control
- Reporting and CSV exports
- API rate limiting and security hardening
- SEO and analytics implementation beyond static front-end structure

## 5. Security and risk assessment
### Current posture
- Frontend-only app with no server-side trust boundary
- No database access, so the primary SQL injection risk is absent at this stage
- No secret handling beyond the local `.env` files
- No authentication or admin authorization is yet present

### Known risks for future implementation
- Payment callbacks must be verified server-side with shared secrets and idempotency checks
- Any database access must use parameterized queries and proper validation
- Sensitive admin APIs must be role-protected and audited
- Secrets must be stored in environment variables and never committed to source control

## 6. Performance and UX notes
- The site is responsive and designed for mobile commerce
- Asset images are kept in local static files for predictable delivery
- Product cards and hero blocks are deliberately lightweight for a Vite storefront
- The current design is strong for a landing experience but still needs a dedicated backend layer before it can be considered a full commercial platform

## 7. Recommended implementation roadmap
### Stage 2: Frontend hardening
- Consolidate route handling and page structure
- Improve accessibility and semantic HTML
- Add stronger validation for cart checkout steps
- Prepare on-page data contracts for the eventual backend

### Stage 3: E-commerce backend
- Set up a Postgres-compatible data layer
- Add product, customer, order, inventory, and payment entities
- Implement REST or serverless API routes
- Add server-side validation and transactional stock movement logic

### Stage 4: Payment integrations
- Integrate M-Pesa Daraja sandbox flows
- Implement card payment abstraction with hosted checkout or provider adapter
- Add cash-on-delivery and order status workflows
- Verify payment status from provider callbacks only

### Stage 5: Admin and reporting
- Add dashboard pages for products, payments, orders, deliveries, and inventory
- Introduce role-based permissions
- Build operational reports and export flows

### Stage 6: Security and production readiness
- Harden auth, CSRF, rate limits, secret management and audit logs
- Perform security review and deployment checks
- Document rollback, backup, and approval gates before production deployment

## 8. Deployment notes
The app is currently suitable for preview deployment from Vercel in its front-end form. Production launch should be gated on confirmation of payment, database, and security configuration. The project should not activate live payments until sandbox verification and business approval are complete.
