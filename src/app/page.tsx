'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MdKeyboardCommandKey } from "react-icons/md";
import { SiStatuspage } from "react-icons/si";
import { ImEmbed } from "react-icons/im";
import { SlEnvolope } from "react-icons/sl";
import { FaDiscord } from "react-icons/fa";
import { SiDocsdotrs } from "react-icons/si";

export default function Home() {
  const [stats, setStats] = useState({ guilds: 0, users: 0 });
  const [animatedStats, setAnimatedStats] = useState({ guilds: 0, users: 0 });

  useEffect(() => {
    fetch('https://elara.evict.bot/health')
      .then(res => res.json())
      .then(data => {
        setStats({ guilds: data.guilds, users: data.users });
      })
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  useEffect(() => {
    if (stats.users === 0 && stats.guilds === 0) return;

    const duration = 1800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      setAnimatedStats({
        users: Math.floor(stats.users * eased),
        guilds: Math.floor(stats.guilds * eased)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedStats({ users: stats.users, guilds: stats.guilds });
      }
    };
    
    requestAnimationFrame(animate);
  }, [stats]);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12" style={{ zIndex: 1 }}>
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-10">
          
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Image
              src="/evict/evict.webp"
              alt="evict logo"
              width={160}
              height={160}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl"
              draggable={false}
              priority
            />
          </div>

          <div className="opacity-0 animate-fade-in-up space-y-4" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-white">
              <span className="shimmer-text">evict</span>
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

          <p className="opacity-0 animate-fade-in-up text-base md:text-lg text-white/60 max-w-lg leading-relaxed px-4" style={{ animationDelay: "0.3s" }}>
            Advanced Discord bot with comprehensive <span className="text-white/90">moderation</span>, robust <span className="text-white/90">antinuke</span> protection, and versatile <span className="text-white/90">utility</span> tools.
          </p>

          <div className="opacity-0 animate-fade-in-up w-full max-w-md space-y-3 px-4" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-3 gap-2">
              <Link href="/commands" className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <MdKeyboardCommandKey size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Commands</span>
              </Link>
              <Link href="/status" className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <SiStatuspage size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Status</span>
              </Link>
              <Link href="/embed" className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1">
                <ImEmbed size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Embeds</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://discordapp.com/oauth2/authorize?client_id=1203514684326805524&scope=bot+applications.commands&permissions=8"
                target="_blank"
                rel="noopener noreferrer"
                className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <SlEnvolope size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Invite</span>
              </a>
              <a
                href="https://discord.gg/evict"
                target="_blank"
                rel="noopener noreferrer"
                className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <FaDiscord size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Discord</span>
              </a>
              <a
                href="https://docs.evict.bot"
                target="_blank"
                rel="noopener noreferrer"
                className="evict-button py-2 px-3 text-xs flex items-center justify-center gap-1"
              >
                <SiDocsdotrs size={14} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Docs</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
