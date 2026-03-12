import { Command as CommandIcon } from 'lucide-react';

interface StatsCardsProps {
  totalCommands: number;
  totalCategories: number;
  error: boolean;
}

export function StatsCards({ totalCommands, totalCategories, error }: StatsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          {error ? (
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          ) : (
            <CommandIcon size={20} className="text-white" />
          )}
          <h2 className="text-lg font-light text-white">
            {error ? 'Unavailable' : totalCommands}
          </h2>
        </div>
        <p className="text-white/60 text-xs">
          {error ? 'Service Error' : 'Total Commands'}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <h2 className="text-lg font-light text-white">
            {totalCategories}
          </h2>
        </div>
        <p className="text-white/60 text-xs">
          Categories
        </p>
      </div>
    </div>
  );
}
