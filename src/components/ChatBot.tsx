import { useState, useRef, useEffect } from 'react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdwbzzk';

// Everything the bot knows about Togethr — its "training" on the site
const KNOWLEDGE = `
TOGETHR — fakta:
- Togethr drivs av Otto, en ung webbutvecklare från Stenungsund.
- Bygger hemsidor för lokala företag, designade från grunden, mobilanpassade och SEO-optimerade.
- Allt ingår: design, bygge, domän, hosting, support och löpande uppdateringar.
- Kan även koppla in bokningssystem direkt på hemsidan.
- Man kan få en kostnadsfri demo där Otto bygger en skiss på hur hemsidan skulle kunna se ut. Tar ca 20 minuter att gå igenom.
- Otto hör av sig inom en dag.
- Senaste projekt: hemsida för Maltes Stig (maltesstig.com), live nu.
- Process: 1) Samtal om vad du behöver  2) Otto designar och visar förslag  3) Bygger och justerar tills det känns rätt  4) Lansering tillsammans.
- Kontakt: togethrse@gmail.com, telefon 070-422 38 87.
`;

const SYSTEM_PROMPT = `Du är Togethrs vänliga chattassistent på hemsidan togethr.se. Du hjälper besökare och ditt främsta mål är att boka in ett kostnadsfritt möte (demo) med Otto.

${KNOWLEDGE}

DITT UPPDRAG:
1. Svara vänligt och kort på frågor om Togethr och hemsidor (på svenska, max 3-4 meningar).
2. Sträva alltid mot att boka ett möte. När någon visar minsta intresse, föreslå en kostnadsfri demo.
3. För att boka behöver du samla in TRE saker: personens NAMN, deras EMAIL, och VAD de vill ha hjälp med (deras företag/behov). Fråga om en sak i taget, naturligt.
4. När du har namn + email + vad de vill ha, bekräfta uppgifterna och skriv EXAKT denna rad på en egen rad sist i ditt svar (användaren ser inte denna rad, den används för bokningen):
[[BOOKING]]{"name":"<namn>","email":"<email>","need":"<vad de vill ha>","time":"<önskad tid om angiven, annars 'flexibel'>"}[[/BOOKING]]
5. Nämn ALDRIG pris. Säg att Otto går igenom det personligen på mötet.
6. Om någon frågar om något helt orelaterat, svara vänligt att du helst pratar om hur Togethr kan hjälpa deras företag.

Var varm, personlig och inte säljig. Du representerar Otto.`;

function parseBooking(text: string): { clean: string; booking: Record<string, string> | null } {
  const match = text.match(/\[\[BOOKING\]\]([\s\S]*?)\[\[\/BOOKING\]\]/);
  if (!match) return { clean: text, booking: null };
  let booking: Record<string, string> | null = null;
  try {
    booking = JSON.parse(match[1].trim());
  } catch {
    booking = null;
  }
  const clean = text.replace(/\[\[BOOKING\]\][\s\S]*?\[\[\/BOOKING\]\]/, '').trim();
  return { clean, booking };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hej! Jag hjälper dig gärna med frågor om Togethr — och kan boka in en kostnadsfri demo med Otto. Vad kan jag hjälpa dig med?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, loading]);

  const submitBooking = async (b: Record<string, string>) => {
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: b.name || '',
          email: b.email || '',
          message: `[CHATBOT-BOKNING] Vill ha hjälp med: ${b.need || '-'}. Önskad tid: ${b.time || 'flexibel'}.`,
          _subject: `Ny demo-bokning via chatten: ${b.name || 'okänd'}`,
        }),
      });
      setBooked(true);
    } catch {
      // booking fetch failed silently — Otto can still follow up from the conversation
    }
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput('');
    const next = [...messages, { role: 'user' as const, content: userText }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 350,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...next.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('OpenAI error:', res.status, errText);
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Hoppsan — jag kan inte svara just nu. Mejla gärna togethrse@gmail.com så svarar Otto direkt!' }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || '';
      const { clean, booking } = parseBooking(raw);
      setMessages((prev) => [...prev, { role: 'assistant', content: clean || 'Tack! Otto hör av sig snart.' }]);
      if (booking && booking.email) {
        await submitBooking(booking);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Något gick fel med uppkopplingen. Mejla gärna togethrse@gmail.com så svarar Otto direkt!' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Öppna chatt"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: open ? '#C9A84C' : '#1B2E4B',
          color: open ? '#1B2E4B' : '#F5F2EC',
          boxShadow: '0 8px 30px rgba(27,46,75,0.28)',
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] rounded-3xl overflow-hidden flex flex-col"
          style={{
            height: 520,
            maxHeight: 'calc(100vh - 8rem)',
            background: '#F5F2EC',
            border: '1px solid rgba(20,25,42,0.12)',
            boxShadow: '0 24px 70px rgba(27,46,75,0.32)',
          }}
        >
          {/* Header */}
          <div style={{ background: '#1B2E4B', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#C9A84C', fontSize: 18 }}>T</span>
            </div>
            <div>
              <div style={{ color: '#F5F2EC', fontSize: 15, fontFamily: "'Fraunces', serif", letterSpacing: '-0.01em' }}>Togethr</div>
              <div style={{ color: 'rgba(245,242,236,0.5)', fontSize: 11, letterSpacing: '0.05em' }}>Chatta med oss</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '11px 15px',
                    fontSize: 14,
                    lineHeight: 1.55,
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.role === 'user' ? '#1B2E4B' : '#FFFFFF',
                    color: m.role === 'user' ? '#F5F2EC' : '#14192A',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(20,25,42,0.08)',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {booked && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '85%', padding: '11px 15px', fontSize: 13, borderRadius: '16px 16px 16px 4px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#1B2E4B' }}>
                  ✓ Din förfrågan är skickad till Otto — han hör av sig inom en dag!
                </div>
              </div>
            )}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(20,25,42,0.08)', borderRadius: '16px 16px 16px 4px', padding: '13px 16px', display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(20,25,42,0.35)', animation: `chatbounce 1s ${i * 150}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid rgba(20,25,42,0.1)', padding: 12, background: '#F5F2EC' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Skriv ett meddelande..."
                style={{ flex: 1, background: '#FFFFFF', border: '1px solid rgba(20,25,42,0.15)', borderRadius: 12, padding: '11px 15px', fontSize: 14, color: '#14192A', outline: 'none', fontFamily: 'inherit' }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Skicka"
                style={{ padding: '0 16px', borderRadius: 12, background: '#1B2E4B', color: '#F5F2EC', border: 'none', cursor: loading || !input.trim() ? 'default' : 'pointer', opacity: loading || !input.trim() ? 0.4 : 1, transition: 'opacity 0.2s' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes chatbounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}