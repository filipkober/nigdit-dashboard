module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key: 'nigdit_key.pem',
      user : 'azureuser',
      host : '51.142.107.198',
      ref  : 'origin/main',
      repo : 'git@github.com:filipkober/nigdit-dashboard.git',
      path : '/home/azureuser',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
