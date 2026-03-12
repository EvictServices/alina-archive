import { useEffect, useState } from 'react';
import type { CommandsData, RawCommand } from '@/types/commands';
import { processCommands } from '@/lib/commands';

interface UseCommandsReturn {
  commands: CommandsData;
  loading: boolean;
  error: boolean;
}

export function useCommands(): UseCommandsReturn {
  const [commands, setCommands] = useState<CommandsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const processData = (data: any): CommandsData => {
      const rawCommands = data?.data?.commands || data?.commands || data;
      const processedData: CommandsData = {};
      
      for (const [category, cmds] of Object.entries(rawCommands)) {
        processedData[category] = processCommands(cmds as RawCommand[]);
      }
      
      return processedData;
    };

    fetch('/api/commands')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setCommands(processData(data));
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        fetch('/commands.json')
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch backup');
            return res.json();
          })
          .then(data => {
            setCommands(processData(data));
            setError(false);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
  }, []);

  return { commands, loading, error };
}
