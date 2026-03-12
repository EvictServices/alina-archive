import type { Update } from '@/types/updates'

interface UpdateListItemProps {
  update: Update
  isActive: boolean
  onClick: () => void
}

export function UpdateListItem({ update, isActive, onClick }: UpdateListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg mb-2 transition-colors ${
        isActive
          ? 'bg-[#5f828d]/20 border border-[#5f828d]/40 text-white'
          : 'hover:bg-[#5f828d]/5 text-white/70 hover:text-white border border-transparent'
      }`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5f828d]/10 flex-shrink-0 mt-0.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-white' : 'text-white/60'}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="text-sm font-medium text-white line-clamp-1 flex-1">
            {update.metadata.title}
          </div>
          {update.metadata.version && (
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${
              isActive 
                ? 'bg-[#5f828d]/20 text-[#5f828d]' 
                : 'bg-[#5f828d]/10 text-[#5f828d]/70'
            }`}>
              {update.metadata.version}
            </span>
          )}
        </div>
        <div className={`text-xs mb-1 line-clamp-2 ${isActive ? 'text-white/70' : 'text-white/50'}`}>
          {update.metadata.description}
        </div>
        <time className={`text-xs ${isActive ? 'text-white/60' : 'text-white/40'}`}>
          {new Date(update.metadata.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </div>
    </button>
  )
}
