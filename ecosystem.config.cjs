module.exports = {
  apps: [
    {
      name: "vrazmerdom",
      cwd: "/var/www/vrazmerdom",
      script: "npm",
      args: "start -- -H 127.0.0.1 -p 3000",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
