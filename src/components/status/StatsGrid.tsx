import type { HealthData } from "@/types/status"

interface StatsGridProps {
  healthData: HealthData
  formatLatency: (latency: number) => string
  getAverageLatency: () => number
}

export function StatsGrid({ healthData, formatLatency, getAverageLatency }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white/70 text-xs font-medium">Total Guilds</h3>
        </div>
        <p className="text-lg font-light text-white">
          {healthData.guilds.toLocaleString()}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white/70 text-xs font-medium">Total Users</h3>
        </div>
        <p className="text-lg font-light text-white">
          {healthData.users.toLocaleString()}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white/70 text-xs font-medium">Total Clusters</h3>
        </div>
        <p className="text-lg font-light text-white">
          {Object.keys(healthData.clusters).length}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white/70 text-xs font-medium">Average Latency</h3>
        </div>
        <p className="text-lg font-light text-white">
          {formatLatency(getAverageLatency())}
        </p>
      </div>
    </div>
  )
}
