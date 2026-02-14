import { execSync } from "child_process";
import createMDX from '@next/mdx';

const EPOCH = BigInt("1420070400000");
const snowflakeId = ((BigInt(Date.now()) - EPOCH) << BigInt(22) | BigInt(Math.floor(Math.random() * 4096))).toString();

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateBuildId: async () => snowflakeId,
  compiler: {
    removeConsole: true,
  },
  env: {
    build: snowflakeId,
    commit: execSync("git rev-parse HEAD").toString().trim(),
  },
  experimental: {
    cssChunking: "strict",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.evict.bot",
      },
      {
        protocol: "https",
        hostname: "**.azron.net",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/embed/avatars/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);