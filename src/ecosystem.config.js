module.exports = {
  apps : [{
    name: 'API',
    script: './scheduler.js',
    instances: 1,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
