export interface Shard {
  id: number
  latency: number
  users: number
  guilds: number
  uptime: number
  seen: number
}

export interface Cluster {
  config: {
    shard: {
      start: number
      end: number
    }
  }
  last_heartbeat: number
  uptime: number
  alive: boolean
  users: number
  guilds: number
  shards: Shard[]
}

export interface HealthData {
  users: number
  guilds: number
  clusters: Record<string, Cluster>
}
