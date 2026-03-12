'use client'

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useStatsAnimation } from '@/hooks/useStatsAnimation';
import { API_ENDPOINTS } from '@/lib/constants';
import { Footer } from '@/components/footer';
import {
  HeroStats,
  HeroLogo,
  HeroDescription,
  HeroLinks,
  FeaturesGrid,
  SectionDivider,
  CTASection,
} from '@/components/home';

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
            <HeroLogo />
            <HeroStats guilds={animatedStats.guilds} users={animatedStats.users} />
            <HeroDescription />
            <HeroLinks />
          </div>
        </div>
      </main>
      
      <section className="relative z-[1] w-full px-4 pt-16 pb-20 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.015)_1px,transparent_0)] before:bg-[size:24px_24px] before:opacity-40 before:pointer-events-none">
        <div className="mx-auto flex max-w-4xl flex-col items-center relative z-10">
          <div className="opacity-0 animate-fade-in-up w-full max-w-3xl mb-16 [animation-delay:0.1s]">
            <SectionDivider gradientId="lineGradient" />
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
            
            <FeaturesGrid />
          </div>

          <div className="opacity-0 animate-fade-in-up w-full max-w-3xl mt-16 [animation-delay:0.3s]">
            <SectionDivider gradientId="lineGradient2" />
          </div>

          <CTASection />
        </div>
      </section>
      <Footer />
    </>
  );
}