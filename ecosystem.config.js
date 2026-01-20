module.exports = {
  apps: [
    {
      name: "alina-new-dev",
      script: "bun",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
