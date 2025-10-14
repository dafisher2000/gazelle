/**
 * Gazelle Backend API
 * Natural Disaster Resource Matching App
 */

export interface Env {
  // D1 Database
  DB: D1Database;

  // KV Namespaces
  SESSIONS: KVNamespace;
  CACHE: KVNamespace;

  // Environment Variables
  CLAUDE_API_KEY: string;
  PRIVY_APP_ID: string;
  PRIVY_APP_SECRET: string;
  GEOCODING_API_KEY: string;
  SMS_API_KEY: string;
  SMS_API_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // API Router
    if (path.startsWith('/api/')) {
      return handleApiRequest(request, env, path, corsHeaders);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};

async function handleApiRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  try {
    // Auth endpoints
    if (path.startsWith('/api/auth/')) {
      return handleAuthRequest(request, env, path, corsHeaders);
    }

    // Chat endpoints
    if (path.startsWith('/api/chat/')) {
      return handleChatRequest(request, env, path, corsHeaders);
    }

    // Inventory endpoints
    if (path.startsWith('/api/supplies')) {
      return handleSuppliesRequest(request, env, path, corsHeaders);
    }

    // Reservations endpoints
    if (path.startsWith('/api/reservations')) {
      return handleReservationsRequest(request, env, path, corsHeaders);
    }

    // Locations endpoints
    if (path.startsWith('/api/locations')) {
      return handleLocationsRequest(request, env, path, corsHeaders);
    }

    // Geocoding endpoints
    if (path.startsWith('/api/geocode')) {
      return handleGeocodeRequest(request, env, path, corsHeaders);
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

// Placeholder handlers - will be implemented in separate modules
async function handleAuthRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Auth endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleChatRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Chat endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleSuppliesRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Supplies endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleReservationsRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Reservations endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleLocationsRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Locations endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleGeocodeRequest(
  request: Request,
  env: Env,
  path: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Geocode endpoint - not yet implemented' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
