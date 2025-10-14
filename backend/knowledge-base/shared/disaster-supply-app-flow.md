# Disaster Supplies Matching App - AI Prompt & Process Flow

## Overview
This document outlines streamlined AI-driven conversation flows designed for crisis conditions. The system prioritizes speed, simplicity, and minimal friction while collecting only essential information to match disaster supply providers with seekers in need.

**Design Principle:** During a disaster, every second counts. Keep questions minimal, use smart defaults, and get to matching fast.

---

## Section 1: Provider Flow (Simplified)

### Objective
Quickly register donors and their supplies with minimum friction. Target completion time: 2-3 minutes.

---

### Step 1: Quick Registration
**AI Prompt:**
"Thank you for helping! I need just three quick things:
1. Your name
2. Phone number
3. Your address or location"

**Data Captured:**
- Name
- Phone number
- Address (auto-geocoded in background)

**Smart Defaults:**
- System auto-detects location from device if user consents
- Single text input with intelligent parsing (e.g., "John Smith 555-1234 123 Main St")

---

### Step 2: What & How Much
**AI Prompt:**
"What are you donating? Just tell me in your own words - I'll figure out the details.

Examples: '50 water bottles' or '20 canned goods and 10 blankets'"

**Data Captured:**
- Supply descriptions (AI categorizes automatically)
- Quantities
- Total approximate weight (system estimates based on items)

**Smart Processing:**
- AI parses natural language ("cases of water" = ~24 bottles per case)
- Auto-categorizes supplies (water, food, medical, shelter, etc.)
- Estimates weight/volume for logistics
- Asks only if critical info is unclear: "Did you mean 50 individual bottles or 50 cases?"

---

### Step 3: Simple Logistics
**AI Prompt:**
"Can you deliver these supplies, or do they need to be picked up?"

**Buttons/Quick Options:**
- "I can deliver" → "How far can you drive? (5 / 10 / 25 / 50+ miles)"
- "Pickup only" → "When are you available? (Today / Tomorrow / This Week / Anytime)"

**Data Captured:**
- Delivery capability (Yes/No)
- Delivery radius OR pickup availability
- System assumes: standard vehicle capacity unless flagged as oversized items

**Smart Defaults:**
- If items are clearly oversized (furniture, pallets), system auto-asks: "Need special truck?"
- Otherwise assumes normal car/van capacity

---

### Step 4: Done!
**AI Prompt:**
"Perfect! You're registered:

✓ [Name] at [Address]
✓ [Supply list]
✓ [Delivery/Pickup status]

We'll text you when someone needs your supplies. Usually within a few hours.

Change anything? Reply EDIT
Add more supplies later? Reply ADD"

**System Actions:**
- Provider record created
- Immediate matching algorithm runs
- SMS confirmation sent
- Provider can update via simple text commands

---

## Section 2: Seeker Flow (Simplified)

### Objective
Quickly connect people in need with available supplies. Target completion time: 2-3 minutes, then immediate matching.

---

### Step 1: Quick Registration
**AI Prompt:**
"I'll help you get supplies fast. Just need:
1. Your name
2. Phone number  
3. Where you are (address or cross streets)"

**Data Captured:**
- Name
- Phone number
- Location (auto-geocoded)

**Smart Defaults:**
- Location from device if available
- Cross streets acceptable if full address unknown
- "I'm at [landmark]" parsed to closest address

---

### Step 2: What Do You Need
**AI Prompt:**
"What do you need most urgently?

Just list it naturally - I'll understand.
Example: 'water, food for 4 people, baby formula'"

**Quick Buttons for Common Needs:**
[Water] [Food] [Medicine] [Shelter] [Baby Items] [Other]

**Data Captured:**
- Supply needs (AI categorizes)
- Quantities (estimated from context: "4 people" = ~1-2 days supplies for 4)
- Priority items flagged (baby formula, medicine, water = critical)

**Smart Processing:**
- "Family of 5" → system estimates standard supply needs
- Critical items auto-prioritized
- Only asks follow-up if truly needed: "Is the baby formula urgent? (Yes/No)"

---

### Step 3: Simple Logistics
**AI Prompt:**
"Can you pick up supplies, or do you need delivery?"

**Buttons/Quick Options:**
- "I can pick up" → "How far can you travel? (5 / 10 / 25 miles)"
- "Need delivery" → "When can you receive? (Anytime / Specific time)"

**Data Captured:**
- Pickup capability (Yes/No)
- Travel radius OR delivery availability
- Special needs (only if volunteered: "stairs", "no vehicle", etc.)

---

### Step 4: Finding Matches (Immediate)
**AI Prompt:**
"Searching for supplies now... This takes about 30 seconds."

**System Process:**
- Instant matching algorithm runs
- Prioritizes: Critical needs > Proximity > Complete matches > Transportation fit
- Transportation decision: Provider delivers if both have transport, otherwise whoever can handle it

---

### Step 5: Match Results

**Scenario A: Good Match Found (Most Common)**

**AI Prompt:**
"✓ Found supplies for you!

**[Provider Name]** has:
• [Matching items list]
• [Distance] away
• [Delivery to you] OR [Pickup at their location]
• Available: [Today/Tomorrow/timeframe]

Reply YES to accept
Reply INFO for provider contact details"

**On YES:**
"Great! I've connected you both.

[Provider] will [deliver/be ready for pickup] [timeframe]
Their number: [Phone]
Your confirmation: #[ID]

Need help? Reply HELP"

---

**Scenario B: Partial Match**

**AI Prompt:**
"Found partial match:

**[Provider Name]** has [X] of [Y] items you need:
• [Available items]
• [Distance/Delivery info]

Reply:
YES - I'll take what's available
WAIT - Search for complete match (may take longer)
MORE - Show other options"

