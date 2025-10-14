# Gazelle AI Knowledge Base

This directory contains documents that guide the AI's behavior, questions, and responses when interacting with users.

## Directory Structure

```
knowledge-base/
├── README.md                    # This file
├── provider/                    # Documents for providers (donors)
│   ├── conversation-flow.md    # Conversation flow and question sequence
│   ├── supply-categories.md    # Information about supply types
│   ├── logistics.md            # Pickup, delivery, storage guidelines
│   └── best-practices.md       # Best practices for donations
├── seeker/                      # Documents for seekers (those in need)
│   ├── conversation-flow.md    # Conversation flow and question sequence
│   ├── needs-assessment.md     # How to assess needs
│   ├── special-requirements.md # Dietary, medical, accessibility info
│   └── safety-tips.md          # Safety information for disaster situations
└── shared/                      # Shared knowledge
    ├── supply-categories.json  # Master list of supply categories
    ├── locations.md            # Information about distribution locations
    └── emergency-protocols.md  # Emergency protocols and safety alerts
```

## Document Format

Documents can be in Markdown (.md) or JSON (.json) format.

### Markdown Documents
Used for narrative content, conversation flows, guidelines, and instructions.

### JSON Documents
Used for structured data like supply categories, locations, and status codes.

## How AI Uses These Documents

The AI assistant reads these documents to:
1. **Guide conversations** - Follow structured question flows
2. **Provide accurate information** - Reference supply categories, locations
3. **Apply best practices** - Use guidelines for safety, logistics, and resource matching
4. **Adapt responses** - Tailor language and approach based on user type (provider/seeker)

## Updating Knowledge Documents

When updating these documents:
1. Keep language clear and concise
2. Use bilingual content where appropriate (English/Spanish)
3. Include examples for complex concepts
4. Update the AI prompt system to reference new documents
5. Test AI behavior after updates

## Integration

Knowledge documents are loaded by the backend Worker and injected into the Claude API system prompt for context-aware responses.
