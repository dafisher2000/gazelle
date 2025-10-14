/**
 * Knowledge Base Module
 * Loads and provides context documents for AI conversations
 */

// Since we're in a Cloudflare Worker environment, we'll embed the knowledge as constants
// In production, these could be loaded from KV storage or R2

export const SUPPLY_CATEGORIES = {
  "categories": [
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
    },
    {
      "id": 2,
      "name": "Food - Non-Perishable",
      "name_es": "Alimentos - No Perecederos",
      "questions": [
        "What types of food items do you have?",
        "Are the items unexpired?",
        "How much food do you have?"
      ],
      "questions_es": [
        "¿Qué tipos de alimentos tiene?",
        "¿Están sin vencer?",
        "¿Cuánta comida tiene?"
      ]
    },
    {
      "id": 3,
      "name": "Medical Supplies",
      "name_es": "Suministros Médicos",
      "questions": [
        "What specific medical supplies do you have?",
        "Are medications unexpired?",
        "Are first aid kits sealed/complete?"
      ],
      "questions_es": [
        "¿Qué suministros médicos específicos tiene?",
        "¿Están los medicamentos sin vencer?",
        "¿Están los botiquines sellados/completos?"
      ]
    },
    {
      "id": 4,
      "name": "Hygiene Products",
      "name_es": "Productos de Higiene",
      "questions": [
        "What hygiene items do you have?",
        "What quantities?",
        "Are items new/unopened?"
      ],
      "questions_es": [
        "¿Qué artículos de higiene tiene?",
        "¿Qué cantidades?",
        "¿Son artículos nuevos/sin abrir?"
      ]
    },
    {
      "id": 5,
      "name": "Clothing",
      "name_es": "Ropa",
      "questions": [
        "What types of clothing (adult, children, infant)?",
        "What sizes?",
        "Is the clothing clean and in good condition?"
      ],
      "questions_es": [
        "¿Qué tipos de ropa (adulto, niños, bebé)?",
        "¿Qué tallas?",
        "¿Está la ropa limpia y en buenas condiciones?"
      ]
    },
    {
      "id": 6,
      "name": "Bedding & Blankets",
      "name_es": "Ropa de Cama y Mantas",
      "questions": [
        "What bedding items do you have?",
        "How many?",
        "Are items clean?"
      ],
      "questions_es": [
        "¿Qué artículos de cama tiene?",
        "¿Cuántos?",
        "¿Están limpios?"
      ]
    },
    {
      "id": 7,
      "name": "Cleaning Supplies",
      "name_es": "Productos de Limpieza",
      "questions": [
        "What cleaning supplies do you have?",
        "Are containers sealed?",
        "What quantities?"
      ],
      "questions_es": [
        "¿Qué productos de limpieza tiene?",
        "¿Están los contenedores sellados?",
        "¿Qué cantidades?"
      ]
    },
    {
      "id": 8,
      "name": "Baby Supplies",
      "name_es": "Suministros para Bebés",
      "questions": [
        "What baby items do you have?",
        "What sizes?",
        "Are items unexpired and sealed?"
      ],
      "questions_es": [
        "¿Qué artículos para bebés tiene?",
        "¿Qué tallas?",
        "¿Están sin vencer y sellados?"
      ]
    },
    {
      "id": 9,
      "name": "Flashlights & Batteries",
      "name_es": "Linternas y Baterías",
      "questions": [
        "How many flashlights/lanterns?",
        "What types of batteries?",
        "How many batteries?"
      ],
      "questions_es": [
        "¿Cuántas linternas/lámparas?",
        "¿Qué tipos de baterías?",
        "¿Cuántas baterías?"
      ]
    },
    {
      "id": 10,
      "name": "Tools & Equipment",
      "name_es": "Herramientas y Equipo",
      "questions": [
        "What tools or equipment do you have?",
        "Are they in working condition?",
        "For generators: fuel type and wattage?"
      ],
      "questions_es": [
        "¿Qué herramientas o equipos tiene?",
        "¿Están en condiciones de funcionamiento?",
        "Para generadores: ¿tipo de combustible y vataje?"
      ]
    }
  ]
};

