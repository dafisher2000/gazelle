/**
 * Supply Data Extraction
 * Extracts structured supply information from AI conversations
 */

export interface ExtractedSupply {
  category: string; // Will be mapped to category_id
  name: string;
  quantity: number;
  unit: string; // bottles, cases, boxes, pounds, etc.
  condition: string; // sealed, unopened, new, etc.
  location?: string;
  hasTransportation?: boolean;
  canDeliver?: boolean;
  notes?: string;
  expirationDate?: string; // ISO format if applicable
}

export interface SupplyExtractionTool {
  name: 'record_supply_donation';
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required: string[];
  };
}

/**
 * Claude tool definition for extracting supply donations
 */
export const SUPPLY_EXTRACTION_TOOL: SupplyExtractionTool = {
  name: 'record_supply_donation',
  description: 'Records a supply donation after collecting all necessary information from the provider. Use this tool when you have gathered: what supplies they have, quantity, condition, and their location. This creates a record in the database for matching with people in need.',
  input_schema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: [
          'Water',
          'Food - Non-Perishable',
          'Medical Supplies',
          'Hygiene Products',
          'Clothing',
          'Bedding & Blankets',
          'Cleaning Supplies',
          'Baby Supplies',
          'Flashlights & Batteries',
          'Tools & Equipment'
        ],
        description: 'The category of supplies being donated'
      },
      name: {
        type: 'string',
        description: 'Specific description of the supply (e.g., "Bottled Water 16.9oz", "Canned Soup", "First Aid Kit")'
      },
      quantity: {
        type: 'number',
        description: 'Numeric quantity of the supply'
      },
      unit: {
        type: 'string',
        description: 'Unit of measurement (bottles, cases, boxes, pounds, items, etc.)'
      },
      condition: {
        type: 'string',
        description: 'Condition of the items (sealed, unopened, new, clean, good condition, etc.)'
      },
      location: {
        type: 'string',
        description: 'General location or area where supplies are located (city, neighborhood, zip code)'
      },
      hasTransportation: {
        type: 'boolean',
        description: 'Whether the provider has transportation available'
      },
      canDeliver: {
        type: 'boolean',
        description: 'Whether the provider can deliver the supplies to a distribution center'
      },
      notes: {
        type: 'string',
        description: 'Any additional notes or special instructions about the donation'
      },
      expirationDate: {
        type: 'string',
        description: 'Expiration date if applicable (ISO format YYYY-MM-DD)'
      }
    },
    required: ['category', 'name', 'quantity', 'unit', 'condition']
  }
};

/**
 * Maps category name to category ID
 */
export function getCategoryId(categoryName: string): number {
  const categoryMap: Record<string, number> = {
    'Water': 1,
    'Food - Non-Perishable': 2,
    'Medical Supplies': 3,
    'Hygiene Products': 4,
    'Clothing': 5,
    'Bedding & Blankets': 6,
    'Cleaning Supplies': 7,
    'Baby Supplies': 8,
    'Flashlights & Batteries': 9,
    'Tools & Equipment': 10
  };

  return categoryMap[categoryName] || 2; // Default to Food if unknown
}

/**
 * Validates extracted supply data
 */
export function validateSupplyData(data: any): ExtractedSupply | null {
  if (!data.category || !data.name || !data.quantity || !data.unit || !data.condition) {
    return null;
  }

  return {
    category: data.category,
    name: data.name,
    quantity: parseFloat(data.quantity),
    unit: data.unit,
    condition: data.condition,
    location: data.location || undefined,
    hasTransportation: data.hasTransportation || false,
    canDeliver: data.canDeliver || false,
    notes: data.notes || undefined,
    expirationDate: data.expirationDate || undefined
  };
}

/**
 * Creates a description for the supply record
 */
export function createSupplyDescription(supply: ExtractedSupply): string {
  let desc = `${supply.quantity} ${supply.unit} of ${supply.name}`;
  if (supply.condition) {
    desc += ` (${supply.condition})`;
  }
  if (supply.expirationDate) {
    desc += ` - Expires: ${supply.expirationDate}`;
  }
  return desc;
}
