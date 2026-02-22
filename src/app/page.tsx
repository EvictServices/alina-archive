'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { useStatsAnimation } from "@/hooks/useStatsAnimation";
import { API_ENDPOINTS, EXTERNAL_LINKS, APP_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface HealthData {
  guilds: number;
  users: number;
}

export default function Home() {
  const [stats, setStats] = useState({ guilds: 0, users: 0 });

  useFetch<HealthData>(API_ENDPOINTS.HEALTH, {
    onSuccess: (data) => {
      setStats({ guilds: data.guilds || 0, users: data.users || 0 });
    },
    cacheControl: 'no-store',
  });

  const animatedStats = useStatsAnimation(stats);

  return (
    <>
      <main className="relative min-h-screen flex items-center justify-center px-4 py-12 z-[1]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10">
          
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

          <div className="opacity-0 animate-fade-in-up space-y-4 [animation-delay:0.2s]">
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-white">
              <span className="shimmer-text">{APP_INFO.NAME}</span>
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex flex-col items-center min-w-[120px]">
                <span className="text-2xl md:text-3xl font-semibold text-white">
                  {animatedStats.guilds.toLocaleString()}
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
                  {animatedStats.users.toLocaleString()}
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

          <p className="opacity-0 animate-fade-in-up text-base md:text-lg text-white/70 max-w-lg leading-relaxed px-4 [animation-delay:0.3s]">
            {APP_INFO.DESCRIPTION.split(/\b(moderation|antinuke|utility)\b/).map((part, i) => 
              ['moderation', 'antinuke', 'utility'].includes(part.toLowerCase()) 
                ? <span key={i} className="text-white/90">{part}</span> 
                : part
            )}
          </p>

          <div className="opacity-0 animate-fade-in-up w-full max-w-md space-y-3 px-4 [animation-delay:0.4s]">
            <div className="grid grid-cols-3 gap-2">
              <Link href="/commands" className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                <span className="whitespace-nowrap">Commands</span>
              </Link>
              <Link href="/status" className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                <span className="whitespace-nowrap">Status</span>
              </Link>
              <Link href="/embed" className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                <span className="whitespace-nowrap">Embeds</span>
              </Link>
            </div>

            <Separator className="bg-white/10" />

            <div className="grid grid-cols-3 gap-2">
              <a
                href={EXTERNAL_LINKS.INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <span className="whitespace-nowrap">Invite</span>
              </a>
              <a
                href={EXTERNAL_LINKS.DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <span className="whitespace-nowrap">Discord</span>
              </a>
              <a
                href={EXTERNAL_LINKS.DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <span className="whitespace-nowrap">Docs</span>
              </a>
            </div>
          </div>

          </div>
        </div>
      </main>
      <section className="relative z-[1] w-full bg-[#091622] px-4 pt-28 pb-20 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.015)_1px,transparent_0)] before:bg-[size:24px_24px] before:opacity-40 before:pointer-events-none">
        <div className="mx-auto flex max-w-4xl flex-col items-center relative z-10">
          <div className="opacity-0 animate-fade-in-up w-full max-w-3xl mb-16 [animation-delay:0.1s]">
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 800 80"
                aria-hidden="true"
                className="h-10 w-full max-w-2xl"
              >
                <path
                  d="M20 40 C 200 10, 300 70, 400 40 S 600 10, 780 40"
                  className="stroke-white/25"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up w-full [animation-delay:0.2s]">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                Hop into the future of Discord
              </h2>
              <p className="mt-6 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
                We won't annoy you with the specifics. Just a powerful, polished, and visually refined bot that helps you manage your server and community with ease.
                See a curated list of features below, or add the bot to your server and explore them yourself.
              </p>
            </div>
            
            <div className="mt-12 w-full max-w-2xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-8 py-6 text-center">
                <p className="text-sm md:text-base text-white/60 font-light">
                  We're still polishing this section. Check back soon for a full breakdown.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}