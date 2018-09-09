require('dotenv').load({ silent: true });

const env = process.env.NODE_ENV || 'development';

const port = 5566;

const configuration = {
  port,
  cors: {
    exposedHeaders: ['Link'],
  },
  development: {
    baseURL: `http://localhost:${port}`,
    db: {
      username: process.env.DEVELOPMENT_DB_USERNAME,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
      database: process.env.DEVELOPMENT_DB_DATABASE,
      options: {
        port: process.env.DEVELOPMENT_DB_PORT,
        host: process.env.DEVELOPMENT_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: false,
        },
        define: { underscored: true },
        logging: false,
      },
    },
    jwt_encryption: process.env.DEVELOPMENT_JWT_ENCRYPTION,
    jwt_expiration: process.env.DEVELOPMENT_JWT_EXPIRATION,
  },
  staging: {
    baseURL: `todo`,
    db: {
      username: process.env.STAGING_DB_USERNAME,
      password: process.env.STAGING_DB_PASSWORD,
      database: process.env.STAGING_DB_DATABASE,
      options: {
        host: process.env.STAGING_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: true,
        },
        define: { underscored: true },
        logging: false,
      },
    },
    jwt_encryption: process.env.STAGING_JWT_ENCRYPTION,
    jwt_expiration: process.env.STAGING_JWT_EXPIRATION,
  },
  production: {
    baseURL: `todo`,
    db: {
      username: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_DATABASE,
      options: {
        host: process.env.PROD_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: true,
        },
        define: { underscored: true },
      },
    },
    jwt_encryption: process.env.PROD_JWT_ENCRYPTION,
    jwt_expiration: process.env.PROD_JWT_EXPIRATION,
  },
};
export default configuration[env];
