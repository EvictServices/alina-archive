import type { HealthData } from "@/types/status"
import { ClusterCard } from './ClusterCard'

interface ClusterListProps {
  healthData: HealthData
  openCluster: number | null
  onToggleCluster: (index: number) => void
  formatLatency: (latency: number) => string
}

export function ClusterList({ 
  healthData, 
  openCluster, 
  onToggleCluster, 
  formatLatency 
}: ClusterListProps) {
  return (
    <div className="space-y-3">
      {Object.entries(healthData.clusters).map(([clusterId, cluster], index) => (
        <ClusterCard
          key={clusterId}
          clusterId={clusterId}
          cluster={cluster}
          index={index}
          isOpen={openCluster === index}
          onToggle={() => onToggleCluster(index)}
          formatLatency={formatLatency}
        />
      ))}
    </div>
  )
}
