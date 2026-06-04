import { useState, useRef, useEffect } from 'react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

// System prompt — keeps the bot strictly on-topic about Togethr
const SYSTEM_PROMPT = `Du är Togethrs hjälpsamma chattassistent på hemsidan togethr.se.

Om Togethr:
- Togethr drivs av Otto, en ung webbutvecklare från Stenungsund.
- Togethr bygger hemsidor för lokala företag — designade från grunden, mobilanpassade och SEO-optimerade.
- Allt ingår: design, bygge, domän, hosting, support och uppdateringar.
- Man kan få en kostnadsfri demo. Otto hör av sig inom en dag.
- Kontakt: togethrse@gmail.com, telefon 070-422 38 87.

Regler:
- Svara ENDAST på frågor om Togethr, hemsidor, och hur Otto kan hjälpa företag.
- Om någon frågar om något helt orelaterat (t.ex. matlagning, läxor, kod), svara vänligt att du bara kan hjälpa till med frågor om Togethr och hemsidor.
- Nämn ALDRIG ett specifikt pris. Om någon frågar vad det kostar, säg att Otto går igenom det personligen och att man kan boka en kostnadsfri demo via kontaktformuläret.
- Håll svaren korta, vänliga och på svenska. Max 3-4 meningar.
- Uppmuntra besökaren att höra av sig eller boka en demo.`;

const MAX_MESSAGES = 8; // limit conversation length per session

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hej! Jag kan svara på frågor om Togethr och hur Otto kan hjälpa ditt företag. Vad undrar du?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const userMsgCount = messages.filter((m) => m.role === 'user').length;
  const limitReached = userMsgCount >= MAX_MESSAGES;

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading || limitReached) return;
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
          max_tokens: 250,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...next.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Något gick fel, försök igen eller mejla togethrse@gmail.com.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Kunde inte svara just nu. Mejla gärna togethrse@gmail.com så svarar Otto direkt!' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Öppna chatt"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-navy text-cream shadow-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors duration-300"
        style={{ boxShadow: '0 8px 30px rgba(27,46,75,0.25)' }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl overflow-hidden flex flex-col bg-cream border border-ink/15"
          style={{ height: 480, maxHeight: 'calc(100vh - 8rem)', boxShadow: '0 20px 60px rgba(27,46,75,0.3)' }}
        >
          {/* Header */}
          <div className="bg-navy px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-sm font-serif italic">T</span>
            </div>
            <div>
              <div className="text-cream text-sm font-medium">Togethr</div>
              <div className="text-cream/50 text-xs">Svarar oftast direkt</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#F5F2EC' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-navy text-cream rounded-br-sm'
                      : 'bg-white text-ink border border-ink/8 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-ink/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-ink/40" style={{ animation: `chatbounce 1s ${i * 150}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-ink/10 p-3 bg-cream">
            {limitReached ? (
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="block text-center text-sm bg-navy text-cream rounded-xl py-3 hover:bg-gold hover:text-navy transition-colors"
              >
                Boka en kostnadsfri demo →
              </a>
            ) : (
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Skriv en fråga..."
                  className="flex-1 bg-white border border-ink/15 rounded-xl px-4 py-2.5 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="px-4 rounded-xl bg-navy text-cream hover:bg-gold hover:text-navy transition-colors disabled:opacity-40"
                  aria-label="Skicka"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes chatbounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}