# API Keys Setup Guide

This guide will help you set up all the required external API keys for the Gazelle app.

---

## Status Overview

| Service | Status | Priority | Free Tier |
|---------|--------|----------|-----------|
| Mapbox | ✅ **CONFIGURED** | Required | 100K requests/month |
| Privy | ✅ **CONFIGURED** | Required | 1,000 MAUs |
| Claude API | ✅ **CONFIGURED** | Required | $5 credit |
| Resend | ⏳ **OPTIONAL** | Recommended | 3,000 emails/month |
| Twilio | ⏸️ **DEFER** | Optional | $15 trial credit |

---

## 🎉 ALL REQUIRED SERVICES CONFIGURED!

You have everything needed to start developing the MVP:
- ✅ Mapbox (geocoding and maps)
- ✅ Privy (authentication)
- ✅ Claude API (AI chat interface)

Optional services can be added later as needed.

---

## ✅ 1. Mapbox (CONFIGURED)

**Status:** Already configured with token
**Token:** `pk.eyJ1IjoiZGFmaXNoZXIyMDAwIiwiYSI6ImNtZ3IxN2UwdzE2NTIybHE0YXlndmg4d2kifQ._PaGsU2QYoxEzESAKm3LsQ`

### What it's for:
- Geocoding addresses to latitude/longitude coordinates
- Proximity matching between seekers and distribution centers
- Mapping and location services

### Free Tier:
- 100,000 geocoding requests/month
- Sufficient for hackathon and early testing

### API Documentation:
- https://docs.mapbox.com/api/search/geocoding/

---

## ✅ 2. Privy Authentication (CONFIGURED)

**Status:** Already configured with credentials
**App ID:** `cmgr1bec602lvkz0c2tobm0sz`

### What it's for:
- User authentication and registration
- Phone number verification
- Session management
- User profile management

### Free Tier:
- Up to 1,000 Monthly Active Users (MAUs)
- All authentication methods included
- Sufficient for hackathon and early launch

### Already Configured:
- ✅ App ID set in backend `.dev.vars`
- ✅ App Secret set in backend `.dev.vars`
- ✅ App ID set in frontend `.env.local`

### Next Steps:
- Configure allowed domains in Privy dashboard for production
- Set up authentication methods (email, SMS, wallet)

### API Documentation:
- https://docs.privy.io/

---

## ✅ 3. Claude API (Anthropic) - CONFIGURED

**Status:** Already configured with API key
**Key:** `sk-ant-api03-pMKYX...` (truncated for security)

### What it's for:
- Conversational AI interface for resource seekers
- Conversational AI interface for resource providers
- Natural language understanding
- Intent classification and entity extraction
- Smart matching between needs and supplies

### Already Configured:
- ✅ API key set in backend `.dev.vars`
- ✅ Free $5 credit available
- ✅ Ready to use in development

### Usage Tips:
- Start with Claude 3.5 Sonnet for best quality
- Monitor usage in Anthropic Console
- Add billing after free credit runs out (~$10-20 for hackathon)

### Cost Estimate:
- **Hackathon:** $10-20
- **Testing:** $5-10
- **Production (per month):** Varies based on usage

### Model to Use:
- `claude-3-5-sonnet-20241022` (recommended for production)
- `claude-3-haiku-20240307` (cheaper for testing)

### API Documentation:
- https://docs.anthropic.com/en/api/getting-started

---

## ⏳ 4. Resend Email Service - RECOMMENDED

**Priority:** **RECOMMENDED** - For notifications (easier than SMS for MVP)

### Setup Steps:

1. **Sign up at Resend**
   - Go to: https://resend.com/
   - Sign up with email
   - Verify your email

2. **Create API Key**
   - Go to "API Keys" section
   - Click "Create API Key"
   - Name it: "Gazelle Dev"
   - Copy the key (starts with `re_`)

3. **Verify Domain (Optional for testing)**
   - For testing, you can send from `onboarding@resend.dev`
   - For production, add and verify your domain

4. **Add to .dev.vars**
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Free Tier:
- 3,000 emails per month
- 100 emails per day
- Perfect for hackathon

