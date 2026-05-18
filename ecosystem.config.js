module.exports = {
  apps: [
    {
      name: 'dailyhelp-admin',
      cwd: process.env.APP_DIR || __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: `start -p ${process.env.PORT || 7002}`,
      instances: process.env.PM2_INSTANCES || 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 7002,
      },
      max_memory_restart: '512M',
      autorestart: true,
    },
  ],
};
