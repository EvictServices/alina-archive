'use client'

import { useEffect, useState } from "react"
import type { HealthData } from "@/types/status"
import { solvePow } from "@/lib/pow"
import type { PowChallenge } from "@/lib/pow"

interface TopCommand {
  command_name: string
  invoke_count: number
}

export default function StatusPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openCluster, setOpenCluster] = useState<number | null>(null)
  const [topCommands, setTopCommands] = useState<TopCommand[]>([])
  const [commandsLoading, setCommandsLoading] = useState(true)

  const toggleCluster = (index: number) => {
    setOpenCluster(openCluster === index ? null : index)
  }

  const fetchHealth = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://elara.evict.bot/health')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setHealthData(data)
      setError(false)
    } catch (err) {
      console.error('Failed to fetch health data:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchTopCommands = async () => {
    try {
      setCommandsLoading(true)
      
      const challengeRes = await fetch('/api/pow/challenge')
      if (!challengeRes.ok) throw new Error('Failed to get challenge')
      const challengeData = await challengeRes.json()
      
      if (!challengeData.success) throw new Error('Invalid challenge response')
      
      const result = await solvePow(challengeData.challenge as PowChallenge)
      
      if (!result.s || !result.sol) {
        throw new Error('Failed to solve POW')
      }
      
      const res = await fetch('/api/top-commands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solution: result.sol }),
      })
      
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      
      if (data.success) {
        setTopCommands(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch top commands:', err)
    } finally {
      setCommandsLoading(false)
    }
  }

  useEffect(() => {
    fetchHealth()
    fetchTopCommands()
    const interval = setInterval(() => {
      fetchHealth()
      fetchTopCommands()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatLatency = (latency: number) => {
    return `${(latency * 1000).toFixed(0)}ms`
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-light text-[#ccccff]">
            <span className="shimmer-text">System Status</span>
          </h1>
          <button
            onClick={fetchHealth}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'animate-spin' : ''}>
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Refresh
          </button>
        </div>

        <div className="mb-6 bg-black border border-[#ccccff]/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-yellow-500' : error ? 'bg-red-500' : allClustersOperational ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
            <h2 className="text-lg font-light text-[#ccccff]">
              {loading ? 'Checking Status...' : error ? 'Service Unavailable' : allClustersOperational ? 'All Systems Operational' : 'Partial Outage'}
            </h2>
          </div>
          <p className="text-[#ccccff]/60 text-xs">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {healthData && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-black border border-[#ccccff]/20 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#ccccff]/70 text-xs font-medium">Status</h3>
              </div>
              <p className="text-lg font-light text-[#ccccff]">
                {allClustersOperational ? 'Operational' : 'Degraded'}
              </p>
            </div>

            <div className="bg-black border border-[#ccccff]/20 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#ccccff]/70 text-xs font-medium">Clusters</h3>
              </div>
              <p className="text-lg font-light text-[#ccccff]">
                {Object.keys(healthData.clusters).length}
              </p>
            </div>

            <div className="bg-black border border-[#ccccff]/20 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#ccccff]/70 text-xs font-medium">Total Users</h3>
              </div>
              <p className="text-lg font-light text-[#ccccff]">
                {healthData.users.toLocaleString()}
              </p>
            </div>

            <div className="bg-black border border-[#ccccff]/20 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#ccccff]/70 text-xs font-medium">Latency</h3>
              </div>
              <p className="text-lg font-light text-[#ccccff]">
                {formatLatency(getAverageLatency())}
              </p>
            </div>
          </div>
        )}

        {healthData && (
          <div className="space-y-3">            
            {Object.entries(healthData.clusters).map(([clusterId, cluster], index) => {
              const isOpen = openCluster === index
              const totalServers = cluster.guilds
              
              return (
                <div 
                  key={clusterId}
                  className="bg-black border border-[#ccccff]/20 rounded-2xl backdrop-blur-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleCluster(index)}
                    className="w-full p-4 flex items-center justify-between hover:border-[#ccccff]/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#ccccff]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                          <line x1="6" y1="6" x2="6.01" y2="6"/>
                          <line x1="6" y1="18" x2="6.01" y2="18"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[#ccccff] font-medium text-base">Cluster {index}</div>
                        <div className="text-[#ccccff]/60 text-sm">
                          {cluster.shards.length} shards • {totalServers.toLocaleString()} servers
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden sm:block">
                        <div className="text-[#ccccff]/60 text-xs mb-1">Users</div>
                        <div className="text-[#ccccff] text-sm">{cluster.users.toLocaleString()}</div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-[#ccccff]/60 text-xs mb-1">Latency</div>
                        <div className="text-[#ccccff] text-sm">
                          {formatLatency(cluster.shards.reduce((sum, s) => sum + s.latency, 0) / cluster.shards.length)}
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
                        className={`text-[#ccccff] transition-transform ${isOpen ? 'rotate-90' : ''}`}
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {cluster.shards.map(shard => (
                          <div 
                            key={shard.id}
                            className="bg-[#ccccff]/10 border border-[#ccccff]/20 rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#ccccff]/80 text-sm">Shard {shard.id}</span>
                              <span className="text-[#ccccff] text-xs font-medium">
                                {formatLatency(shard.latency)}
                              </span>
                            </div>
                            <div className="space-y-1 text-xs text-[#ccccff]/60">
                              <div className="flex justify-between">
                                <span>Users:</span>
                                <span className="text-[#ccccff]/80">{shard.users.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Guilds:</span>
                                <span className="text-[#ccccff]/80">{shard.guilds}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {topCommands.length > 0 && (
          <div className="mt-6 bg-black border border-[#ccccff]/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <h2 className="text-lg font-light text-[#ccccff]">
                  Top Commands (24h)
                </h2>
              </div>
              <span className="text-[#ccccff]/60 text-xs">
                {topCommands.reduce((sum, cmd) => sum + Number(cmd.invoke_count), 0).toLocaleString()} total invokes
              </span>
            </div>
            
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-hide">
              {topCommands.map((cmd, index) => (
                <div 
                  key={cmd.command_name}
                  className="bg-[#ccccff]/10 border border-[#ccccff]/20 rounded-xl p-3 hover:border-[#ccccff]/40 transition-colors flex-shrink-0 w-48 sm:w-auto"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#ccccff]/20 flex items-center justify-center text-[#ccccff] text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-[#ccccff] text-sm font-medium truncate">
                        {cmd.command_name}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#ccccff]/80 text-lg font-light">
                    {Number(cmd.invoke_count).toLocaleString()}
                    <span className="text-[#ccccff]/60 text-xs ml-1">uses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-red-400">
              Unable to fetch status information. Please try again later.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
