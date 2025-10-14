# Gazelle Knowledge Base Setup

**Date:** October 14, 2025
**Status:** ✅ COMPLETE

## Overview

The Gazelle AI assistant now uses a comprehensive knowledge base to guide conversations with providers (donors) and seekers (those in need). This knowledge base ensures consistent, empathetic, and effective communication during disaster response.

## Directory Structure

```
backend/knowledge-base/
├── README.md                           # Knowledge base documentation
├── provider/                           # Provider (donor) specific documents
│   └── conversation-flow.md           # Detailed conversation guidelines for donors
├── seeker/                             # Seeker (those in need) specific documents
│   └── conversation-flow.md           # Detailed conversation guidelines for seekers
└── shared/                             # Shared knowledge across both flows
    └── supply-categories.json         # Master list of 10 supply categories
```

## Implementation

### Backend Module: `src/knowledge-base.ts`

Created a TypeScript module that exports:

1. **SUPPLY_CATEGORIES**: JSON data with 10 supply categories
   - Water
   - Food - Non-Perishable
   - Medical Supplies
   - Hygiene Products
   - Clothing
   - Bedding & Blankets
   - Cleaning Supplies
   - Baby Supplies
   - Flashlights & Batteries
   - Tools & Equipment

2. **PROVIDER_GUIDELINES**: Markdown-formatted guidelines for provider conversations
   - Conversation flow
   - Tone and approach
   - Important rules
   - Red flags

3. **SEEKER_GUIDELINES**: Markdown-formatted guidelines for seeker conversations
   - Needs assessment
   - Urgency levels
   - Special situations
   - Crisis indicators

4. **getEnhancedSystemPrompt()**: Function that builds context-aware system prompts
   - Takes user type (provider/seeker) and language (en/es)
   - Returns enhanced prompt with guidelines and supply categories
   - Automatically adapts language instructions

### Integration with Claude API

The knowledge base is integrated in `src/index.ts`:

```typescript
import { getEnhancedSystemPrompt } from './knowledge-base';

// In handleChatRequest:
const systemPrompt = getEnhancedSystemPrompt(body.type, body.language);
```

## Knowledge Base Content

### Provider Conversation Flow

**Objectives:**
1. Identify what supplies they have
2. Determine quantity and condition
3. Confirm their location
4. Assess transportation capability
5. Arrange delivery or pickup logistics

**Key Guidelines:**
- Thank them warmly and express appreciation
- Ask 1-2 questions at a time
- Help them estimate quantities if unsure
- Verify items are suitable (sealed, unexpired, clean)
- Politely decline unsuitable donations
- Maintain grateful, efficient, reassuring tone

### Seeker Conversation Flow

**Objectives:**
1. Understand their immediate needs
2. Assess urgency and priority
3. Identify special requirements
4. Confirm their location
5. Determine transportation capability
6. Connect them with available resources

**Priority Order:**
1. Medical supplies (urgent needs)
2. Water
3. Food
4. Shelter/bedding
5. Hygiene products
6. Other supplies

**Key Guidelines:**
- Show compassion and offer reassurance
- Ask 1-2 questions at a time (they may be stressed)
- Never question why they need help
- Use simple, clear language
- Protect their privacy and dignity
- Watch for crisis indicators

## Supply Categories

Each category includes:
- English and Spanish names
- Specific questions to ask (bilingual)
- Common items in the category

Example for Water:
```json
{
  "id": 1,
  "name": "Water",
  "name_es": "Agua",
  "questions": [
    "How many bottles or gallons do you have?",
    "Are the bottles sealed/unopened?",
    "What size are the bottles?"
  ],
  "questions_es": [
    "¿Cuántas botellas o galones tiene?",
    "¿Están las botellas selladas/sin abrir?",
    "¿De qué tamaño son las botellas?"
  ]
}
```

## Testing Results

### Test 1: Provider - Water Donation (English)
**Input:** "I have bottled water to donate"

**Response:**
> "Thank you so much for your generous offer to donate water! This is such a vital resource that can really help people in need.
>
> Could you tell me:
> 1. How many bottles or cases of water you have available?
> 2. Are these unopened/sealed bottles?"

✅ **Result:** AI correctly thanks provider, asks category-specific questions from knowledge base

