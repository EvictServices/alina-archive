module.exports = {
  apps: [
    {
      name: "alina",
      script: "bun",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
