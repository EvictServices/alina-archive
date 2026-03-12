import type { HealthData } from "@/types/status"
import { ShardsList } from './ShardsList'

type Cluster = HealthData['clusters'][string]

interface ClusterCardProps {
  clusterId: string
  cluster: Cluster
  index: number
  isOpen: boolean
  onToggle: () => void
  formatLatency: (latency: number) => string
}

export function ClusterCard({ 
  cluster, 
  index, 
  isOpen, 
  onToggle, 
  formatLatency 
}: ClusterCardProps) {
  const totalServers = cluster.guilds
  const avgLatency = cluster.shards.reduce((sum, s) => sum + s.latency, 0) / cluster.shards.length

  return (
    <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl backdrop-blur-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:border-[#5f828d]/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/>
              <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
          </div>
          <div className="text-left">
            <div className="text-white font-medium text-base">Cluster {index}</div>
            <div className="text-white/60 text-sm">
              {cluster.shards.length} shards • {totalServers.toLocaleString()} servers
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
            <div className="text-white/60 text-xs mb-1">Users</div>
            <div className="text-white text-sm">{cluster.users.toLocaleString()}</div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-white/60 text-xs mb-1">Latency</div>
            <div className="text-white text-sm">
              {formatLatency(avgLatency)}
            </div>
          </div>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`text-white transition-transform ${isOpen ? 'rotate-90' : ''}`}
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </button>

      <div 
        className={`border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <ShardsList shards={cluster.shards} formatLatency={formatLatency} />
        </div>
      </div>
    </div>
  )
}
