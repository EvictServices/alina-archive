import type { Update } from '@/types/updates'

interface MobileControlsProps {
  updates: Update[]
  searchQuery: string
  selectedSlug: string | null
  onSearchChange: (value: string) => void
  onUpdateClick: (slug: string) => void
}

export function MobileControls({ 
  updates, 
  searchQuery, 
  selectedSlug, 
  onSearchChange, 
  onUpdateClick 
}: MobileControlsProps) {
  return (
    <div className="lg:hidden max-w-2xl mx-auto space-y-3 mb-6">
      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4">
        <label className="block text-xs font-medium text-white/60 mb-2">Select Update</label>
        <select
          value={selectedSlug || ''}
          onChange={(e) => onUpdateClick(e.target.value)}
          className="w-full bg-white/[0.02] border border-[#5f828d]/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5f828d]/40 transition-colors appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem'
          }}
        >
          {updates.map((update) => (
            <option key={update.slug} value={update.slug} className="bg-[#1a1625] text-white">
              {update.metadata.title} {update.metadata.version ? `(${update.metadata.version})` : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4">
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
    </div>
  )
}
