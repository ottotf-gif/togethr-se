import { Mail, Sparkles, Star, LayoutGrid, MessageSquare, Settings as SettingsIcon } from 'lucide-react';

export default function PhoneFrame() {
  return (
    <div className="relative w-[300px] sm:w-[330px] aspect-[300/610] mx-auto">
      <div className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-br from-pink-300/40 via-blue-300/30 to-blue-500/20 blur-3xl" />
      <div className="relative w-full h-full rounded-[3rem] bg-slate-900 p-2 shadow-[0_50px_100px_-25px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-black z-20" />
        <div className="relative w-full h-full rounded-[2.6rem] bg-[#f1f3f8] overflow-hidden">
          <div className="px-5 pt-12 pb-3 flex items-center justify-between text-[10px] font-medium text-slate-700">
            <span>14:43</span>
            <span className="opacity-0">.</span>
            <span>4G</span>
          </div>

          <div className="px-5 flex items-center justify-between">
            <div className="font-display text-[22px] font-semibold tracking-tight text-slate-900 leading-tight">
              Good afternoon,<br />Otto
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 grid place-items-center text-white font-medium text-sm">
              O
            </div>
          </div>

          <div className="mx-4 mt-4 rounded-2xl p-4 text-white relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-blue-100 opacity-90">Today</div>
                <div className="font-semibold text-[15px] mt-0.5">Sunday, 1 Mar</div>
              </div>
              <Sparkles className="w-4 h-4 text-blue-100" />
            </div>
            <p className="mt-2 text-[11px] leading-snug text-blue-50/95">
              Good morning, Otto. Today you have a meeting at 09:00 and a presentation at 15:00.
              Prioritize taking your dog out. Two urgent emails. Have a productive day.
            </p>
            <div className="mt-2 text-[9px] text-blue-100/80">Generated 54 seconds ago</div>
          </div>

          <div className="mx-4 mt-3 rounded-2xl bg-white p-3 flex items-center justify-between shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-slate-500">Leads</div>
              <div className="font-semibold text-[14px] text-slate-900 mt-0.5">1 New Lead!</div>
              <div className="text-[10px] text-slate-500">1 Active</div>
            </div>
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
              <div className="absolute inset-0 grid place-items-center text-[10px] font-semibold text-slate-700">
                0%
              </div>
            </div>
          </div>

          <div className="mx-4 mt-3 rounded-2xl bg-white p-3 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <div className="font-semibold text-slate-900 text-[13px]">Mail</div>
              </div>
              <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">3 unread</div>
            </div>
            <div className="mt-2 rounded-xl bg-blue-50/60 p-2.5">
              <div className="flex items-center gap-1 text-[9px] text-blue-700 font-medium">
                <Sparkles className="w-2.5 h-2.5" /> Important to review
              </div>
              <div className="mt-1.5 space-y-1.5">
                <MailRow title="Proposal for Potential Bu…" from="otto@…" time="14:37" />
                <MailRow title="Inquiry About Building a…" from="otto@…" time="14:36" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 rounded-full bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] border border-slate-100">
            <TabBtn active icon={<LayoutGrid className="w-4 h-4" />} label="Dashboard" />
            <TabBtn icon={<MessageSquare className="w-4 h-4" />} label="Chat" />
            <TabBtn icon={<SettingsIcon className="w-4 h-4" />} label="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MailRow({ title, from, time }: { title: string; from: string; time: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-slate-900 truncate">{title}</div>
        <div className="text-[9px] text-slate-500 truncate">{from}</div>
      </div>
      <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
      <div className="text-[9px] text-slate-500 tabular-nums">{time}</div>
    </div>
  );
}

function TabBtn({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium ${
        active ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
