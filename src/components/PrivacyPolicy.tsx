import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUp, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from '../lib/router';

/**
 * Full-page Privacy Policy at /privacy-policy. Mirrors the Togethr AI
 * privacy policy (last updated April 24, 2026).
 */

const SECTIONS: { id: string; title: string }[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'what-we-collect', title: 'What we collect' },
  { id: 'third-party-services', title: 'Third-party services' },
  { id: 'tracking', title: 'Tracking' },
  { id: 'your-rights', title: 'Your rights' },
  { id: 'children', title: 'Children' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact' },
];

export default function PrivacyPolicy() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative bg-[#F7F8FC] min-h-screen">
      <header className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-24 text-center">
          <Link
            to="/"
            className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-xs text-white/85 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
          >
            <ShieldCheck className="w-7 h-7 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-2xl tracking-tight text-white/90"
          >
            Togethr AI
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display italic text-4xl sm:text-5xl mt-1 tracking-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs text-white/95 ring-1 ring-white/20"
          >
            Last updated: April 24, 2026
          </motion.div>
        </div>

        <div className="absolute -bottom-px inset-x-0 h-12 bg-gradient-to-b from-transparent to-[#F7F8FC]" />
      </header>

      <main className="max-w-6xl mx-auto px-5 -mt-14 pb-20 relative">
        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3 lg:order-2">
            <div className="sticky top-8">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  On this page
                </div>
                <nav className="flex flex-col gap-1.5">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-sm text-slate-600 hover:text-blue-600 transition-colors py-1 border-l-2 border-transparent hover:border-blue-500 pl-3 -ml-px"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-9 lg:order-1"
          >
            <article className="rounded-3xl bg-white border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.06)] overflow-hidden">
              <div className="p-8 sm:p-12 divide-y divide-slate-100">
                <Section id="introduction" title="Introduction" first>
                  <p>
                    Togethr AI ("we", "us", "the app") is a personal productivity
                    assistant built to help you focus on what matters. This policy
                    explains what data we handle, how we handle it, and which
                    third parties are involved.
                  </p>
                  <p>
                    Togethr AI is currently in early development and is operated
                    by an individual developer based in Sweden.
                  </p>
                  <Highlight>
                    <strong>Quick summary:</strong> We don't run a server that
                    stores your data. Your information stays on your device or
                    flows directly between you and the services you connect
                    (Google, Microsoft, OpenAI, Slack). We do not sell or share
                    your data.
                  </Highlight>
                </Section>

                <Section id="what-we-collect" title="What we collect">
                  <SubHeading>Stored on your device</SubHeading>
                  <p>
                    The following is stored locally in iOS UserDefaults and
                    Keychain. It never leaves your device unless you use a
                    feature that connects to an external service:
                  </p>
                  <List
                    items={[
                      'Your name and email address (entered in onboarding)',
                      'Your goals, role, industry, and communication preferences',
                      'Your mail priority rules (important senders, keywords, blocked senders)',
                      'OAuth access tokens for connected services',
                      'Chat history with the Togethr AI assistant',
                      'Cached emails, calendar events, reminders, and chat messages from connected services',
                    ]}
                  />
                  <SubHeading>We never collect</SubHeading>
                  <List
                    items={[
                      'Passwords — authentication is always handled by the service provider via OAuth',
                      'Payment information',
                      'Location data',
                      'Health data, biometrics, or contacts',
                      'Analytics or tracking identifiers',
                    ]}
                  />
                </Section>

                <Section id="third-party-services" title="Third-party services">
                  <p>
                    Togethr AI acts as a client that talks directly to the
                    services you choose to connect. We operate no backend server
                    that proxies your data.
                  </p>

                  <SubHeading>OpenAI (required for AI features)</SubHeading>
                  <p>
                    When you use AI features (email triage, smart drafts, chat
                    assistant, lead detection, daily briefings), the relevant
                    content is sent directly from your device to OpenAI's API
                    using the GPT-4o model. This includes:
                  </p>
                  <List
                    items={[
                      'Email subject lines, senders, and previews (for triage and lead detection)',
                      'Your typed messages (for the chat assistant)',
                      'Your prompts and onboarding answers (for draft generation and briefings)',
                    ]}
                  />
                  <p>
                    Per{' '}
                    <Ext href="https://openai.com/policies/api-data-usage-policies/">
                      OpenAI's API data policy
                    </Ext>
                    , data sent via the API is not used to train their models
                    and is retained for up to 30 days for abuse monitoring
                    before deletion.
                  </p>

                  <SubHeading>Google (optional)</SubHeading>
                  <p>
                    If you connect Gmail or Google Calendar, the app uses Google
                    Sign-In to obtain an OAuth access token. Your email and
                    calendar data is then read and written directly via Google's
                    APIs. See{' '}
                    <Ext href="https://policies.google.com/privacy">
                      Google's privacy policy
                    </Ext>
                    .
                  </p>

                  <SubHeading>Microsoft (optional)</SubHeading>
                  <p>
                    If you connect Outlook or Microsoft Teams, the app uses the
                    Microsoft Identity Platform to obtain an OAuth access token.
                    Email and chat data flows between your device and Microsoft
                    Graph. See{' '}
                    <Ext href="https://privacy.microsoft.com/privacystatement">
                      Microsoft's privacy statement
                    </Ext>
                    .
                  </p>

                  <SubHeading>Slack (optional)</SubHeading>
                  <p>
                    If you connect Slack, the app obtains an OAuth token and
                    reads messages and channels via Slack's API. See{' '}
                    <Ext href="https://slack.com/trust/privacy/privacy-policy">
                      Slack's privacy policy
                    </Ext>
                    .
                  </p>

                  <SubHeading>Supabase (feedback only)</SubHeading>
                  <p>
                    When you submit feedback from Settings → Send Feedback, your
                    rating, message, optional screenshot, email, name, and
                    device info are sent to our Supabase database. This is the
                    only time any data leaves your device to a server we
                    operate. See{' '}
                    <Ext href="https://supabase.com/privacy">
                      Supabase's privacy policy
                    </Ext>
                    .
                  </p>
                </Section>

                <Section id="tracking" title="Tracking">
                  <p>
                    Togethr AI does not track you across other apps or websites.
                    We do not use advertising identifiers, analytics SDKs, or
                    behavioral trackers of any kind.
                  </p>
                </Section>

                <Section id="your-rights" title="Your rights">
                  <p>
                    Because your data lives on your device and in the accounts
                    you own, you are in full control:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700 marker:text-blue-500">
                    <li>
                      <strong>Disconnect any service</strong> — Settings → Mail
                      / Chats. This removes the OAuth token from your device.
                    </li>
                    <li>
                      <strong>Reset the app</strong> — Settings → Reset App.
                      This clears all local data.
                    </li>
                    <li>
                      <strong>Delete the app</strong> — iOS removes all local
                      data when you uninstall.
                    </li>
                    <li>
                      <strong>Revoke access at the source</strong> — visit{' '}
                      <Ext href="https://myaccount.google.com/permissions">
                        Google
                      </Ext>
                      ,{' '}
                      <Ext href="https://account.microsoft.com/privacy">
                        Microsoft
                      </Ext>
                      , or <Ext href="https://slack.com">Slack</Ext> to revoke
                      Togethr AI's access directly.
                    </li>
                    <li>
                      <strong>Delete submitted feedback</strong> — email us and
                      we will remove your records from Supabase.
                    </li>
                  </ul>
                </Section>

                <Section id="children" title="Children">
                  <p>
                    Togethr AI is not intended for children under 13. We do not
                    knowingly collect data from children.
                  </p>
                </Section>

                <Section id="changes" title="Changes to this policy">
                  <p>
                    If this policy changes materially, we will update the date
                    above and notify you in-app on next launch.
                  </p>
                </Section>

                <Section id="contact" title="Contact">
                  <p>
                    Questions, concerns, or data requests:{' '}
                    <a
                      href="mailto:togethr.se@hotmail.com"
                      className="text-blue-600 font-medium hover:underline decoration-blue-300 underline-offset-4"
                    >
                      togethr.se@hotmail.com
                    </a>
                  </p>
                </Section>
              </div>
            </article>

            <div className="mt-10 text-center text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Togethr AI · Operated from
              Sweden
            </div>
          </motion.div>
        </div>
      </main>

      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 12, pointerEvents: showTop ? 'auto' : 'none' }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 right-6 z-40 grid place-items-center w-11 h-11 rounded-full bg-slate-900 text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)] hover:bg-blue-600 transition-colors"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

function Section({
  id,
  title,
  children,
  first,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-24 ${first ? 'pb-8' : 'py-8'}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px flex-1 max-w-[28px] bg-gradient-to-r from-blue-500 to-blue-300" />
        <h2 className="font-display italic text-2xl sm:text-[28px] text-blue-600 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="text-slate-700 leading-[1.75] space-y-3">{children}</div>
    </motion.section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-semibold text-slate-900 mt-6 mb-2 tracking-tight">
      {children}
    </h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1.5 text-slate-700 marker:text-blue-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 font-medium hover:underline decoration-blue-300 underline-offset-4"
    >
      {children}
    </a>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl overflow-hidden my-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-50/60 to-white" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-400" />
      <div className="relative px-5 py-4 text-slate-700">{children}</div>
    </div>
  );
}
