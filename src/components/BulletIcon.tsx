import {
  Bell, BellRing, Bot, Brain, CalendarCheck, Calculator, CircleHelp, CreditCard,
  Database, FileText, Filter, Globe, Inbox, MessageSquareText, Package, Plug,
  Sparkles, Zap, type LucideIcon,
} from "lucide-react";

const RULES: [RegExp, LucideIcon][] = [
  [/підключен/i, Plug],
  [/crm/i, Database],
  [/розрахун|калькул/i, Calculator],
  [/бронюв/i, CalendarCheck],
  [/кваліф/i, Filter],
  [/faq|часті запит/i, CircleHelp],
  [/зворотного/i, MessageSquareText],
  [/документ/i, FileText],
  [/підказк/i, Package],
  [/нагадув/i, BellRing],
  [/сповіщ/i, Bell],
  [/миттєв/i, Zap],
  [/оплат/i, CreditCard],
  [/платформ/i, Globe],
  [/ai-асистент|асистент/i, Bot],
  [/персоналіз/i, Sparkles],
  [/навчання моделі|базі знань/i, Brain],
  [/заявок|соцмереж/i, Inbox],
];
const FALLBACK = [Inbox, Zap, Sparkles];

export default function BulletIcon({ text, index }: { text: string; index: number }) {
  const Icon = RULES.find(([r]) => r.test(text))?.[1] ?? FALLBACK[index % FALLBACK.length];
  return (
    <span className="pbs-ic" aria-hidden="true">
      <Icon size={20} strokeWidth={1.8} />
    </span>
  );
}
