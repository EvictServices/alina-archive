module.exports = {
  apps: [
    {
      name: "evict-new-dev",
      script: "bun",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
