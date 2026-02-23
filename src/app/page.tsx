'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { useStatsAnimation } from "@/hooks/useStatsAnimation";
import { API_ENDPOINTS, EXTERNAL_LINKS, APP_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/navbar";

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
      <MainNav />
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
      <section className="relative z-[1] w-full px-4 pt-28 pb-20 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.015)_1px,transparent_0)] before:bg-[size:24px_24px] before:opacity-40 before:pointer-events-none">
        <div className="mx-auto flex max-w-4xl flex-col items-center relative z-10">
          <div className="opacity-0 animate-fade-in-up w-full max-w-3xl mb-16 [animation-delay:0.1s]">
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 800 80"
                aria-hidden="true"
                className="h-10 w-full max-w-2xl"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#c8e5f0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b8dfe8" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 40 C 200 10, 300 70, 400 40 S 600 10, 780 40"
                  stroke="url(#lineGradient)"
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
            
            <div className="mt-12 w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 md:row-span-2 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-8 py-10 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Advanced Moderation</h3>
                  </div>
                  <p className="text-base text-white/60 leading-relaxed">
                    Comprehensive moderation tools to keep your server safe and organized with automated actions and custom filters.
                  </p>
                </div>

                <div className="md:col-span-1 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-6 py-6 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M3 3v18h18"/>
                        <path d="M18 17V9"/>
                        <path d="M13 17V5"/>
                        <path d="M8 17v-3"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Server Analytics</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Track member activity and engagement.
                  </p>
                </div>

                <div className="md:col-span-1 md:row-span-2 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-6 py-8 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Welcome System</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Greet new members with customizable welcome messages and automated onboarding.
                  </p>
                </div>

                <div className="md:col-span-1 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-6 py-6 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="m7 11 2-2-2-2"/>
                        <path d="M11 13h4"/>
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Custom Commands</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Create personalized commands with variables.
                  </p>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-6 py-6 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Anti-Nuke Protection</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Protect your server from malicious attacks with intelligent security measures and instant threat detection.
                  </p>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-[#5f828d]/20 bg-white/[0.02] backdrop-blur-md px-6 py-6 hover:border-white transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5f828d]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="8" r="5"/>
                        <path d="M20 21a8 8 0 0 0-16 0"/>
                        <path d="M12 13v8"/>
                        <path d="M8 17l4 4 4-4"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Automated Roles</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Streamline role management with reaction roles, auto-roles, and role hierarchies for seamless organization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up w-full max-w-3xl mt-16 [animation-delay:0.3s]">
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 800 80"
                aria-hidden="true"
                className="h-10 w-full max-w-2xl"
              >
                <defs>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#c8e5f0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b8dfe8" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 40 C 200 10, 300 70, 400 40 S 600 10, 780 40"
                  stroke="url(#lineGradient2)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up w-full max-w-2xl mt-16 mb-12 [animation-delay:0.4s]">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                Get Started
              </h2>
              <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto">
                Ready to transform your Discord server? Join thousands of communities using Evict.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={EXTERNAL_LINKS.INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#5f828d] hover:bg-[#5f828d]/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5f828d]/20 w-full sm:w-auto"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  Add to Server
                </a>
                <a
                  href={EXTERNAL_LINKS.DISCORD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/20 hover:border-white/30 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.75.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.2 1.07 1.75.03.02.06.03.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" fill="currentColor"/>
                  </svg>
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}