export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  TOP_COMMANDS: '/api/top-commands',
  POW_CHALLENGE: '/api/pow/challenge',
} as const;

export const EXTERNAL_LINKS = {
  INVITE: 'https://discordapp.com/oauth2/authorize?client_id=1203514684326805524&scope=bot+applications.commands&permissions=8',
  DISCORD: 'https://discord.gg/evict',
  DOCS: 'https://docs.evict.bot',
} as const;

export const ANIMATION_DURATIONS = {
  STATS_COUNTER: 1800,
  MODAL_TRANSITION: 200,
  FADE_IN: 300,
} as const;

export const CACHE_CONFIG = {
  NO_STORE: 'no-store',
  NO_CACHE: 'no-cache',
} as const;

export const DISCORD_COLORS = {
  EMBED_BG: '#2b2d31',
  PRIMARY: '#5865f2',
  SECONDARY: '#4e5058',
  SUCCESS: '#3ba55c',
  DANGER: '#ed4245',
} as const;

export const APP_INFO = {
  NAME: 'evict',
  DESCRIPTION: 'Advanced Discord bot with comprehensive moderation, robust antinuke protection, and versatile utility tools.',
  LOGO: '/evict/evict.webp',
} as const;
