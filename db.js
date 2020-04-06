const url = require('url');

/*DB env variable parsing */
let dbConfig = null;

/**
 * Given a parsed URL object, determine if necessary data is present
 * @param  {object} parsedDbUrl Object produced by url.parse()
 * @return {bool}
 */
function dbStringIsValid(parsedDbUrl) {
  return typeof parsedDbUrl.protocol !== 'undefined' &&
         typeof parsedDbUrl.auth !== 'undefined' &&
         typeof parsedDbUrl.port !== 'undefined' &&
         typeof parsedDbUrl.hostname !== 'undefined' &&
         typeof parsedDbUrl.path !== 'undefined';
}

/**
 * Extract creds from given environment variable
 * @param  {string}       urlString Environment variable containing JawsDB connection string
 * @return {object|null}            Object containing parsed connection string
 */
function extractDbCredentials(urlString) {
  const parsedDbUrl = url.parse(urlString);

  // If valid, return values
  if (dbStringIsValid(parsedDbUrl)) {
    return {
      host: parsedDbUrl.hostname,
      database: parsedDbUrl.path.substring(1),
      port: parsedDbUrl.port,
      username: parsedDbUrl.auth.split(':')[0],
      password: parsedDbUrl.auth.split(':')[1],
    };
  }

  return null;
}

// Parse DB environment variable (connection string)
if (process.env.DATABASE_URL) {
  dbConfig = extractDbCredentials(process.env.DATABASE_URL);
} 

const dbConfiguration = {
  type: 'postgres',
  dialectOptions: {},
  host: dbConfig !== null ? dbConfig.host : process.env.DB_HOST,
  port: dbConfig !== null ? dbConfig.port : process.env.DB_PORT,
  username: dbConfig !== null ? dbConfig.username : process.env.DB_USER,
  password: dbConfig !== null ? dbConfig.password : process.env.DB_PASSWORD,
  database: dbConfig !== null ? dbConfig.database : process.env.DB_NAME,
  //logging: console.log,
  operatorsAliases: false,
};
console.log(`Current DB Connection, Host:${dbConfiguration.host}, Port:${dbConfiguration.port}, username: ${dbConfiguration.username}, database: ${dbConfiguration.database}`);
if (typeof process.env.DB_SSL_CA_CERT !== 'undefined') {
  console.log('DB CA Cert detected');
  dbConfiguration.dialectOptions.ssl = { ca: process.env.DB_SSL_CA_CERT };
}

module.exports = {
  development: dbConfiguration,
  production: dbConfiguration,
  config: dbConfiguration
};
