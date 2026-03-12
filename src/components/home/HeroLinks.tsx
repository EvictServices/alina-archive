import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { EXTERNAL_LINKS } from '@/lib/constants';

const INTERNAL_LINKS = [
  { href: '/commands', label: 'Commands' },
  { href: '/status', label: 'Status' },
  { href: '/embed', label: 'Embeds' },
];

const EXTERNAL_LINK_ITEMS = [
  { href: EXTERNAL_LINKS.INVITE, label: 'Invite' },
  { href: EXTERNAL_LINKS.DISCORD, label: 'Discord' },
  { href: EXTERNAL_LINKS.DOCS, label: 'Docs' },
];

const linkStyles = "flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white";

export function HeroLinks() {
  return (
    <div className="opacity-0 animate-fade-in-up w-full max-w-md space-y-3 px-4 [animation-delay:0.4s]">
      <div className="grid grid-cols-3 gap-2">
        {INTERNAL_LINKS.map(link => (
          <Link key={link.href} href={link.href} className={linkStyles}>
            <span className="whitespace-nowrap">{link.label}</span>
          </Link>
        ))}
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-3 gap-2">
        {EXTERNAL_LINK_ITEMS.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
          >
            <span className="whitespace-nowrap">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
