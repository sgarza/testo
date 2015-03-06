var config = {
  appName : 'Testo',
  environment : process.env.NODE_ENV || 'development',
  logFile : './log/all.log',
  database : {
    client      : 'pg',
    logQuerys   : true,
    development : "postgres://sgarza@localhost/testo",
    production  :  ""
  },
  port            : process.env.PORT || 3000,
  enableLithium   : false,
  enableHashids   : false, // https://github.com/hashids/
  enablePassport  : true,
  sessionKey      : 'session',
  sessionSecret   : 'noUnicornsHere',
  enableRedis     : true,
  siteUrl : {
    production: '',
    development : 'http://localhost:3000'
  }
}

module.exports = config;
