'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PreloaderProps {
  show?: boolean;
  controlled?: boolean;
}

export function Preloader({ show, controlled = false }: PreloaderProps = {}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const [isLoading, setIsLoading] = useState(!isLandingPage);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (controlled) {
      setIsLoading(show ?? false);
      setFadeOut(false);
      return;
    }

    if (isLandingPage) {
      setIsLoading(false);
      return;
    }

    // Only show on initial mount, not on route changes
    if (hasShown) {
      return;
    }

    setHasShown(true);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isLandingPage, controlled, show, hasShown]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src="https://r2.evict.bot/evict.jpeg"
            alt="Loading"
            fill
            className="rounded-2xl object-cover"
            priority
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce-dot [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce-dot [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce-dot [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
