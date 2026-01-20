import { useEffect, useState, useCallback } from "react";

interface Stats {
  guilds: number;
  users: number;
}

interface UseStatsAnimationOptions {
  duration?: number;
}

export const useStatsAnimation = (
  stats: Stats,
  options: UseStatsAnimationOptions = {}
) => {
  const { duration = 1800 } = options;
  const [animatedStats, setAnimatedStats] = useState<Stats>({ guilds: 0, users: 0 });

  const animate = useCallback(() => {
    if (stats.users === 0 && stats.guilds === 0) {
      setAnimatedStats({ guilds: 0, users: 0 });
      return;
    }

    const startTime = Date.now();
    let animationFrameId: number;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setAnimatedStats({
        users: Math.floor(stats.users * eased),
        guilds: Math.floor(stats.guilds * eased),
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setAnimatedStats({ users: stats.users, guilds: stats.guilds });
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [stats.users, stats.guilds, duration]);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  return animatedStats;
};
