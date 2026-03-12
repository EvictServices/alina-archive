import type { Command } from '@/types/commands';
import { getCommandDisplayName } from '@/lib/commands';

interface CommandModalProps {
  command: Command | null;
  onClose: () => void;
}

export function CommandModal({ command, onClose }: CommandModalProps) {
  if (!command) return null;

  const displayName = getCommandDisplayName(command);

  return (
    <div className="fixed inset-0 z-50 p-4" onClick={onClose}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
      />

      <div className="relative z-10 flex min-h-full items-center justify-center">
        <div 
          className="bg-white/[0.02] border border-[#5f828d]/30 rounded-xl max-w-md w-full p-6 shadow-2xl backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#5f828d] rounded-full" />
              <h2 className="text-white font-semibold">Command Information</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-xs uppercase mb-1">Command</p>
              <p className="text-white font-medium">{displayName}</p>
            </div>

            {command.aliases && command.aliases.length > 0 && (
              <div>
                <p className="text-white/60 text-xs uppercase mb-1">Aliases</p>
                <p className="text-white">{command.aliases.join(', ')}</p>
              </div>
            )}

            <div>
              <p className="text-white/60 text-xs uppercase mb-2">Permissions Required</p>
              {command.permissions && command.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {command.permissions.map((perm, idx) => (
                    <span
                      key={`${perm}-${idx}`}
                      className="bg-[#5f828d]/20 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-white/80 text-sm">None</p>
              )}
            </div>

            <div>
              <p className="text-white/60 text-xs uppercase mb-1">Description</p>
              <p className="text-white/80 text-sm">{command.description}</p>
            </div>

            {command.signature && (
              <div>
                <p className="text-white/60 text-xs uppercase mb-1">Syntax</p>
                <code className="text-white/80 bg-[#5f828d]/10 px-3 py-2 rounded block text-sm">
                  {displayName} {command.signature}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
