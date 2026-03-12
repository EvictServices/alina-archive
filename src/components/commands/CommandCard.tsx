import type { Command } from '@/types/commands';
import { MdOutlineFileCopy } from 'react-icons/md';
import { getCommandDisplayName } from '@/lib/commands';

interface CommandCardProps {
  command: Command;
  onSelect: (command: Command) => void;
  onCopy: (text: string) => void;
  isCopied: boolean;
}

export function CommandCard({ command, onSelect, onCopy, isCopied }: CommandCardProps) {
  const displayName = getCommandDisplayName(command);

  return (
    <div 
      onClick={() => onSelect(command)}
      className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 hover:border-[#5f828d]/40 transition-colors backdrop-blur-md cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium bg-[#5f828d]/10 px-3 py-1 rounded-full">
          {displayName}
        </h3>
        <div className="flex items-center gap-2 text-white">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy(displayName);
              }}
              className="p-1 hover:bg-[#5f828d]/20 rounded transition-colors"
              title="Copy command"
            >
              <MdOutlineFileCopy />
            </button>
            {isCopied && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#5f828d] text-black text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm mb-3 line-clamp-2">
        {command.description}
      </p>
    </div>
  );
}