### Cost After Free Tier:
- $20/month for 50,000 emails
- $80/month for 100,000 emails

### Example Use Cases:
- Reservation confirmations
- Pickup reminders
- Supply availability alerts
- Safety notifications

### API Documentation:
- https://resend.com/docs/introduction

---

## ⏸️ 5. Twilio SMS - OPTIONAL (Can Defer)

**Priority:** **OPTIONAL** - Can use email (Resend) instead for MVP

### Why Defer:
- Email notifications work well for MVP
- SMS adds complexity and cost
- Can add in Phase 2 after hackathon

### If You Want to Set It Up:

1. **Sign up at Twilio**
   - Go to: https://www.twilio.com/try-twilio
   - Sign up for free trial ($15 credit)

2. **Get Credentials**
   - Account SID
   - Auth Token
   - Get a phone number

3. **Add to .dev.vars**
   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### Cost:
- $15 free trial credit
- ~$0.0075 per SMS after that
- Phone number: $1/month

### API Documentation:
- https://www.twilio.com/docs/sms

---

## Quick Start Checklist

For hackathon MVP, you need **3 services** - ALL CONFIGURED! ✅

- [x] **Mapbox** - ✅ Configured!
- [x] **Privy** - ✅ Configured!
- [x] **Claude API** - ✅ Configured!
- [ ] **Resend** (Optional) - Can add for email notifications later

---

## Environment Files Setup

### Backend: `/backend/.dev.vars`

**Status:** File already created with Mapbox and Privy configured!

```bash
# All Required Keys - CONFIGURED! ✅
CLAUDE_API_KEY=sk-ant-api03-pMKYX... ✅
PRIVY_APP_ID=cmgr1bec602lvkz0c2tobm0sz ✅
PRIVY_APP_SECRET=4R1j54CzT... ✅
MAPBOX_TOKEN=pk.eyJ1IjoiZGFmaXNoZXIyMDAwIiwiYSI6ImNtZ3IxN2UwdzE2NTIybHE0YXlndmg4d2kifQ._PaGsU2QYoxEzESAKm3LsQ ✅

# Optional - Can add later
RESEND_API_KEY=re_xxxxx
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1xxxxx
```

### Frontend: `/frontend/.env.local`

**Status:** File already created with Privy configured!

```bash
VITE_API_URL=http://localhost:8787
VITE_PRIVY_APP_ID=cmgr1bec602lvkz0c2tobm0sz ✅
```

---

## Production Deployment

When deploying to Cloudflare Workers in production:

```bash
# Set secrets (these won't be in wrangler.toml or .dev.vars)
wrangler secret put CLAUDE_API_KEY
wrangler secret put PRIVY_APP_SECRET
wrangler secret put RESEND_API_KEY

# Public tokens can go in wrangler.toml [vars] section
# PRIVY_APP_ID (public)
# MAPBOX_TOKEN (public - it's a pk. token)
```

---

## Cost Summary

### Hackathon (1 week):
- Mapbox: **$0** (free tier)
- Claude API: **~$10-20**
- Privy: **$0** (free tier)
- Resend: **$0** (free tier)
- **Total: ~$10-20**

### First Month (Soft Launch):
- Mapbox: **$0** (free tier covers it)
- Claude API: **~$50-100** (depends on usage)
- Privy: **$0** (under 1K MAUs)
- Resend: **$0** (under 3K emails)
- **Total: ~$50-100**

### Scale (After Launch):
- Budget increases based on actual usage
- All services have predictable pricing tiers

---

## Next Steps

### ✅ Setup Complete!

All required API keys are configured:
1. ✅ Mapbox - Configured
2. ✅ Claude API - Configured
3. ✅ Privy - Configured

Environment files created:
- ✅ `/backend/.dev.vars` - All required keys added
- ✅ `/frontend/.env.local` - Privy App ID added

### You're Ready to Start Development! 🚀

Optional: Add Resend for email notifications later if needed.

---

## Need Help?

If you get stuck setting up any of these services, let me know and I can provide more detailed step-by-step instructions or alternatives.
