import type { HealthData } from '@/types/status';

export function formatLatency(latency: number): string {
  return `${(latency * 1000).toFixed(0)}ms`;
}

export function getAverageLatency(healthData: HealthData | null): number {
  if (!healthData) return 0;
  const allShards = Object.values(healthData.clusters).flatMap(c => c.shards);
  const totalLatency = allShards.reduce((sum, shard) => sum + shard.latency, 0);
  return allShards.length > 0 ? totalLatency / allShards.length : 0;
}

export function allClustersOperational(healthData: HealthData | null): boolean {
  if (!healthData) return false;
  return Object.values(healthData.clusters).every(c => c.alive);
}

export function getTotalGuilds(healthData: HealthData | null): number {
  if (!healthData) return 0;
  return Object.values(healthData.clusters).reduce((sum, cluster) => sum + cluster.guilds, 0);
}

export function getTotalUsers(healthData: HealthData | null): number {
  if (!healthData) return 0;
  return Object.values(healthData.clusters).reduce((sum, cluster) => sum + cluster.users, 0);
}

export function getTotalShards(healthData: HealthData | null): number {
  if (!healthData) return 0;
  return Object.values(healthData.clusters).reduce((sum, cluster) => sum + cluster.shards.length, 0);
}

export function formatUptime(uptime: number): string {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
