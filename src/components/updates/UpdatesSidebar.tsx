import type { Update } from '@/types/updates'
import { UpdateListItem } from './UpdateListItem'

interface UpdatesSidebarProps {
  updates: Update[]
  searchQuery: string
  selectedSlug: string | null
  onSearchChange: (value: string) => void
  onUpdateClick: (slug: string) => void
}

export function UpdatesSidebar({ 
  updates, 
  searchQuery, 
  selectedSlug, 
  onSearchChange, 
  onUpdateClick 
}: UpdatesSidebarProps) {
  return (
    <aside className="hidden lg:flex w-80 lg:sticky lg:top-24 flex-col max-h-[calc(100vh-8rem)]">
      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 mb-4">
        <label className="block text-xs font-medium text-white/60 mb-2">Search Updates</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search updates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/[0.02] border border-[#5f828d]/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#5f828d]/40 transition-colors"
          />
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2">
          {updates.map((update) => (
            <UpdateListItem
              key={update.slug}
              update={update}
              isActive={selectedSlug === update.slug}
              onClick={() => onUpdateClick(update.slug)}
            />
          ))}

          {updates.length === 0 && (
            <div className="text-center py-8 text-white/50 text-sm">
              No updates found
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
