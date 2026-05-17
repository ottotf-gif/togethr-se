import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatMessage {
  message: string;
  sessionId?: string;
  context?: {
    previousMessages?: Array<{ role: string; content: string }>;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, sessionId, context }: ChatMessage = await req.json();

    const earlierMessages = context?.previousMessages || [];

    try {
      const webhookResult = await fetch('https://hook.eu2.make.com/ll4r45jgeniy20mfvdq4pqpk0cyqsi3h', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId || 'unknown',
          timestamp: new Date().toISOString(),
          currentMessage: message,
          earlierMessages: earlierMessages
        }),
      });

      const responseText = await webhookResult.text();

      let aiResponse;
      try {
        const jsonData = JSON.parse(responseText);
        aiResponse = jsonData.response || jsonData.message || jsonData.text || responseText;
      } catch {
        aiResponse = responseText;
      }

      return new Response(
        JSON.stringify({
          response: aiResponse
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (webhookError) {
      console.error('Webhook error:', webhookError);
      return new Response(
        JSON.stringify({
          response: 'Förlåt, AI-tjänsten svarar inte just nu. Försök igen om ett ögonblick.'
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
