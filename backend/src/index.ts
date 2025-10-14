/**
 * Gazelle Backend API
 * Natural Disaster Resource Matching App
 */

import { getEnhancedSystemPrompt } from './knowledge-base';
import { SUPPLY_EXTRACTION_TOOL, getCategoryId, validateSupplyData, createSupplyDescription } from './supply-extraction';

export interface Env {
  // D1 Database
  DB: D1Database;

  // KV Namespaces
  SESSIONS: KVNamespace;
  CACHE: KVNamespace;

  // Environment Variables - Required
  CLAUDE_API_KEY: string;
  PRIVY_APP_ID: string;
  PRIVY_APP_SECRET: string;
  MAPBOX_TOKEN: string;

  // Environment Variables - Optional
  RESEND_API_KEY?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
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
  if (path === '/api/chat/message' && request.method === 'POST') {
    try {
      const body = await request.json() as {
        message: string;
        type: 'provider' | 'seeker';
        language: 'en' | 'es';
        conversationHistory?: Array<{ role: string; content: string }>;
      };

      // Build system prompt based on type and language using enhanced knowledge base
      const systemPrompt = getEnhancedSystemPrompt(body.type, body.language);

      // Build messages array for Claude
      const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

      // Add conversation history if exists
      if (body.conversationHistory && body.conversationHistory.length > 0) {
        body.conversationHistory.forEach((msg) => {
          if (msg.role === 'user' || msg.role === 'assistant') {
            messages.push({
              role: msg.role,
              content: msg.content,
            });
          }
        });
      }

      // Add current message
      messages.push({
        role: 'user',
        content: body.message,
      });

      // Prepare Claude API request - include tools for provider conversations
      const claudeRequestBody: any = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      };

      // Only add tools for provider conversations
      if (body.type === 'provider') {
        claudeRequestBody.tools = [SUPPLY_EXTRACTION_TOOL];
      }

      // Call Claude API
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(claudeRequestBody),
      });

      if (!claudeResponse.ok) {
        const errorText = await claudeResponse.text();
        console.error('Claude API Error:', errorText);
        throw new Error(`Claude API failed: ${claudeResponse.status}`);
      }

      const claudeData = await claudeResponse.json() as {
        content: Array<{ type: string; text?: string; id?: string; name?: string; input?: any }>;
        stop_reason: string;
      };

      // Check if Claude wants to use a tool
      let responseText = '';
      let supplyRecorded = false;

      for (const content of claudeData.content) {
        if (content.type === 'text' && content.text) {
          responseText = content.text;
        } else if (content.type === 'tool_use' && content.name === 'record_supply_donation') {
          // Claude wants to record a supply donation
          const supplyData = validateSupplyData(content.input);

          if (supplyData) {
            try {
              // For now, we'll create a test user and location
              // In production, these would come from the authenticated user and geocoding
              const categoryId = getCategoryId(supplyData.category);
              const description = createSupplyDescription(supplyData);

              // Insert supply into database
              const result = await env.DB.prepare(`
                INSERT INTO supplies (
                  name,
                  category_id,
                  location_id,
                  quantity,
                  added_by_user_id,
                  status,
                  expiration_date
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
              `).bind(
                description,
                categoryId,
                1, // Default location for now (Houston Community Center)
                supplyData.quantity,
                1, // Default user ID for now
                'available',
                supplyData.expirationDate || null
              ).run();

              supplyRecorded = true;

              const successMessage = body.language === 'es'
                ? `¡Perfecto! He registrado su donación de ${description}. Gracias por su generosidad. Le notificaremos cuando alguien necesite estos suministros.`
                : `Perfect! I've recorded your donation of ${description}. Thank you for your generosity. We'll notify you when someone needs these supplies.`;

              responseText = successMessage;
            } catch (dbError) {
              console.error('Database error:', dbError);
              const errorMessage = body.language === 'es'
                ? 'Lo siento, hubo un error al registrar su donación. Por favor, intente de nuevo.'
                : 'I apologize, there was an error recording your donation. Please try again.';
              responseText = errorMessage;
            }
          }
        }
      }

      if (!responseText) {
        responseText = 'I apologize, but I encountered an error.';
      }

      return new Response(
        JSON.stringify({ response: responseText, supplyRecorded }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      return new Response(
        JSON.stringify({
          response: 'I apologize, but I encountered an error. Please try again.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Old getSystemPrompt function removed - now using getEnhancedSystemPrompt from knowledge-base.ts

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
