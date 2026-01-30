# Evict Bot Website

Modern, high-performance website for the Evict Discord bot featuring real-time status monitoring, command documentation, an interactive embed builder, and a stunning animated gradient background.

## Features

- **Animated Gradient Background** - WebGL-powered gradient mesh with smooth color transitions
- **Real-time Status Dashboard** - Live cluster and shard monitoring with health metrics
- **Command Browser** - Searchable, categorized command documentation with 190+ commands
- **Embed Builder** - Interactive Discord embed creator with live preview and webhook support
- **POW Protection** - Client-side proof-of-work system for API rate limiting
- **Responsive Design** - Optimized for all screen sizes with glassmorphism effects
- **Smooth Animations** - Framer Motion transitions and counter animations

## Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **Runtime**: React 18.3.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12.27
- **Graphics**: Custom WebGL gradient shader
- **Package Manager**: Bun
- **Process Manager**: PM2

## Project Structure

```
src/
├── app/                      # Next.js app router pages
│   ├── api/                  # API routes
│   │   ├── health/           # Health status proxy
│   │   ├── pow/              # POW challenge generation
│   │   └── top-commands/     # Protected command stats
│   ├── (legal)/              # Legal pages (terms, privacy)
│   ├── commands/             # Command documentation page
│   ├── embed/                # Embed builder page
│   ├── status/               # Status dashboard page
│   ├── globals.css           # Global styles and animations
│   └── layout.tsx            # Root layout with gradient
├── components/               # React components
│   ├── embed/                # Embed builder components
│   ├── global/               # Global layout components
│   ├── ui/                   # Reusable UI components
│   ├── gradient.js           # WebGL gradient implementation
│   └── navbar.tsx            # Navigation component
├── hooks/                    # Custom React hooks
│   ├── useFetch.ts           # Data fetching hook
│   ├── useStatsAnimation.ts  # Counter animation hook
│   └── useVariableAutocomplete.ts
├── lib/                      # Utilities and helpers
│   ├── constants.ts          # App-wide constants
│   ├── embed-utils.ts        # Embed processing utilities
│   ├── commands.ts           # Command processing
│   ├── obfuscate.ts          # Content obfuscation
│   ├── pow/                  # Proof-of-work system
│   └── utils.tsx             # General utilities
└── types/                    # TypeScript definitions
    ├── commands.ts
    ├── embeds.ts
    ├── status.ts
    └── ui.ts
```

## Getting Started

### Prerequisites

- Bun 1.0+
- Node.js 18+ (for compatibility)
- PM2 (for production deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd alina

# Install dependencies
bun install
```

### Environment Variables

Create a `.env.local` file:

```env
# Database (for command statistics)
DATABASE_URL="postgresql://user:password@host:port/database"

# Optional: Custom API endpoints
NEXT_PUBLIC_API_URL="https://elara.evict.bot"
```

### Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

The development server will run on `http://localhost:3000`

## Deployment

### Using PM2

```bash
# Build the application
bun run build

# Start with PM2
pm2 start ecosystem.config.js

# Restart after updates
pm2 restart alina

# View logs
pm2 logs alina
```

### Environment Configuration

The `ecosystem.config.js` file configures:
- Port: 3001
- Max memory: 512MB
- Auto-restart on file changes
- Log management

## API Routes

### GET `/api/health`
Proxies health data from the Evict bot API.

**Response:**
```json
{
  "guilds": 1000,
  "users": 500000,
  "clusters": {...}
}
```

### GET `/api/pow/challenge`
Generates a proof-of-work challenge for rate limiting.

**Response:**
```json
{
  "success": true,
  "challenge": {...}
}
```

### POST `/api/top-commands`
Returns top 10 most-used commands (requires POW solution).

**Request:**
```json
{
  "solution": "pow_solution_string"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "command_name": "ban",
      "invoke_count": 1500
    }
  ]
}
```

## Key Features Explained

### Proof-of-Work System

Client-side POW protection prevents API abuse by requiring browsers to solve computational challenges before accessing protected endpoints.

**Flow:**
1. Client requests challenge from `/api/pow/challenge`
2. Client solves SHA-256 hash puzzle
3. Client submits solution with API request
4. Server validates and rate-limits based on POW

### Embed Builder

Interactive tool for creating Discord embeds with:
- Real-time preview
- Variable support (user mentions, server info)
- Button configuration
- Export to script format
- Webhook support

### Status Dashboard

Real-time monitoring with:
- 30-second auto-refresh
- Cluster/shard breakdown
- Latency metrics
- Guild and user counts
- Top commands (24h)

## Performance Optimizations

- **Code Splitting**: Dynamic imports for routes
- **Image Optimization**: Next.js Image component
- **Animation Hooks**: Custom hooks prevent re-renders
- **Memoization**: Strategic use of React optimization
- **POW Caching**: Challenge reuse within time window
- **WebGL Gradient**: Hardware-accelerated background animations
- **CSS Variables**: Dynamic theming without re-renders

## Design System

### Color Palette
- Primary gradient: `#8b7a9f → #7a6a8e → #6a5a7e → #5a4a6e`
- Text colors: White with opacity variants for hierarchy
- Accent colors: Lavender-based with glassmorphism effects

### Typography
- Font family: Outfit (100-700 weights)
- Responsive scaling with Tailwind utilities
- Custom text animations and shimmer effects

## Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run linter
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Database Schema

PostgreSQL database for command usage analytics:

```sql
CREATE TABLE command_stats (
  id SERIAL PRIMARY KEY,
  command_name VARCHAR(255) NOT NULL,
  invoke_count INTEGER DEFAULT 0,
  last_invoked TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_command_name (command_name),
  INDEX idx_invoke_count (invoke_count DESC)
);
```

## Architecture Highlights

### WebGL Gradient System
- Custom shader implementation for smooth color transitions
- Based on Stripe's gradient animation
- Hardware-accelerated rendering
- Configurable via CSS variables

### Proof-of-Work Flow
1. Client requests challenge from `/api/pow/challenge`
2. SHA-256-based computational puzzle
3. Difficulty-adjusted based on load
4. Solution validated server-side
5. Rate limiting enforced per solution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary. All rights reserved.

## Links

- **Website**: https://evict.bot
- **Discord**: https://discord.gg/evict
- **Documentation**: https://docs.evict.bot
- **Invite Bot**: [Click here](https://discordapp.com/oauth2/authorize?client_id=1203514684326805524&scope=bot+applications.commands&permissions=8)

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Animated with Framer Motion
- Icons from React Icons
- Deployed with PM2

---

**Last Updated**: January 30, 2026  
**Version**: 2.1.0  
**Maintained by**: Evict Development Team