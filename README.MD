# Evict

Modern, high-performance website for the Evict Discord bot — featuring real-time status monitoring, searchable command documentation, interactive embed builder, and WebGL-powered gradient backgrounds.

## Overview

**Evict** is an advanced Discord bot offering comprehensive moderation tools, robust antinuke protection, and versatile utility features. This repository contains the official website built with Next.js, providing users with full access to documentation, real-time bot statistics, and an interactive embed creation tool.

## Features

### Core Features
- **WebGL Gradient Background** — Hardware-accelerated animated gradient mesh with smooth color transitions
- **Live Status Dashboard** — Real-time cluster monitoring with shard health metrics and latency tracking
- **Command Browser** — Searchable, categorized documentation for 190+ bot commands
- **Embed Builder** — Interactive Discord embed creator with live preview, variable support, and webhook integration
- **POW Rate Limiting** — Client-side proof-of-work protection for API endpoints
- **MDX Documentation** — File-based docs with frontmatter support and automatic routing

### Technical Features
- **App Router** — Next.js 16 with React Server Components
- **TypeScript** — Full type safety across the entire codebase
- **Tailwind CSS** — Utility-first styling with custom animations
- **Framer Motion** — Smooth page transitions and micro-interactions
- **Redis Caching** — Optional caching layer for improved performance
- **PostgreSQL** — Command analytics and usage statistics

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.5 |
| **UI Library** | React 18.3.1 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 12.27 |
| **Database** | PostgreSQL |
| **Cache** | Redis (ioredis) |
| **Icons** | Lucide React, React Icons |
| **Runtime** | Bun |

## Project Structure

```
alina/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── health/         # Bot health status proxy
│   │   │   ├── status/         # Cluster status endpoint
│   │   │   ├── commands/       # Commands JSON endpoint
│   │   │   ├── pow/            # POW challenge generation
│   │   │   └── top-commands/   # Protected usage stats
│   │   ├── (legal)/            # Terms & Privacy pages
│   │   ├── commands/           # Command documentation UI
│   │   ├── embed/              # Embed builder tool
│   │   ├── status/             # Status dashboard
│   │   ├── updates/            # MDX-based update feed
│   │   ├── layout.tsx          # Root layout with gradient
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── embed/              # Embed builder components
│   │   ├── global/             # Layout components (nav, footer)
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── variable/           # Variable autocomplete
│   │   └── gradient.js         # WebGL shader implementation
│   ├── hooks/
│   │   ├── useFetch.ts         # Data fetching with caching
│   │   ├── useStatsAnimation.ts # Counter animations
│   │   ├── useOnClickOutside.ts
│   │   └── useVariableAutocomplete.ts
│   ├── lib/
│   │   ├── constants.ts        # App configuration
│   │   ├── commands.ts         # Command data processing
│   │   ├── embed-utils.ts      # Embed validation & export
│   │   ├── obfuscate.ts        # Content protection
│   │   ├── redis.ts            # Redis client
│   │   ├── updates.ts          # MDX update parsing
│   │   ├── pow/                # Proof-of-work system
│   │   └── utils.ts            # Helper functions
│   ├── types/
│   │   ├── commands.ts         # Command type definitions
│   │   ├── embeds.ts           # Embed interfaces
│   │   ├── status.ts           # Status response types
│   │   └── ui.ts               # UI component types
│   └── updates/                # MDX update posts
├── public/
│   ├── commands.json           # Static command data
│   └── evict/                  # Assets
├── ecosystem.config.js         # PM2 configuration
└── package.json
```

## Getting Started

### Prerequisites

- **Bun** 1.0+ (recommended) or Node.js 18+
- **PostgreSQL** (for command statistics)
- **Redis** (optional, for caching)
- **PM2** (for production deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/EvictServices/alina.git
cd alina

# Install dependencies
bun install
```

### Environment Setup

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/evict"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# API Configuration
NEXT_PUBLIC_API_URL="https://elara.evict.bot"
```

### Development

```bash
# Start dev server with Turbopack
bun run dev

# Format code
bun run format

# Lint code
bun run lint
```

The dev server runs at `http://localhost:3000`

### Production Build

```bash
# Standard build
bun run build

# Production build with obfuscation
bun run build:prod

# Start production server
bun run start
```

## Deployment

### PM2 Process Manager

```bash
# Build the application
bun run build

# Start with PM2
pm2 start ecosystem.config.js

# Manage processes
pm2 restart alina
pm2 logs alina
pm2 monit
```

**Configuration** (`ecosystem.config.js`):
- Process name: `alina`
- Port: `3006`
- Environment: `production`

### Environment Variables (Production)

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
PORT=3006
```

## API Documentation

### `GET /api/health`

Returns current bot health statistics.

**Response:**
```json
{
  "guilds": 1500,
  "users": 750000,
  "clusters": {
    "0": { "status": "online", "guilds": 500 }
  }
}
```

### `GET /api/status`

Returns detailed cluster and shard information.

**Response:**
```json
{
  "clusters": [...],
  "totalGuilds": 1500,
  "totalUsers": 750000
}
```

### `GET /api/pow/challenge`

Generates a proof-of-work challenge for rate limiting.

**Response:**
```json
{
  "success": true,
  "challenge": "...",
  "difficulty": 4
}
```

### `POST /api/top-commands`

Returns top 10 most-used commands (requires POW).

**Request:**
```json
{
  "solution": "pow_solution_hash"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "command_name": "ban", "invoke_count": 1500 }
  ]
}
```

## Architecture

### Proof-of-Work System

Protects rate-limited endpoints from abuse by requiring computational work.

**Flow:**
1. Client requests challenge from `/api/pow/challenge`
2. Client solves SHA-256 hash puzzle in browser
3. Client submits solution with API request
4. Server validates solution and difficulty
5. Rate limiting enforced per valid solution

### WebGL Gradient System

Custom fragment shader creates smooth, animated color gradients inspired by Stripe's design.

**Features:**
- Hardware-accelerated via WebGL
- Configurable colors via CSS variables
- Responsive canvas sizing
- Smooth noise-based animation

### Embed Builder

Interactive tool for creating Discord embeds without code.

**Capabilities:**
- Real-time preview with Discord styling
- Variable system (`{user.mention}`, `{guild.name}`, etc.)
- Button support (link, primary, secondary, success, danger)
- Export to bot script format
- Webhook URL support

## Scripts

```bash
bun run dev           # Start dev server (Turbopack)
bun run build         # Production build
bun run build:prod    # Build + obfuscation
bun run start         # Start production server
bun run lint          # ESLint
bun run format        # Prettier format
bun run format:check  # Check formatting
bun run mangle        # Obfuscate output
```

## Performance

- **Next.js Image Optimization** — Automatic WebP conversion and lazy loading
- **Code Splitting** — Route-based dynamic imports
- **Animation Optimization** — Custom hooks prevent unnecessary re-renders
- **POW Caching** — Challenge reuse within time window
- **CSS Variables** — Runtime theming without re-renders
- **Redis Caching** — Optional response caching layer

## Links

- **Website**: [evict.bot](https://evict.bot)
- **Discord**: [discord.gg/evict](https://discord.gg/evict)
- **Documentation**: [docs.evict.bot](https://docs.evict.bot)
- **Invite Bot**: [Add to Server](https://discordapp.com/oauth2/authorize?client_id=1203514684326805524&scope=bot+applications.commands&permissions=8)

## License

Proprietary. All rights reserved.

---

**Version**: 2.2.0  
**Last Updated**: February 16, 2026  
**Built by**: Evict Development Team