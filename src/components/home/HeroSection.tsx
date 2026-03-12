import Image from 'next/image';
import { APP_INFO } from '@/lib/shared';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface HeroStatsProps {
  guilds: number;
  users: number;
}

export function HeroStats({ guilds, users }: HeroStatsProps) {
  return (
    <div className="opacity-0 animate-fade-in-up space-y-4 [animation-delay:0.2s]">
      <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-white">
        <span className="shimmer-text">{APP_INFO.NAME}</span>
      </h1>
      
      <div className="flex items-center justify-center gap-6 text-sm md:text-base">
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-semibold text-white">
            {guilds.toLocaleString()}
          </span>
          <Badge
            variant="outline"
            className="mt-2 border-white/20 text-white/70 uppercase tracking-wider text-[10px]"
          >
            Servers
          </Badge>
        </div>
        <Separator orientation="vertical" className="h-12 bg-white/15" />
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-2xl md:text-3xl font-semibold text-white">
            {users.toLocaleString()}
          </span>
          <Badge
            variant="outline"
            className="mt-2 border-white/20 text-white/70 uppercase tracking-wider text-[10px]"
          >
            Users
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function HeroLogo() {
  return (
    <div className="opacity-0 animate-fade-in-up [animation-delay:0.1s]">
      <Image
        src={APP_INFO.LOGO}
        alt={`${APP_INFO.NAME} logo`}
        width={160}
        height={160}
        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl"
        draggable={false}
        priority
      />
    </div>
  );
}

export function HeroDescription() {
  return (
    <p className="opacity-0 animate-fade-in-up text-base md:text-lg text-white/70 max-w-lg leading-relaxed px-4 [animation-delay:0.3s]">
      {APP_INFO.DESCRIPTION.split(/\b(moderation|antinuke|utility)\b/).map((part, i) => 
        ['moderation', 'antinuke', 'utility'].includes(part.toLowerCase()) 
          ? <span key={i} className="text-white/90 border-b-[3px] border-[#7ba3b4]/50">{part}</span> 
          : part
      )}
    </p>
  );
}