---

**Scenario C: Multiple Providers Needed**

**AI Prompt:**
"Your needs can be met from 2-3 locations:

**Option 1:** Get everything in [number] stops
• Stop 1: [Items] from [Provider A] - [Distance]
• Stop 2: [Items] from [Provider B] - [Distance]
• Total: [X] miles, [Y] minutes

**Option 2:** One stop now, complete match later
• [Items] from [Provider C]
• [Missing items] - I'll notify when available

Which works better? (1 or 2)"

**Smart Route:**
- If Option 1 selected, system provides optimized route
- Coordinates timing with all providers
- Sends simple map with stops numbered

---

**Scenario D: No Transport Available (Neither Party)**

**AI Prompt:**
"Found your supplies at [Provider], but there's a transport issue.

Searching for volunteer drivers... (30 sec)"

[If transporter found:]
"✓ Driver available! [Name] can deliver from [Provider] to you [timeframe].

Accept? (YES/NO)"

[If no transporter:]
"No drivers available yet. Options:

1. WAIT - I'll keep searching (text when found)
2. EXPAND - Search farther away  
3. PARTIAL - Get what's nearby now

Reply 1, 2, or 3"

---

### Step 6: Simple Confirmation
**AI Prompt:**
"All set! 

📦 [Items]
📍 [Delivery/Pickup details]
📅 [Date/time]
📞 [Contact info]

You'll get a reminder 2 hours before.

Need changes? Reply CHANGE"

---

### Step 7: Quick Follow-Up (Auto-sent after delivery)
**AI Prompt:**
"Did you receive your supplies?

YES - All good
NO - Something went wrong  
NEED MORE - Still need items"

**If YES:**
"Glad we could help! The [Provider] appreciates knowing they made a difference."

**If NO or NEED MORE:**
"I'm sorry! Let me help fix this now. [Quick re-matching or issue resolution]"

---

## Simplified Matching Algorithm

### Priority Order (Fast Decision Tree)
1. **Critical needs first:** Medicine, water, baby items
2. **Closest match:** Within 10 miles preferred
3. **Transportation fit:** Whoever can deliver/pickup does
4. **Completeness:** 80%+ match preferred over multiple stops
5. **Availability:** Immediate > Today > Tomorrow

### Transportation Logic (Simplified)
```
IF both have transport → Provider delivers
ELSE IF provider has transport → Provider delivers  
ELSE IF seeker has transport → Seeker picks up
ELSE → Search volunteer transporters (30 sec timeout)
  IF volunteer found → Schedule transport
  ELSE → Offer options: wait, expand search, or partial fulfillment
```

### Auto-Routing for Multiple Stops
- Calculate shortest route automatically
- Prioritize critical items first (medicine before blankets)
- Limit to 3 stops maximum (if more needed, do partial now + later)
- Send simple navigation: "1. Provider A (123 Main) 2. Provider B (456 Oak)"

---

## Emergency Simplifications

### Voice Mode (Optional)
For users in distress or elderly:
- "Just tell me what you need and where you are"
- AI extracts all info from natural speech
- Confirms with single yes/no question
- Handles entire flow in 60 seconds

### SMS-Only Mode
For users without smartphones:
- All interactions via text message
- Short codes: "WATER FOOD" instead of sentences
- Location: "Main St & 5th" acceptable
- Matching results: Simple text with phone numbers

### Critical Override
If seeker uses words like "emergency," "urgent," "dying," "baby":
- Skip logistics questions
- Auto-match closest provider regardless of completeness
- Flag for immediate human review
- Notify emergency services if appropriate

---

## Error Handling (Minimal Friction)

### Missing Information
Instead of asking again, use smart defaults:
- No quantity given? Assume "enough for family of 4, 2 days"
- No timeframe? Assume "ASAP"
- Unclear address? Use closest landmark/intersection

### No Matches Available
**AI Prompt:**
"No matches right now, but I'll keep searching.

I'll text you when supplies arrive (usually 1-4 hours).

Meanwhile, here are other local resources:
[3 nearest shelters/food banks with phone numbers]

Stay on the list? (YES/NO)"

### Match Falls Through
**AI Prompt:**
"[Provider] became unavailable. Finding new match now... (30 sec)"

[Auto-searches and presents new match immediately]
[OR if none available: "Added you to priority list. Text coming soon."]

---

## Mobile-First Design Notes

### Input Methods
- Voice input option for every text field
- Large tap targets for buttons
- Auto-capitalization off (reduces typos during stress)
- Predictive text for common supplies

### Visual Simplicity  
- Progress indicator: "Step 2 of 3"
- Big buttons: "CAN DELIVER" vs "PICKUP ONLY"
- Color coding: Green = Good match, Yellow = Partial, Red = Critical need
- Map preview for distances (picture worth 1000 words)

### Offline Resilience
- Saves partial inputs if connection drops
- "Sending..." indicator with retry
- SMS fallback if app fails

---

## Communication (Minimal, Targeted)

### Only Send Messages When:
1. Match found
2. 2-hour reminder before delivery/pickup
3. Something changes or goes wrong
4. Follow-up after delivery

### Message Tone
- Brief and clear
- Action-focused
- Empathetic but not chatty
- Use emojis sparingly for visual scanning (✓ ✗ 📦 📍)

---

## Success Metrics

**Speed Metrics:**
- Provider registration: <2 minutes
- Seeker registration: <2 minutes  
- Time to first match: <5 minutes
- Match acceptance rate: >80%

**Satisfaction Metrics:**
- Successful deliveries: >90%
- Would recommend: >85%
- Process clarity rating: >4/5

**Efficiency Metrics:**
- Questions asked per flow: <8
- User drop-off rate: <10%
- Re-matching needed: <15%