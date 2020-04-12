const path = require('path');
const config = require('./db.js');

require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env')
});
console.log(`process.env.ORM_ENV: ${process.env.ORM_ENV}`);
const dbConfig = config.config;
module.exports = {
  'type': dbConfig.type,
  'host': dbConfig.host,
  'port': dbConfig.port,
  'username': dbConfig.username,
  'password': dbConfig.password,
  'database': dbConfig.database,
  'synchronize': false,
  'logging': process.env.ORM_ENV === 'production' ? ['error'] : true,
  'maxQueryExecutionTime': 1000, //log all queries which run more then 1 second
  'ssl': dbConfig.dialectOptions.ssl,
  'entities': [process.env.ORM_ENV === 'production' ? 'dist/entity/*.js' : 'src/entity/*.ts'],
  'migrations': [process.env.ORM_ENV === 'production' ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'],
  'subscribers': [process.env.ORM_ENV === 'production' ? 'dist/subscriber/**/*.js' : 'src/subscriber/**/*.ts'],
  'cli':
    process.env.ORM_ENV === 'production'
      ? {
          entitiesDir: 'dist/src/entity',
          migrationsDir: 'dist/src/migration',
          subscribersDir: 'dist/src/subscriber'
        }
      : {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber'
        }
};