### Test 2: Seeker - Water and Food (English)
**Input:** "I need water and food"

**Response:**
> "Hello, I'm here to help you. I understand you need water and food - these are absolutely essential needs. Let me ask a few questions so we can best assist you.
>
> 1. How many people do you need supplies for?
> 2. How urgent is your situation - how much water and food do you currently have left?"

✅ **Result:** AI shows compassion, prioritizes urgent needs, asks appropriate questions

### Test 3: Provider - Water Donation (Spanish)
**Input:** "Tengo agua embotellada para donar"

**Response:**
> "¡Muchas gracias por su generosa oferta de donación! Es muy importante ayudar en estos momentos.
>
> Me gustaría hacerle algunas preguntas sobre el agua que desea donar:
>
> 1. ¿Cuántas botellas o garrafones de agua tiene disponibles?
> 2. ¿Las botellas están selladas y sin abrir?"

✅ **Result:** AI responds entirely in Spanish, uses Spanish-specific questions from knowledge base

### Test 4: Provider - Medical Supplies (English)
**Input:** "I have medical supplies"

**Response:**
> "Thank you so much for your generous offer to donate medical supplies! This type of donation can be extremely helpful. Let me ask a few questions to get more details.
>
> 1. Could you tell me what specific types of medical supplies you have? (For example: bandages, gauze, over-the-counter medications, etc.)
> 2. Are these items unopened and unexpired?"

✅ **Result:** AI asks category-specific questions for medical supplies, mentions examples

## Benefits

### 1. Consistency
All AI responses follow the same structured approach, ensuring every user has a similar high-quality experience.

### 2. Empathy
Different tone and approach for providers vs seekers - grateful for donors, compassionate for those in need.

### 3. Efficiency
Category-specific questions help gather the right information quickly.

### 4. Safety
Built-in guidelines for unsuitable donations, crisis detection, and red flags.

### 5. Bilingual Support
Full English and Spanish support with culturally appropriate phrasing.

### 6. Scalability
Easy to add new supply categories or update conversation guidelines without changing code.

## Deployment

**Backend Deployed:**
- URL: https://gazelle-api.dfisher-3f3.workers.dev
- Version: e48ab53d-d3fb-4818-a2ed-eb69a53c1540
- Status: ✅ Live with knowledge base integration

**Frontend:**
- No changes needed - frontend already sends type and language parameters
- URL: https://gazellehelp.com

## Future Enhancements

### Potential Improvements:
1. **Dynamic Loading**: Load knowledge documents from KV storage or R2 for easy updates without redeployment
2. **Additional Categories**: Add more specific supply types as needs arise
3. **Location-Specific Guidelines**: Add region-specific resources and distribution center info
4. **Conversation Analytics**: Track which questions are most effective
5. **AI Learning**: Analyze successful conversations to improve prompts
6. **Multi-Language Expansion**: Add more languages beyond English and Spanish

### How to Update Knowledge Base:

**Current Method (Embedded):**
1. Edit `/backend/src/knowledge-base.ts`
2. Update constants (SUPPLY_CATEGORIES, PROVIDER_GUIDELINES, SEEKER_GUIDELINES)
3. Run `npm run deploy` from backend directory
4. Test with curl or frontend

**Future Method (External Storage):**
1. Upload updated documents to KV or R2
2. Knowledge base updates automatically without redeployment
3. Version control for rollback capability

## Documentation Files

- **[knowledge-base/README.md](/backend/knowledge-base/README.md)** - Knowledge base overview
- **[knowledge-base/provider/conversation-flow.md](/backend/knowledge-base/provider/conversation-flow.md)** - Provider guidelines
- **[knowledge-base/seeker/conversation-flow.md](/backend/knowledge-base/seeker/conversation-flow.md)** - Seeker guidelines
- **[knowledge-base/shared/supply-categories.json](/backend/knowledge-base/shared/supply-categories.json)** - Supply categories

## Summary

✅ **Knowledge base created** with comprehensive conversation flows
✅ **Backend integration complete** using enhanced system prompts
✅ **Testing successful** across all user types and languages
✅ **Documentation complete** for maintenance and updates

The AI assistant now has structured guidance for helping both providers and seekers in disaster situations, with appropriate tone, questions, and safety considerations.
