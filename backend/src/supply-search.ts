/**
 * Supply Search Module
 * Searches database for available supplies to match seeker needs
 */

export interface SupplySearchParams {
  category: string;
  quantity?: number;
  location?: string;
  maxDistanceMiles?: number;
}

export interface SupplySearchResult {
  id: number;
  name: string;
  category: string;
  quantity: number;
  location: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  available: boolean;
  mapLink?: string;
  staticMapUrl?: string;
}

export interface SupplySearchTool {
  name: 'search_available_supplies';
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required: string[];
  };
}

/**
 * Claude tool definition for searching available supplies
 */
export const SUPPLY_SEARCH_TOOL: SupplySearchTool = {
  name: 'search_available_supplies',
  description: 'Searches the database for available supplies that match what the seeker needs. Use this tool after understanding what supplies they need. Returns matching supplies with locations and distances.',
  input_schema: {
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        items: {
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
          ]
        },
        description: 'Array of supply categories the seeker needs (can search multiple at once)'
      },
      zipCode: {
        type: 'string',
        description: 'Seeker\'s zip code or general location (e.g., "77002", "Houston", "downtown")'
      },
      maxDistanceMiles: {
        type: 'number',
        description: 'Maximum distance in miles to search (default: 25 miles)'
      }
    },
    required: ['categories']
  }
};

/**
 * Maps category name to category ID
 */
export function getCategoryIdForSearch(categoryName: string): number {
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

  return categoryMap[categoryName] || 0;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Generate a Mapbox static map URL for embedding
 * Creates a map with a marker at the supply location
 */
export function generateMapboxStaticMapUrl(
  latitude: number,
  longitude: number,
  locationName: string,
  mapboxToken: string,
  width: number = 600,
  height: number = 400,
  zoom: number = 14
): string {
  // Mapbox Static Images API
  // Format: https://api.mapbox.com/styles/v1/{username}//{style_id}/static/{overlay}/{lon},{lat},{zoom}/{width}x{height}{@2x}

  // Add a red marker pin at the location
  const marker = `pin-l+ff0000(${longitude},${latitude})`;

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${marker}/${longitude},${latitude},${zoom}/${width}x${height}@2x?access_token=${mapboxToken}`;

  return url;
}

/**
 * Generate a Mapbox interactive map URL
 * Opens in a new tab/window with full interactivity
 */
export function generateMapboxInteractiveUrl(
  latitude: number,
  longitude: number,
  locationName: string
): string {
  // Opens Google Maps (more universally accessible)
  // Alternative: Mapbox GL JS embedded map
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

/**
 * Format search results for AI response
 */
export function formatSearchResults(
  results: SupplySearchResult[],
  language: 'en' | 'es'
): string {
  if (results.length === 0) {
    return language === 'es'
      ? 'No encontré suministros disponibles que coincidan con sus necesidades en este momento.'
      : 'I didn\'t find any available supplies matching your needs at this time.';
  }

  const header = language === 'es'
    ? 'Encontré los siguientes suministros disponibles:'
    : 'I found the following available supplies:';

  const items = results.map((result, index) => {
    const distanceText = result.distance
      ? (language === 'es' ? ` - ${result.distance} millas de distancia` : ` - ${result.distance} miles away`)
      : '';

    const mapText = result.mapLink
      ? (language === 'es' ? '\n   📍 Ver mapa: ' : '\n   📍 View map: ') + result.mapLink
      : '';

    return language === 'es'
      ? `${index + 1}. ${result.name} en ${result.location}${distanceText}${mapText}`
      : `${index + 1}. ${result.name} at ${result.location}${distanceText}${mapText}`;
  });

  const footer = language === 'es'
    ? '\n\n¿Le gustaría reservar alguno de estos suministros?'
    : '\n\nWould you like to reserve any of these supplies?';

  return header + '\n\n' + items.join('\n') + footer;
}

/**
 * Get category name in specified language
 */
export function getCategoryName(categoryId: number, language: 'en' | 'es'): string {
  const categories: Record<number, { en: string; es: string }> = {
    1: { en: 'Water', es: 'Agua' },
    2: { en: 'Food - Non-Perishable', es: 'Alimentos - No Perecederos' },
    3: { en: 'Medical Supplies', es: 'Suministros Médicos' },
    4: { en: 'Hygiene Products', es: 'Productos de Higiene' },
    5: { en: 'Clothing', es: 'Ropa' },
    6: { en: 'Bedding & Blankets', es: 'Ropa de Cama y Mantas' },
    7: { en: 'Cleaning Supplies', es: 'Productos de Limpieza' },
    8: { en: 'Baby Supplies', es: 'Suministros para Bebés' },
    9: { en: 'Flashlights & Batteries', es: 'Linternas y Baterías' },
    10: { en: 'Tools & Equipment', es: 'Herramientas y Equipo' }
  };

  return categories[categoryId]?.[language] || 'Unknown';
}
