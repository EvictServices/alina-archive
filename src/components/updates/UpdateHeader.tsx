import type { Update } from '@/types/updates'

interface UpdateHeaderProps {
  update: Update
}

export function UpdateHeader({ update }: UpdateHeaderProps) {
  return (
    <header className="mb-6 lg:mb-8 pb-6 border-b border-white/10">
      <div className="flex flex-wrap items-center gap-3 mb-3 lg:mb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
          <span className="shimmer-text">{update.metadata.title}</span>
        </h1>
        {update.metadata.version && (
          <div className="px-2 sm:px-2.5 py-1 bg-[#5f828d]/10 border border-[#5f828d]/20 rounded-full">
            <span className="text-xs sm:text-sm font-medium text-[#5f828d]">
              {update.metadata.version}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-white/50">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <time dateTime={update.metadata.date}>
            {new Date(update.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          {update.metadata.author}
        </div>
      </div>
    </header>
  )
}
