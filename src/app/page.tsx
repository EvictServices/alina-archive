'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { useStatsAnimation } from "@/hooks/useStatsAnimation";
import { API_ENDPOINTS, EXTERNAL_LINKS, APP_INFO } from "@/lib/constants";

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
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-semibold text-white">
                  {animatedStats.guilds.toLocaleString()}
                </span>
                <span className="text-white/50 uppercase tracking-wider text-xs">Servers</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-semibold text-white">
                  {animatedStats.users.toLocaleString()}
                </span>
                <span className="text-white/50 uppercase tracking-wider text-xs">Users</span>
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
              <Link href="/commands" className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <span className="whitespace-nowrap">Commands</span>
              </Link>
              <Link href="/status" className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <span className="whitespace-nowrap">Status</span>
              </Link>
              <Link href="/embed" className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <span className="whitespace-nowrap">Embeds</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <a
                href={EXTERNAL_LINKS.INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <span className="whitespace-nowrap">Invite</span>
              </a>
              <a
                href={EXTERNAL_LINKS.DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <span className="whitespace-nowrap">Discord</span>
              </a>
              <a
                href={EXTERNAL_LINKS.DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="alina-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <span className="whitespace-nowrap">Docs</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}