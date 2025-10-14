# Gazelle - Natural Disaster Resource Matching App

**Speed and agility in disaster response.**

🌐 **Live at:** https://gazellehelp.com

Gazelle is a responsive web application that efficiently matches resources with people in need during natural disasters. Built with Vite, React, Cloudflare Workers, and Claude AI, it provides intelligent matching, real-time inventory management, and safety-aware logistics coordination.

## 🚀 Tech Stack

### Frontend
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **shadcn/ui** - Accessible component library
- **Tailwind CSS** - Utility-first styling
- **Deployed on:** Cloudflare Pages

### Backend
- **Cloudflare Workers** - Serverless API
- **Cloudflare D1** - SQLite database
- **Cloudflare KV** - Key-value storage for sessions and caching
- **TypeScript** - Type safety

### AI & Services
- **Claude API** - Conversational AI interface
- **Privy** - User authentication
- **Geocoding API** - Location services
- **SMS Gateway** - Notifications (Twilio or similar)

## 📁 Project Structure

```
Musa-hackathon/
├── frontend/                 # Vite + React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities
│   │   ├── App.tsx         # Main app component
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── backend/                 # Cloudflare Workers API
│   ├── src/
│   │   └── index.ts        # Main Worker entry point
│   ├── schema.sql          # Database schema
│   ├── seed.sql            # Seed data
│   ├── wrangler.toml       # Cloudflare configuration
│   ├── .dev.vars.example   # Environment variables template
│   └── package.json
│
├── disaster_app_spec.txt   # Full specification
├── development-progress.md # Development planning
└── progress-log.md         # Session-by-session progress
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Wrangler CLI installed globally: `npm install -g wrangler`
- Cloudflare account
- Claude API key (from Anthropic)
- Privy account for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/dafisher2000/gazelle.git
cd gazelle
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy environment variables template
cp .dev.vars.example .dev.vars

# Edit .dev.vars and add your API keys
# CLAUDE_API_KEY, PRIVY_APP_ID, PRIVY_APP_SECRET, etc.
```

**Database is already set up!**
- D1 database: `gazelle-db` (ID: 65760f23-09ec-4c47-8dec-c94d193ce71d)
- Schema and seed data already migrated
- KV namespaces configured

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Copy environment variables template
cp .env.example .env.local

# Edit .env.local and add:
# VITE_API_URL=http://localhost:8787
# VITE_PRIVY_APP_ID=your-privy-app-id
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
This starts the Cloudflare Workers dev server on `http://localhost:8787`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
This starts the Vite dev server on `http://localhost:5173`

## 🗄️ Database

### Schema Overview
- **users** - User accounts with roles (seeker, provider, admin, etc.)
- **locations** - Distribution centers and warehouses
- **supply_categories** - Resource types (food, water, medical, etc.)
- **supplies** - Inventory items at locations
- **reservations** - User reservations for supplies
- **transactions** - Completed pickups/deliveries
- **safety_alerts** - Hazards and road closures
- **news_alerts** - Community announcements

### Running Migrations

```bash
cd backend

# Run on remote database
wrangler d1 execute gazelle-db --remote --file=schema.sql

# Seed initial data
wrangler d1 execute gazelle-db --remote --file=seed.sql

# Query database
wrangler d1 execute gazelle-db --remote --command="SELECT * FROM supply_categories"
```

## 🚀 Deployment

### Production URLs
- **Frontend:** https://gazellehelp.com
- **Backend API:** https://gazelle-api.dfisher-3f3.workers.dev

### Backend Deployment
```bash
cd backend
npm run deploy
```

### Frontend Deployment
```bash
cd frontend
npm run build

# Deploy to Cloudflare Pages (configure in CF dashboard or use wrangler pages)
npx wrangler pages deploy dist
```

**Custom Domain:** The custom domain `gazellehelp.com` is configured in Cloudflare Dashboard under Pages project settings.

## 🔑 Environment Variables

### Backend (.dev.vars)
```env
CLAUDE_API_KEY=sk-ant-...
PRIVY_APP_ID=...
PRIVY_APP_SECRET=...
GEOCODING_API_KEY=...
SMS_API_KEY=...
SMS_API_SECRET=...
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8787
VITE_PRIVY_APP_ID=...
```

## 📋 API Endpoints

### Health
- `GET /health` - API health check

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Phone verification

### Chat
- `POST /api/chat/message` - Send message to Claude AI
- `GET /api/chat/history/:sessionId` - Get conversation history

### Supplies
- `GET /api/supplies` - Get available supplies
- `POST /api/supplies` - Add new supply (provider)

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/user/:userId` - User's reservations

### Locations
- `GET /api/locations` - Get distribution locations
- `GET /api/locations/nearby` - Get nearby locations

### Geocoding
- `POST /api/geocode` - Geocode an address

## 🎯 Key Features

### Phase 0 (Completed) ✅
- Project structure with Vite + React + TypeScript
- shadcn/ui component library configured
- Cloudflare Workers backend with TypeScript
- D1 database with complete schema
- KV namespaces for sessions and caching
- Environment variable templates
- Git repository initialized

### Next Phases
- **Phase 1:** Complete backend API endpoints
- **Phase 2:** Privy authentication integration
- **Phase 3:** Frontend UI components and routing
- **Phase 4:** Claude AI chat interface
- **Phase 5:** Geocoding and location services
- **Phase 6:** Resource management and matching
- **Phase 7:** SMS notifications
- **Phase 8:** Offline support and PWA

## 📚 Resources

- [Specification Document](./disaster_app_spec.txt)
- [Development Progress](./development-progress.md)
- [Progress Log](./progress-log.md)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vite Documentation](https://vitejs.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Claude API Docs](https://docs.anthropic.com/)

## 🤝 Contributing

This is a hackathon project. Development is tracked in `progress-log.md` for AI-assisted sessions.

## 📄 License

MIT

---

**Built with speed and agility for disaster response.**
