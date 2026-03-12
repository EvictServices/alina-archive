import { useState, useEffect } from 'react';
import type { HealthData } from '@/types/status';
import { PowChallenge, solvePow } from '@/lib/pow';
import { API_ENDPOINTS } from '@/lib/constants';

const EXTERNAL_API_URL = 'https://elara.evict.bot';
const REFRESH_INTERVAL = 30000;

interface TopCommand {
  command_name: string;
  invoke_count: number;
}

interface UseStatusReturn {
  healthData: HealthData | null;
  loading: boolean;
  error: boolean;
  topCommands: TopCommand[];
  commandsLoading: boolean;
  refresh: () => void;
}

export function useStatus(): UseStatusReturn {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [topCommands, setTopCommands] = useState<TopCommand[]>([]);
  const [commandsLoading, setCommandsLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${EXTERNAL_API_URL}/health`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setHealthData(data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopCommands = async () => {
    try {
      setCommandsLoading(true);
      
      const challengeRes = await fetch(API_ENDPOINTS.POW_CHALLENGE);
      if (!challengeRes.ok) throw new Error('Failed to get challenge');
      const challengeData = await challengeRes.json();
      
      if (!challengeData.success) throw new Error('Invalid challenge response');
      
      const result = await solvePow(challengeData.challenge as PowChallenge);
      
      if (!result.s || !result.sol) {
        throw new Error('Failed to solve POW');
      }
      
      const res = await fetch(API_ENDPOINTS.TOP_COMMANDS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solution: result.sol }),
      });
      
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      if (data.success) {
        setTopCommands(data.data);
      }
    } catch (err) {
      // Silent fail for top commands
    } finally {
      setCommandsLoading(false);
    }
  };

  const refresh = () => {
    fetchHealth();
    fetchTopCommands();
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { healthData, loading, error, topCommands, commandsLoading, refresh };
}
