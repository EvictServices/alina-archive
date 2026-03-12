'use client'

import { useState } from "react"
import { useStatus } from "@/hooks/status"
import { formatLatency } from "@/lib/status"
import {
  StatusHeader,
  StatusBanner,
  ErrorBanner,
  StatsGrid,
  ClusterList,
  TopCommandsCard
} from "@/components/status"

export default function StatusPage() {
  const { healthData, loading, error, topCommands, refresh } = useStatus()
  const [openCluster, setOpenCluster] = useState<number | null>(null)

  const toggleCluster = (index: number) => {
    setOpenCluster(openCluster === index ? null : index)
  }

  const getAverageLatency = () => {
    if (!healthData) return 0
    const allShards = Object.values(healthData.clusters).flatMap(c => c.shards)
    const totalLatency = allShards.reduce((sum, shard) => sum + shard.latency, 0)
    return totalLatency / allShards.length
  }

  const allClustersOperational = healthData 
    ? Object.values(healthData.clusters).every(c => c.alive)
    : false

  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-20">
        <StatusHeader onRefresh={refresh} loading={loading} />
        
        <StatusBanner 
          loading={loading} 
          error={error} 
          allOperational={allClustersOperational} 
        />

        {error && <ErrorBanner />}

        {healthData && (
          <>
            <StatsGrid
              healthData={healthData}
              formatLatency={formatLatency}
              getAverageLatency={getAverageLatency}
            />

            <ClusterList
              healthData={healthData}
              openCluster={openCluster}
              onToggleCluster={toggleCluster}
              formatLatency={formatLatency}
            />
          </>
        )}

        <TopCommandsCard topCommands={topCommands} />
      </div>
    </main>
  )
}
