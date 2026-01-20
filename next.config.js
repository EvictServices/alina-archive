const WebpackObfuscator = require('webpack-obfuscator');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.evict.bot",
        pathname: "/**",
      }
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          splitStrings: true,
          splitStringsChunkLength: 10,
          numbersToExpressions: true,
          simplify: true,
          shuffleStringArray: true,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
          identifierNamesGenerator: 'hexadecimal',
          reservedNames: ['^_next', '^__next', '^React'],
          sourceMap: false,
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: false,
          disableConsoleOutput: true,
          selfDefending: true,
        }, [
          'node_modules/**',
          '**/node_modules/**'
        ])
      );
    }
    return config;
  },
};

module.exports = nextConfig;