export const PROVIDER_GUIDELINES = `
## Provider Conversation Guidelines

### Your Role
You are helping someone who wants to DONATE supplies. Your job is to:
1. Thank them warmly for their generosity
2. Identify what supplies they have
3. Determine quantity and condition
4. Confirm their location
5. Assess transportation capability
6. Arrange logistics

### Conversation Flow
1. **Initial Greeting**: Thank them and ask what they want to donate
2. **Supply Identification**: Ask about type and details
3. **Quantity**: Ask measurable amounts (bottles, cases, boxes, pounds)
4. **Condition**: Verify items are suitable (sealed, unexpired, clean)
5. **Location**: Ask their general area or zip code
6. **Transportation**: Can they deliver or need pickup?
7. **Timing**: When are supplies available?
8. **Record Donation**: Once you have all required information (category, name, quantity, unit, condition), use the record_supply_donation tool to save the donation to the database
9. **Summary**: Thank them again and explain they'll be notified when someone needs their supplies

### Tone
- Grateful and appreciative
- Efficient but warm
- Clear and straightforward
- Reassuring about the process

### Important Rules
- Ask 1-2 questions at a time (don't overwhelm)
- Help them estimate quantities if unsure
- Politely decline unsuitable items (expired, opened, damaged)
- Never ask for payment or compensation
- Focus on logistics, not personal details
- **CRITICAL**: Once you have gathered category, name, quantity, unit, and condition, you MUST use the record_supply_donation tool to save the donation
- After recording the donation, thank them and explain next steps

### Supply Categories
Common donation types: Water, Non-Perishable Food, Medical Supplies, Hygiene Products, Clothing, Bedding, Cleaning Supplies, Baby Supplies, Flashlights/Batteries, Tools/Equipment

### Red Flags
If someone requests payment, offers inappropriate items, or shows suspicious behavior, politely end the conversation.
`;

export const SEEKER_GUIDELINES = `
## Seeker Conversation Guidelines

### Your Role
You are helping someone who NEEDS supplies during a disaster. Your job is to:
1. Offer compassionate support
2. Understand their urgent needs
3. Identify special requirements
4. Confirm their location
5. Determine transportation capability
6. Connect them with resources

### Conversation Flow
1. **Initial Greeting**: Offer support and ask about urgent needs
2. **Needs Assessment**: What do they need most?
3. **Quantity**: How much? How many people?
4. **Special Requirements**: Medical, dietary, accessibility, age-specific needs?
5. **Location**: What area are they in?
6. **Transportation**: Can they pick up or need delivery?
7. **Urgency**: How critical is the situation?
8. **Next Steps**: Explain matching process and timeline

### Priority Order (if multiple needs)
1. Medical supplies (urgent medical needs)
2. Water
3. Food
4. Shelter/bedding
5. Hygiene products
6. Other supplies

### Tone
- Compassionate and empathetic
- Reassuring and calm
- Non-judgmental
- Respectful and dignified
- Patient and supportive

### Important Rules
- Ask 1-2 questions at a time (they may be stressed)
- NEVER question why they need help
- Use simple, clear language
- Be patient if they're overwhelmed
- Protect their privacy and dignity
- Don't require proof of need

### Special Situations
- **Multiple people/families**: Ask total count, prioritize vulnerable
- **Pets**: Note pet supplies needed
- **Language barriers**: Use simple terms, confirm understanding
- **Emotional distress**: Acknowledge feelings, offer reassurance
- **Medical emergency**: Direct to 911 immediately
- **Crisis indicators**: Provide crisis resources

### Urgency Levels
- **Critical**: Medical emergencies, no water 24+ hours, infants without formula, extreme weather
- **High Priority**: Running out within 24 hours, vulnerable populations, no food 12+ hours
- **Standard**: Needed within 2-3 days, restocking

### Additional Resources
Always consider mentioning: emergency shelters, food banks, medical clinics, utility assistance, mental health resources, child care, pet shelters
`;

export function getEnhancedSystemPrompt(type: 'provider' | 'seeker', language: 'en' | 'es'): string {
  const basePrompt = type === 'provider' ? PROVIDER_GUIDELINES : SEEKER_GUIDELINES;

  // Add supply categories context
  const lang = language === 'es' ? 'questions_es' : 'questions';
  const categoryList = SUPPLY_CATEGORIES.categories
    .map(cat => {
      const name = language === 'es' ? cat.name_es : cat.name;
      return `- ${name}`;
    })
    .join('\n');

  const supplyCategoriesContext = `
### Available Supply Categories
${categoryList}

When discussing specific supplies, you can reference these categories to guide the conversation.
`;

  const languageInstructions = language === 'es'
    ? '\n\nIMPORTANT: Respond in Spanish. All your responses should be in Spanish.'
    : '\n\nIMPORTANT: Respond in English. All your responses should be in English.';

  return basePrompt + '\n\n' + supplyCategoriesContext + languageInstructions;
}
