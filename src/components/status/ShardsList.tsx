import type { HealthData } from "@/types/status"

type Shard = HealthData['clusters'][string]['shards'][number]

interface ShardsListProps {
  shards: Shard[]
  formatLatency: (latency: number) => string
}

export function ShardsList({ shards, formatLatency }: ShardsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {shards.map(shard => (
        <div 
          key={shard.id}
          className="bg-[#5f828d]/10 border border-[#5f828d]/20 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Shard {shard.id}</span>
            <span className="text-white text-xs font-medium">
              {formatLatency(shard.latency)}
            </span>
          </div>
          <div className="space-y-1 text-xs text-white/60">
            <div className="flex justify-between">
              <span>Users:</span>
              <span className="text-white/80">{shard.users.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Guilds:</span>
              <span className="text-white/80">{shard.guilds}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
